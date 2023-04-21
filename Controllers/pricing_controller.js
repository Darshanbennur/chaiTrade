const User = require('../Models/user');
const mongoose = require('mongoose');
const UserController = require('./user_controller');

const increase20K = (req, res, next) => {
    const user = new User({
        costInHand : 20000 + UserController.session.costInHand,
        wallet : 20000 + UserController.session.wallet
    })
    User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(UserController.session.id) }, user)
        .then(result => {
            console.log("Added 20,000 in the Wallet and InHand");
            UserController.session.costInHand = 20000 + UserController.session.costInHand;
            UserController.session.wallet = 20000 + UserController.session.wallet;
            res.redirect('/simulator')
        })
        .catch(err => {
            console.log("Error Increasing 20,000 Credits")
        })
}

const increase40K = (req, res, next) => {
    const user = new User({
        costInHand : 40000 + UserController.session.costInHand,
        wallet : 40000 + UserController.session.wallet
    })
    User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(UserController.session.id) }, user)
        .then(result => {
            console.log("Added 40,000 in the Wallet and InHand");
            UserController.session.costInHand = 40000 + UserController.session.costInHand;
            UserController.session.wallet = 40000 + UserController.session.wallet;
            res.redirect('/simulator')
        })
        .catch(err => {
            console.log("Error Increasing 40,000 Credits")
        })
}

const makeUserPremium = (req, res,next) => {
    const user = new User({
        isPremium : true
    })
    User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(UserController.session.id) }, user)
        .then(result => {
            console.log("The User is now a Premium Member")
            UserController.session.isPremium = true;
            res.redirect('/featured')
        })
        .catch(err => {
            console.log("Error making user Premium")
        })
}

module.exports = {increase20K, increase40K, makeUserPremium};