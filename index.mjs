import express from 'express'
import * as url from 'url'
// import { myFunction } from './public/js/error.js';

const app = express();
// const errorCheez = myFunction()
var PORT = process.env.PORT || 6969
app.set('view engine', 'ejs');

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
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

app.get('/blog', (req, res) => {
    res.render('blog');
})

app.get('/featured', (req, res) => {
    res.render('featured');
})

app.get('/marketTerm', (req, res) => {
    res.render('marketTerm');
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

app.listen(PORT, err => {
    if(err) {
        console.log(err);
    }
    else
        console.log('Listening on port ', PORT);
})