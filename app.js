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

// Quick fix for admin site
routes.get('/history.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/history.html'));
});
routes.get('/manage-customers.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/manage-customers.html'));
});
routes.get('/manage-staffs.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/manage-staffs.html'));
});
routes.get('/menu-cakes.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/menu-cakes.html'));
});
routes.get('/menu-coffee-powder.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/menu-coffee-powder.html'));
});
routes.get('/menu-coffee.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/menu-coffee.html'));
});
routes.get('/menu-fruit-tea.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/menu-fruit-tea.html'));
});
routes.get('/menu-snacks.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/menu-snacks.html'));
});
routes.get('/my-profile.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/my-profile.html'));
});
routes.get('/today-orders.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/today-orders.html'));
});
routes.get('/news.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/news.html'));
});
routes.get('/promotions.html',function(req,res){
    res.sendFile(path.join(__dirname+'/admin/promotions.html'));
});
app.use('/', routes);

app.listen(port, () => console.log(`Listening to port ${port}`));
