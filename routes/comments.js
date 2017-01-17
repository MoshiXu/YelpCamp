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

//Edit route
router.get('/:commentId/edit', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
      res.redirect('back');
    }
    Comment.findById(req.params.commentId, (err, comment) => {
      if(err) {
        console.log(err);
        res.redirect('back');
      }
      res.render('comments/edit', {campground, comment});
    });
  });
});

//Update route
router.put('/:commentId', (req, res) => {
  const { comment } = req.body;
  Comment.findByIdAndUpdate(req.params.commentId, { text: comment },
     (err, comment) => {
       if(err) {
         console.log(err);
         res.redirect('back');
       }
       res.redirect(`/campgrounds/${req.params.id}`);
  });
});

//Destroy route
router.delete('/:commentId', (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId, (err) => {
    if(err) {
      console.log(err);
    }
    res.redirect('back');
  })
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
};

module.exports = router;