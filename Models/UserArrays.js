const mongoose = require('mongoose');

const UserArray = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userID: {type : String, required : true},
    MentorBlogID: [{type : String, required : false}],
    ShareHoldingID: [{type : Number, required : false}]
});

module.exports = mongoose.model('UserArray',UserArray);