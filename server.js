
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// template settings
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

var app = express();
app.set('view engine', 'hbs');

// middleware
app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) console.log('Unable to append to server.log');
  });
  next();
});

// maintenance middleWARE
// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public'));
// a handler for #ROOT
app.get('/', (request, response) => {
  response.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

// handler with HBS RENDER
app.get('/about', (request, response) => {
  response.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

// handler for Projects
app.get('/projects', (request, response) => {
  response.render('about.hbs',{
    pageTitle: 'Projects Page'
  });
});

// handler for bad
app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to handle request!'
  })
});


// start listening
app.listen(port, () => {
  console.log(`Server is up on port ${port}....`);
});
