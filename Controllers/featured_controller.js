const Mentor = require('../Models/mentor');
const User = require('../Models/user');
const mongoose = require('mongoose');
const UserController = require('./user_controller');

let counter = 0;

const postFeaturedSectionBlog = (req, res, next) => {
    const authorName = UserController.session.name;
    let mentorImage = "";
    const contentTitle = req.body.title;
    const content = req.body.content;
    const datetime = new Date().toDateString();
    console.log("time : " + datetime);
    let submittedBlogId = "";

    if (UserController.session.profileImage != "") {
        mentorImage = UserController.session.profileImage;
    } else {
        let x = Math.floor((Math.random() * 10) % 8 + 1);
        mentorImage = "https://bootdey.com/img/Content/avatar/avatar" + x + ".png";
    }

    const featuredSection = new Mentor({
        _id: new mongoose.Types.ObjectId(),
        mentorID: UserController.session.id,
        mentorName: authorName,
        mentorImage: mentorImage,
        mentorEmail: UserController.session.email,
        title: contentTitle,
        content: content,
        time: datetime
    })
    featuredSection
        .save()
        .then(result => {
            console.log("Featured Blog got posted : " + result)
            submittedBlogId = result._id;
            User.updateOne({ _id: new mongoose.Types.ObjectId(UserController.session.id)}, {
                $push:{
                    mentorBlogsId: submittedBlogId
                }
            })
                .then(resultOfFinding => {
                    console.log("It is pushed")
                })
                .catch(ErrInFinding => {
                    console.log("User not Found : " + ErrInFinding);
                })

            res.redirect('/mentorPanel')
        })
        .catch(err => {
            console.log("Error Occured Posting the Blog : " + err)
        })
}

const getAllFeaturedBlogs = (req, res, next) => {
    Mentor.find()
        .select('mentorID mentorName mentorImage mentorEmail title content time')
        .exec()
        .then(result => {
            console.log("Successfully Fetched all Data")
            res.render('featured', { details: result })
        })
        .catch(err => {
            console.log("Error Occured Fetching Data : " + err)
            res.redirect('/')
        })
}

const getAllMentorBlogs = async (req, res, next) => {
    const allBlogs = []
    await User.findOne({ _id: new mongoose.Types.ObjectId(UserController.session.id) })
        .then(async result => {
            
            const arrayOfBlogs = result.mentorBlogsId;
            let size = arrayOfBlogs.length;

            for (let index = 0; index < size; index++) {
                const mentorr = await Mentor.findOne({ _id: new mongoose.Types.ObjectId(arrayOfBlogs[index]) })
                if (mentorr) {
                    allBlogs.push(mentorr)
                    counter++;
                }
            }
            if (size == counter) {
                await res.render('mentorBlogs', { details: allBlogs })
                counter = 0;
            }
        })
        .catch(err => {
            res.redirect('/mentorPanel')
            console.log("getAllMentorBlogs error : " + err)
        })

}

module.exports = { postFeaturedSectionBlog, getAllFeaturedBlogs, getAllMentorBlogs };