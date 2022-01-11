const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session'); 
var mongoose = require('mongoose'); 
var path = require('path');
var MongoStore = require('connect-mongo')(session); 
var flash = require('connect-flash'); 


// Config port
const app = express();
const port = process.env.PORT || 3001;



require('dotenv').config();

// Add middleware
// Create public folder to use relative path
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(expressLayouts);
app.use(session({
    secret: 'mysupersecret', 
    resave: false , 
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection }), 
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
})); 
app.use(flash()); 
app.use(function(req, res, next){
    res.locals.session = req.session; 
    next(); 
})
// Set layout folder
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/mainRoutes.js');
app.use('/', routes);

app.listen(port, () => console.log(`Listening to port ${port}`));
