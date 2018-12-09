const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method}: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs', {
//         pageTitle: 'Maintainance Page'
//     });
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (textInput) => {
    return textInput.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('Hello Express');

    //res.send('<h1>Hello Express</h1>');

    // res.send({
    //     name: 'Gaurav',
    //     likes: [
    //         'biking',
    //         'trekking'
    //     ]
    // });

    res.render('homepage.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to homepage'
    });
});

app.get('/about', (req, res) => {
    //res.send('Hello Express on About page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        request: 'bad',
        errorMessage: 'Unable to serve the request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});