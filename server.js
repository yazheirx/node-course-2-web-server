const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

// log requests
app.use((req, res, next) => {
     let now = new Date().toString();
     let log = `${now}: ${req.method} ${req.url}`;
     console.log(log);
     fs.appendFile('server.log', log + '\n', err => {
          if (err) {
               console.log('Unable to append to server.log: ' + err);
          }
     });
     next();
});

// enable for maintenance mode
// app.use((req, res, next) => {
//      res.render('maintenance.hbs');
// });
app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
     return new Date().getFullYear();
});

hbs.registerHelper('screamIt', textToScream => {
     return textToScream.toUpperCase();
});

app.get('/', (req, res) => {
     // console.log('request answered');
     // //  res.send('<h1>Hello Express</h1>');
     // res.send({
     //      name: 'justin',
     //      likes: ['biking', 'cities']
     // });
     res.render('home.hbs', {
          pageTitle: 'Home',
          welcomeMessage: 'Welcome to my website'
     });
});

app.get('/about', (req, res) => {
     // res.send('About Page');
     res.render('about.hbs', {
          pageTitle: 'About Page'
     });
});

app.get('/bad', (req, res) => {
     res.send({
          errorMsg: 'Unable to handel this request'
     });
});

app.listen(3000, () => {
     console.log('Server is up on port 3000');
});
