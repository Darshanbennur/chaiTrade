const sqlite = require('sqlite3');
const db = new sqlite.Database('Database/data/ffsd.db');

const session = {
    name: "",
    email: "",
    isSigned: false
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
            const blogTable = `create table if not exists blog(name varchar(30), title varchar(50), content varchar(400), avatar varchar(200));`
            db.run(blogTable, err => {
                if (err != null) {
                    console.log(err)
                }
                else {
                    console.log("Blogs table Created");
                }
            })
            const contactUsTable = `create table if not exists contactUs(name varchar(30), email varchar(30), subject varchar(100), message varchar(300));`
            db.run(contactUsTable, err => {
                if (err != null) {
                    console.log(err)
                }
                else {
                    console.log("ContactUs table Created");
                }
            })
        })
        resolve({ message: 'success' })
    })
}

const getFeatures = () => {
    return new Promise((resolve, reject) => {
        db.all('select * from featured', (err, data) => {
            if (!err)
                resolve({ data: data })
            else
                reject({ msg: 'Some Error Occured' });
        })
    })
}

const registerUser = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    var passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if(!name || !email || !password){
        res.render('signIn', {
            errr: "Fields Can't be Empty",
            loginError: ""
        });
    }
    else if (!password.match(passwordFormat)) {
        res.render('signIn', {
            errr: "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
            loginError: ""
        });
    } else {
        const command = "insert into users values ('" + name + "','" + email + "','" + password + "');";
        const checkCommand = "select email from users where email = '" + email + "';";

        return new Promise((resolve, reject) => {
            db.all(checkCommand, (err, data) => {
                console.log("Data : " + data)
                if (data.length == 0) {
                    db.run(command, (err, data) => {
                        if (!err) {
                            session.name = req.body.name;
                            session.email = req.body.email;
                            session.isSigned = true;
                            res.render('profile', {
                                name: req.body.name,
                                email: req.body.email,
                                isSignedIn: true
                            })
                        }
                        else
                            reject({ msg: 'Not Registered' });
                    });
                } else {
                    res.render('signIn', {
                        errr: "Email Already Registered!!",
                        loginError: ""
                    });
                }
            })

        })
    }

}

const loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!email || !password){
        res.render('signIn', {
            errr: "",
            loginError: "Field Can't be Empty"
        });
    }
    else if (!email.match(emailFormat)) {
        res.render('signIn', {
            errr: "",
            loginError: "Invalid Email Format"
        });
    }
    else {
        const command = "select name from users where email = '" + email + "' and password = '" + password + "';";
        console.log(command)

        return new Promise((resolve, reject) => {
            db.all(command, (err, data) => {
                resolve({ data: data })
                let name;
                data.forEach((each) => {
                    name = each.name
                })
                if (data.length != 0) {
                    res.render('profile', {
                        name: name,
                        email: req.body.email,
                        password: req.body.password,
                        isSignedIn: true
                    })
                } else {
                    res.render('signIn', {
                        errr: "",
                        loginError: "Invalid Credentials"
                    });
                }
            })
        })
    }
}

const postFeedback = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const command = "insert into contactUs values ('" + name + "','" + email + "','" + subject + "','" + message + "');";
    console.log(command);

    return new Promise((resolve, reject) => {
        db.run(command, (err, data) => {
            if (!err) {
                console.log("Data : " + data);
                // resolve({data:data})
                res.redirect('/contactUs')
            }
            else {
                // reject({msg:'Some Error Occured'})
                res.redirect('/contactUs')
            }
        })
    })
}

const postBlog = (req, res) => {
    const name = "Abraham Jose"
    const title = req.body.title;
    const content = req.body.content;
    let x = Math.floor((Math.random() * 10) % 8 + 1);
    const avatar = "https://bootdey.com/img/Content/avatar/avatar" + x + ".png";
    const command = "insert into blog values ('" + name + "','" + title + "','" + content + "','" + avatar + "');"
    console.log(command);

    return new Promise((resolve, reject) => {
        db.run(command, (err, data) => {
            if (!err) {
                console.log("Blog posted : " + data)
                res.redirect('/blog')
            } else {
                console.log("Blog not Posted")
            }
        })
    })
}

const getBlogs = () => {
    return new Promise((resolve, reject) => {
        db.all('select * from blog', (err, data) => {
            if (!err)
                resolve({ data: data })
            else
                reject({ msg: 'Some Error Occured' })
        })
    })
}

const getFAQ = () => {
    return new Promise((resolve, reject) => {
        db.all('select * from faq', (err, data) => {
            if (!err)
                resolve({ data: data })
            else
                reject({ msg: 'Some Error Occured' });
        })
    })
}

const getNews = () => {
    return new Promise((resolve, reject) => {
        db.all('select * from News', (err, data) => {
            if (!err)
                resolve({ data: data })
            else
                reject({ msg: 'Some Error Occured' });
        })
    })
}

module.exports = { initializedb, getFeatures, getFAQ, getNews, registerUser, loginUser, session, postBlog, getBlogs, postFeedback };