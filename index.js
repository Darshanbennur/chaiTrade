const express = require('express');
const db = require('./Database/config');

const app = express();
var PORT = process.env.PORT || 3000
app.set('view engine', 'ejs');

app.use(express.static('public'));

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
    res.render('blog');
})

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

app.get('/profile', (req, res) => {
    res.render('profile');
})

app.get('/authentication', (req, res) => {
    res.render('signIn');
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
