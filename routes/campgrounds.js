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
    description: campDescription,
    author: {
      id: req.user.id,
      username: req.user.username }
  }, (err, campground) => {
    if(err) {
      console.log(err);
      res.redirect('back');
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

//Edit route
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
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
    }
    res.redirect(`/campgrounds/${req.params.id}`);
  });
});

//Destroy route
router.delete('/:id', checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      console.log(err);
      res.redirect('back');
    }
  })
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next) {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if(err) {
        console.log(err);
        res.redirect("back");
      } else if(campground.author.id.equals(req.user.id)) {
        return next();
      } else {
        res.redirect("back");
      }
    });
  } else {
    res.redirect('/login');
  }
}

module.exports = router;