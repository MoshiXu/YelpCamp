var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');

const PORT = process.env.PORT || 3000;

var app = express();
mongoose.connect('mongodb://localhost/yelpcamp');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render("landing");
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if(err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds});
    }
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render("new");
});

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

app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground});
    }
  });
});

app.get('/campgrounds/:id/edit', (req, res) => {
  res.send("EDIT PAGE");
});

app.put('/campgrounds/:id', (req, res) => {
  res.send("UPDATE ROUTE");
});

app.delete('/campgrounds/:id', (req, res) => {
  res.send("DELETE ROUTE");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));