import express from 'express'

const app = express();
var PORT = process.env.PORT || 6969
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('*', (req, res) => {
    res.render('error');
});

app.listen(PORT, err => {
    if(err) {
        console.log(err);
    }

    console.log('Listening on port ', PORT);
})