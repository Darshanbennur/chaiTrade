const mongoose = require('mongoose');

const News = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    image : {type : String, required : true},
    title: {type : String, required : true},
    headlines : {type : String, required : true},
    url : {type : String, required : true}
});

module.exports = mongoose.model('News',News);