const mongoose = require('mongoose');

const User = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userName: {type : String, required : false},
    email: {type : String, required : true},
    password: {type : String, required : true},
    profileImage: {type : String, required : false},
    education: {type : String, required : false},
    countryCode: {type : Number, required : false},
    phoneNumber: {type : Number, required : false},
    income: {type : Number, required : false},
    incomeType: {type : String, required : false},
    mentorBlogsId : [{type : String, required : false}],
    isMentor: {type : Boolean, required : false},
    isAdmin: {type : Boolean, required : false},
    isPremium: {type : Boolean, required : false}, //added
    costInHand: {type : Number, required : false}, //added
    costInvested: {type : Number, required : false}, //added
    wallet: {type : Number, required : false}, //added
    userStockInvested : [{type : String, required : false}] //added
});

module.exports = mongoose.model('User',User);