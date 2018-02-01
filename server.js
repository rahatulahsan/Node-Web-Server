const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT  || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('View engine', 'hbs');

//Middleware


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });

    next();
});

// app.use((req, res, next) => {

//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

//Route

app.get('/', (req, res) => {

    res.render('home.hbs',{
        pageTitle: 'HomePage',
        welcomeMessage: 'Welcome to Node App',
    });
});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/project', (req, res) => {

    res.render('project.hbs', {
        pageTitle: 'Project Page'
    });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Sorry Service Unavailable'
    });
});


app.listen(port, () => {

    console.log(`Sever is up on port ${port}`);
});
