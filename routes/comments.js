var express = require('express');
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var router = express.Router({ mergeParams: true });

//New route
router.get('/new', isLoggedIn, (req,res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      res.render("comments/new", {campground});
    }
  });
});

//Create route
router.post('/', isLoggedIn, (req, res) => {
  const {comment} = req.body;
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create({
        text: comment,
        author: {
          id: req.user.id,
          username: req.user.username
        }
      }, (err, data) => {
        if(err) {
          console.log(err);
          res.redirect(`/campgrounds/${campground.id}`);
        }
        campground.comments.push(data);
        campground.save();
        res.redirect(`/campgrounds/${campground.id}`);
      });
    }
  })
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
};

module.exports = router;