const sqlite = require('sqlite3');
const db = new sqlite.Database('Database/data/ffsd.db');

const initializedb = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const userTable = `create table if not exists users(name varchar(50), email varchar(30), phoneNumber varchar(15), password varchar(20));`
            db.run(userTable, err => {
                if (err != null) {
                    console.log(err)
                }
                else {
                    console.log("Users table Created");
                }
            })
            const featuredTable = `create table if not exists featured(img varchar(50), uname varchar(30), time varchar(6), description varchar(200));`
            db.run(featuredTable, err => {
                if (err != null) {
                    console.log(err)
                }
                else {
                    console.log("Features table Created");
                }
            })
            const faqTable = `create table if not exists faq(question varchar(100), answer varchar(200));`
            db.run(faqTable, err => {
                if (err != null) {
                    console.log(err)
                }
                else {
                    console.log("FAQ table Created");
                }
            })
            const newsTable = `create table if not exists News(image varchar(30), title varchar(80), headlines varchar(100), url varchar(200));`
            db.run(newsTable, err => {
                if (err != null) {
                    console.log(err)
                }
                else {
                    console.log("News table Created");
                }
            })    
        })
        resolve({ message: 'success' })
    })
}

const getFeatures = ()=>{
    return new Promise((resolve,reject) => {
        db.all('select * from featured', (err, data) => {
            if(!err) 
                resolve({data:data})
            else 
                reject({msg:'Some Error Occured'});
        })
    })
}

const getFAQ = () => {
    return new Promise((resolve, reject) => {
        db.all('select * from faq', (err, data) => {
            if(!err)
                resolve({data:data})
            else
                reject({msg:'Some Error Occured'});
        })
    })
}

const getNews = () => {
    return new Promise((resolve, reject) => {
        db.all('select * from News', (err, data) => {
            if(!err)
                resolve({data:data})
            else
                reject({msg:'Some Error Occured'});
        })
    })
}

module.exports = { initializedb, getFeatures, getFAQ, getNews};