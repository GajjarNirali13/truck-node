var express = require('express');
var bodyParser = require('body-parser');
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');


// create express app
var app = express();


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// mongodb
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// Access-Control-Allow-Origin Issue
app.use(function (req, res, next) {
    var allowedOrigins = ['http://localhost:4200', 'http://localhost:8100']
    //res.setHeader('Access-Control-Allow-Origin', allowedOrigins);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/note.route')(app);
require('./app/routes/employee.route')(app);
require('./app/routes/truck.route')(app);
require('./app/routes/menu.route')(app);
require('./app/routes/user.route')(app);


// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});