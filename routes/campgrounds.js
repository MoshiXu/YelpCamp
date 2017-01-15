var express = require('express');
var Campground = require('../models/campground');
var router = express.Router();

//Index route
router.get('/', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if(err) {
      console.log(err);
      res.redirect(`/`);
    } else {
      res.render("campgrounds/index", {campgrounds});
    }
  });
});

//New route
router.get('/new', isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

//Create route
router.post('/', isLoggedIn, (req, res) => {
  var {campName, campImage, campDescription} = req.body;
  Campground.create({
    name: campName,
    image: campImage,
    description: campDescription
  }, (err, campground) => {
    if(err) {
      console.log(err);
      res.redirect('/campgrounds/new');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

//Show route
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
    if(err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      res.render("campgrounds/show", {campground});
    }
  });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
};

module.exports = router;