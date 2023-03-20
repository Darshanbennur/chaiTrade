const sqlite = require('sqlite3');
const db = new sqlite.Database('Database/data/ffsd.db');

const session = {
    name : "",
    email : "",
    isSigned : false
}

const initializedb = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const userTable = `create table if not exists users(name varchar(50), email varchar(30), password varchar(20));`
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

const registerUser = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const command= "insert into users values ('" + name + "','" + email + "','" + password + "');";
    const checkCommand = "select email from users where email = '" + email + "';";
    
    return new Promise((resolve, reject) => {
        db.all(checkCommand, (err, data) => {
            console.log("Data : " + data)
            if (data.length == 0) {
                db.run(command, (err, data) => {
                    if(!err){
                        session.name = req.body.name;
                        session.email = req.body.email;
                        session.isSigned = true;
                        res.render('profile',{
                            name : req.body.name,
                            email : req.body.email,
                            isSignedIn : true
                        })
                    } 
                    else 
                        reject({msg:'Not Registered'});
                });
            } else{
                res.render('signIn',{
                    errr : "Email Already Registered!!",
                    loginError : ""
                });
            }
        })
        
    })
}

const loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const command = "select name, email, password from users where email = '" + email + "' and password = '" + password + "';";
    console.log(command)

    return new Promise((resolve, reject) => {
        db.all(command, (err, data) => {
            if (data.length != 0) {
                console.log("Got Data : " + data)
                res.render('profile',{
                    name : "UserName",
                    email : req.body.email,
                    password : req.body.password,
                    isSignedIn : true
                })
            } else{
                res.render('signIn',{
                    errr : "",
                    loginError : "Invalid Credentials"
                });
            }
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

module.exports = { initializedb, getFeatures, getFAQ, getNews, registerUser, loginUser, session};