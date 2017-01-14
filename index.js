////////////////////////////////////
//  Import statements
////////////////////////////////////
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');

//Global for port - differentiation between local and hosted ports
const PORT = process.env.PORT || 3000;

//Instantiate express and connect to mongoDB
var app = express();
mongoose.connect('mongodb://localhost/yelpcamp');

//Wipe data and then reseed database
seedDB();

//Express settings
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//////////////////////////////////////
//  Routes
//////////////////////////////////////
//Landing Page
app.get('/', (req, res) => {
  res.render("landing");
});

//Index route
app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if(err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds});
    }
  });
});

//New route
app.get('/campgrounds/new', (req, res) => {
  res.render("new");
});

//Create route
app.post('/campgrounds', (req, res) => {
  var {campName, campImage, campDescription} = req.body;
  Campground.create({
    name: campName,
    image: campImage,
    description: campDescription
  }, (err, campground) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

//Show route
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground});
    }
  });
});

//Edit route
app.get('/campgrounds/:id/edit', (req, res) => {
  res.send("EDIT PAGE");
});

//Update route
app.put('/campgrounds/:id', (req, res) => {
  res.send("UPDATE ROUTE");
});

//Destroy route
app.delete('/campgrounds/:id', (req, res) => {
  res.send("DELETE ROUTE");
});

//Server Start
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));