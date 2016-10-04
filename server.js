// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//Require History Schema
var Articles = require('./models/Saved.js');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds041496.mlab.com:41496/heroku_566sh6mn');
// mongoose.connect('mongodb://localhost/NYTReact');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});


// -------------------------------------------------

// Main Route. This route will redirect to our rendered React application
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get('/api/', function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  Articles.find({})
    .exec(function(err, doc) {

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

// This is the route we will send POST requests to save each search.
app.post('/api/saved', function(req, res){
  //var newSearch = new History(req.body);

  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
  Saved.create({"title": req.body.title, "date": Date.now(), "url": req.body.url}, function(err, saved){
    if(err){
      console.log(err);
    }
    else {
      console.log(saved);
      res.send(saved);
    }
  })
});

app.post('/api/delete/:id', function(req, res){

	Saved.find({"_id": req.params.id}).remove(function(){
		console.log('article deleted');

	})
});


// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
