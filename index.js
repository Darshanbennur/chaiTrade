const express = require('express');
const flash = require('connect-flash');

const UserController = require('./Controllers/user_controller');
const Blog_Controller = require('./Controllers/blog_controller')
const Featured_Controller = require('./Controllers/featured_controller')
const ContactUs_Controller = require('./Controllers/contactUs_controller')
const MarketTerm_Controller = require('./Controllers/marketTerm_controller')

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

app.use((req, res, next) => {
    res.locals.isLoggedIn = UserController.session.isSigned;
    res.locals.isMentorLoggedIn = UserController.session.isMentor;
    next();
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/charts', (req, res) => {
    res.render('charts');
})

app.get('/blog', Blog_Controller.getAllBlogs)

app.post('/postBlog', Blog_Controller.postBlog)

app.get('/featured', Featured_Controller.getAllFeaturedBlogs)

app.post('/postFeaturedBlog', Featured_Controller.postFeaturedSectionBlog)

// app.get('/news', async(req, res) => {
//     try {
//         const newsList = await db.getNews();
//         res.render('news', {details:newsList.data})
//     } catch (err) {
//         console.log(err);
//     }
// })

app.get('/simulator', (req, res) => {
    res.render('simulator');
})

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

app.post('/signIn', UserController.RegisterUser)

app.post('/login', UserController.Login_User)

app.get('/logout', (req, res) => {
    UserController.LogoutSession()
    res.redirect('/')
})

app.get('/marketTerm', MarketTerm_Controller.getAllFAQ)

app.get('/aboutUs', async(req, res) => {
    res.render('about');
})

app.get('/pricing', async(req, res) => {
    res.render('pricing');
})

app.get('/contactUs', async(req, res) => {
    res.render('contactUs', {
        name : UserController.session.name,
        email : UserController.session.email
    });
})

app.post('/feedback', ContactUs_Controller.postContactUs)

app.get('/mentorPanel', (req, res) => {
    res.render('mentor_panel');
})

app.get('/admin', (req, res) => {
    res.render('admin_panel');
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
