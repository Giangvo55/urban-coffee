const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');

// Config port
const app = express();
const port = process.env.PORT || 3001;


require('dotenv').config();

// Add middleware
// Create public folder to use relative path
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(expressLayouts);

// Set layout folder
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/mainRoutes.js')
app.use('/', routes);

app.listen(port, () => console.log(`Listening to port ${port}`));
