const express = require('express');
const db = require('./Database/config');

const flash = require('connect-flash');

const UserController = require('./Controllers/user_controller');

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://bennurdarshan:chaiTrade404@cluster0.psgtpad.mongodb.net/?retryWrites=true&w=majority'
);

const app = express();
var PORT = process.env.PORT || 3000
app.set('view engine', 'ejs');

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}))
app.use(flash())

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/charts', (req, res) => {
    res.render('charts');
})

app.get('/simulator', (req, res) => {
    res.render('simulator');
})


app.get('/blog', async(req, res) => {
    try {
        const blogList = await db.getBlogs();
        res.render('blog', {details:blogList.data})
    } catch (err) {
        console.log(err);
    }
})

// app.post('/postBlog', db.postBlog)

app.get('/profile', (req, res) => {
    console.log(UserController.session)
    res.render('profile',{
        name : UserController.session.name,
        email : UserController.session.email,
        isSignedIn : UserController.session.isSigned,
        education : UserController.session.education,
        countryCode : UserController.session.countryCode,
        phoneNumber : UserController.session.phoneNumber,
        income : UserController.session.income,
        incomeType : UserController.session.incomeType,
        isMentor : false
    });
})

app.post('/changesProfile', UserController.makeChanges)

app.get('/signIn', (req, res) => {
    res.render('signIn',{
        errr:'',
        loginError : ''
    });
})

app.post('/login', UserController.Login_User)

app.post('/signIn', UserController.RegisterUser)

app.get('/aboutUs', async(req, res) => {
    res.render('about');
})

app.get('/pricing', async(req, res) => {
    res.render('pricing');
})

app.get('/contactUs', async(req, res) => {
    res.render('contactUs');
})

app.get('/admin', (req, res) => {
    res.render('admin_panel');
})

app.get('/mentorPanel', (req, res) => {
    res.render('mentor_panel');
})

// app.post('/feedback', db.postFeedback);

app.get('/featured', async(req, res) => {
    try {
        const featuredList = await db.getFeatures();
        res.render('featured',{details:featuredList.data})
    } catch (err) {
        console.log(err);
    }
})

app.get('/marketTerm', async(req, res) => {
    try {
        const faqList = await db.getFAQ();
        res.render('marketTerm', {details:faqList.data})
    } catch (err) {
        console.log(err);
    }
})

app.get('/news', async(req, res) => {
    try {
        const newsList = await db.getNews();
        res.render('news', {details:newsList.data})
    } catch (err) {
        console.log(err);
    }
})

app.get('*', (req, res) => {
    res.render('error')
});

app.listen(PORT, err => {
    if(err) {
        console.log(err);
    }
    else
        console.log('Listening on port ', PORT);
})
