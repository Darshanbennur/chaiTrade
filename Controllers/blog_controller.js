const Blog = require('../Models/blog');
const mongoose = require('mongoose');
const UserController = require('./user_controller');

const postBlog = (req, res, next) => {
    const name = UserController.session.name;
    const title = req.body.title;
    const content = req.body.content;
    let x = Math.floor((Math.random() * 10) % 8 + 1);
    const avatar = "https://bootdey.com/img/Content/avatar/avatar" + x + ".png";

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
            res.redirect('/blog')
        })
        .catch(err => {
            console.log("Error Occured : " + err)
            res.redirect('/blog')
        })
}

const getAllBlogs = (req, res, next) => {
    Blog.find()
        .select('authorName title content authorAvatar')
        .exec()
        .then(result => {
            // console.log(result);
            res.render('blog',{details:result})
        })
        .catch(err => {
            console.log("Error while Fetching Blogs : " + err)
        })
}

module.exports = {postBlog, getAllBlogs};