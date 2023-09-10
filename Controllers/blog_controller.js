const Blog = require('../Models/blog');
const mongoose = require('mongoose');
const UserController = require('./user_controller');

const postBlog = (req, res, next) => {
    const name = UserController.session.name;
    const title = req.body.title;
    const content = req.body.content;
    let avatar = "";
    if (UserController.session.profileImage == "") {
        let x = Math.floor((Math.random() * 10) % 8 + 1);
        avatar = "https://bootdey.com/img/Content/avatar/avatar" + x + ".png";
    } else{
        avatar = UserController.session.profileImage;
    }
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        authorName : name,
        title : title,
        content : content,
        authorAvatar : avatar
    })
    blog
        .save()
        .then(result => {
            console.log("Blog Got Posted : " + result)
            res.redirect('/blogPage')
        })
        .catch(err => {
            console.log("Error Occured : " + err)
            res.redirect('/blogPage')
        })
}

const getAllBlogs = (req, res, next) => {
    Blog.find()
        .select('authorName title content authorAvatar')
        .exec()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log("Error while Fetching Blogs : " + err)
        })
}

const getBlogPage = (req, res, next) => {
    res.render('blog')
}

module.exports = {postBlog, getAllBlogs, getBlogPage};