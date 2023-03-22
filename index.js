const express = require('express');
const db = require('./Database/config');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const app = express();
var PORT = process.env.PORT || 3000
app.set('view engine', 'ejs');

app.use(express.static('public'));
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

app.post('/postBlog', db.postBlog)

app.get('/profile', (req, res) => {
    res.render('profile',{
        name : '',
        email : '',
        isSignedIn : false
    });
})

app.get('/signIn', (req, res) => {
    res.render('signIn',{
        errr:'',
        loginError : ''
    });
})

app.post('/login', db.loginUser)

app.post('/signIn', db.registerUser)

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

app.post('/feedback', db.postFeedback);

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

db.initializedb().then(()=>{
    app.listen(PORT, err => {
        if(err) {
            console.log(err);
        }
        else
            console.log('Listening on port ', PORT);
    })
})
