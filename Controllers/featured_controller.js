const Mentor = require('../Models/mentor');
const mongoose = require('mongoose');
const UserController = require('./user_controller');


const postFeaturedSectionBlog = (req, res, next) => {
    const authorName = UserController.session.name;

    let x = Math.floor((Math.random() * 10) % 8 + 1);
    const mentorImage = "https://bootdey.com/img/Content/avatar/avatar" + x + ".png";

    const contentTitle = req.body.title; // extra for now
    const content = req.body.content;
    const datetime = new Date().toDateString();
    console.log("time : " + datetime);

    const featuredSection = new Mentor({
        _id: new mongoose.Types.ObjectId(),
        mentorID : UserController.session.id,
        mentorName : authorName,
        mentorImage : mentorImage,
        title : contentTitle,
        content : content,
        time : datetime
    })
    featuredSection
        .save()
        .then(result => {
            console.log("Featured Blog got posted : " + result)
            res.redirect('/mentorPanel')
        })
        .catch(err => {
            console.log("Error Occured Posting the Blog : " + err )
        })
}

const getAllFeaturedBlogs = (req, res, next) => {
    Mentor.find()
        .select('mentorName mentorImage title content time')
        .exec()
        .then(result => {
            console.log("Successfully Fetched all Data")
            res.render('featured',{details:result})
        })
        .catch(err => {
            console.log("Error Occured Fetching Data : " + err)
            res.redirect('/')
        })
}

module.exports = {postFeaturedSectionBlog, getAllFeaturedBlogs};