const mongoose = require('mongoose');

const Mentor = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    mentorID : {type : String, required : true},
    mentorName: {type : String, required : true},
    mentorImage : {type : String, required : true},
    mentorEmail : {type : String, required : true},
    title: {type : String, required : false},
    content: {type : String, required : true},
    time: {type : String, required : true},
});

module.exports = mongoose.model('Mentor',Mentor);