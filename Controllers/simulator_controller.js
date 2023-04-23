const User = require('../Models/user');
const StockBuy = require('../Models/stock_buying');
const Chart = require('../Models/chart');
const mongoose = require('mongoose');
const UserController = require('./user_controller');

const BuyTheStock = (req, res, next) => {
    const stockId = req.body.priceID; //Here I will get the id of the Stock
    Chart.findOne({ _id: new mongoose.Types.ObjectId(stockId) })
        .then(result => {
            //Here I got all the Details about the Stock
            //Now to check if the User can Buy the Stock
            if (UserController.session.costInHand >= result.chart_ltp) {
                const newPurchase = new StockBuy({
                    _id: new mongoose.Types.ObjectId(),
                    stockID: stockId,
                    userID: UserController.session.id,
                    stockName: result.chart_name,
                    purchasePrice: result.chart_ltp,
                    purchaseDate: new Date().toDateString()
                })
                newPurchase
                    .save()
                    .then((resultOfPurchase) => {
                        User.updateOne({ _id: new mongoose.Types.ObjectId(UserController.session.id) }, {
                            $push: { userStockInvested: resultOfPurchase._id }
                        })
                            .then(resultOfSavingInUserPurchase => { //Updating the User Here : 
                                console.log("Stock Saved in User Array : " + resultOfSavingInUserPurchase)
                                UserController.session.costInvested += result.chart_ltp;
                                UserController.session.costInHand -= result.chart_ltp;
                                res.redirect('/simulator')
                            })
                            .catch(errInStoringInUser => {
                                console.log("Error in Storing in User Array : " + errInStoringInUser)
                                res.redirect('/simulator')
                            })
                    })
                    .catch(errInPurchase => {
                        console.log("Error In Purchase : " + errInPurchase)
                        res.redirect('/simulator')
                    })
            } else {
                //Here then Write the Code for Cost Less in Hand (For now just redirect)
                console.log("Less Cash, Buy More Cash")
                res.redirect('/pricing')
            }
        })
        .catch(err => {
            console.log("Error Fetching the Stock : " + err)
            res.redirect('/simulator')
        })
}

let counterForGettingStockId = 0;
let counterForGettingStockDetails = 0;

const getAlltheBoughtStocks = async (req, res, next) => {
    let stockIds = []
    let transactionStockDetails = []
    let stockDetails = []
    await User.findOne({ _id: new mongoose.Types.ObjectId(UserController.session.id) })
        .then(async result => { // These are Transaction Id's

            const allTransactionId = result.userStockInvested;
            let sizeAllTransaction = allTransactionId.length
            console.log("The Size : " + sizeAllTransaction)

            // .select("stockID purchasePrice purchaseDate")
            for (let index = 0; index < sizeAllTransaction; index++) {
                const trans = await StockBuy.findOne({ _id: new mongoose.Types.ObjectId(allTransactionId[index]) })
                if (trans) {
                    stockIds.push(trans.stockID)
                    transactionStockDetails.push(trans)
                    counterForGettingStockId++;
                }
            }
            if (sizeAllTransaction == counterForGettingStockId) {
                counterForGettingStockId = 0;
                for (let index = 0; index < sizeAllTransaction; index++) {
                    const det = await Chart.findOne({ _id: new mongoose.Types.ObjectId(stockIds[index]) })
                    if (det) {
                        stockDetails.push(det);
                        counterForGettingStockDetails++;;
                    }
                }
                if (counterForGettingStockDetails == sizeAllTransaction) {
                    counterForGettingStockDetails = 0

                    console.log("transactionStockDetails : " + transactionStockDetails);
                    console.log("stockDetails : " + stockDetails);

                    // for(let index = 0; index < sizeAllTransaction; index++){
                    //     UserController.session.wallet += (stockDetails[index].chart_ltp - transactionStockDetails[index].purchasePrice)
                    // }

                    res.render('simulator', {
                        details: UserController.session,
                        stockTransactionDetails: transactionStockDetails,
                        stockDetails: stockDetails
                    })
                }
            }
        })
        .catch(err => {
            console.log("Error in Finding the Stocks from User : " + err);
        })
}

module.exports = { BuyTheStock, getAlltheBoughtStocks };
