const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// app.use((req,res,next) => {
//     res.render('main.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()    
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req,res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: "Hello to my page!"
    });
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) =>{
    res.send('Whoa! How\'d you end up here??');
});

app.get('/emily', (req, res) =>{
     res.send(`<h1> Emily is a Babe!!!</h>`);
});

app.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`);
});