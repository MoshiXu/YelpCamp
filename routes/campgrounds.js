var express = require('express');
var Campground = require('../models/campground');
var {checkCampgroundOwnership, isLoggedIn} = require('../middleware/index');
var router = express.Router();

//Index route
router.get('/', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if(err) {
      console.log(err);
      req.flash("error", 'Oops, there was a problem retrieving the campgrounds!');
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
    description: campDescription,
    author: {
      id: req.user.id,
      username: req.user.username }
  }, (err, campground) => {
    if(err) {
      console.log(err);
      req.flash("error", 'Oops, your campground could not be created!');
      res.redirect('back');
    } else {
      req.flash("success", 'Campground created!');
      res.redirect('/campgrounds');
    }
  });
});

//Show route
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
    if(err) {
      console.log(err);
      req.flash("error", 'Campground not found!');
      res.redirect('/campgrounds');
    } else {
      res.render("campgrounds/show", {campground});
    }
  });
});

//Edit route
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
      req.flash("error", 'Campground not found!');
      res.redirect('back');
    } else {
      res.render("campgrounds/edit", {campground});
    }
  });
});

//Update route
router.put('/:id', checkCampgroundOwnership, (req, res) => {
  const {campName, campImage, campDescription} = req.body;
  Campground.findByIdAndUpdate(req.params.id, {
    name: campName,
    image: campImage,
    description: campDescription
    }, (err, campground) => {
    if(err) {
      console.log(err);
      req.flash("error", 'Oops, your campground could not updated!');
    }
    req.flash("success", 'Your campground has been updated!');
    res.redirect(`/campgrounds/${req.params.id}`);
  });
});

//Destroy route
router.delete('/:id', checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      console.log(err);
      req.flash("error", 'Oops, could not delete your campground!');
      res.redirect('back');
    }
  })
  req.flash("success", 'Campground deleted!');
  res.redirect('/campgrounds');
});

module.exports = router;