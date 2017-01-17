var express = require('express');
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var {checkCommentOwnership, isLoggedIn} = require('../middleware/index');
var router = express.Router({ mergeParams: true });

//New route
router.get('/new', isLoggedIn, (req,res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
      req.flash("error", 'Campground not found!');
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
      req.flash("error", 'Campground not found!');
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
          req.flash("error", 'Oops, your comment could not created!');
          res.redirect(`/campgrounds/${campground.id}`);
        }
        campground.comments.push(data);
        campground.save();
        req.flash("success", 'Comment created!');
        res.redirect(`/campgrounds/${campground.id}`);
      });
    }
  })
});

//Edit route
router.get('/:commentId/edit', checkCommentOwnership, (req, res) => {
  const campgroundId = req.params.id;
    Comment.findById(req.params.commentId, (err, comment) => {
      if(err) {
        console.log(err);
        req.flash("error", 'Comment not found!');
        res.redirect('back');
      }
      res.render('comments/edit', {campgroundId, comment});
    });
});

//Update route
router.put('/:commentId', checkCommentOwnership, (req, res) => {
  const { comment } = req.body;
  Comment.findByIdAndUpdate(req.params.commentId, { text: comment },
     (err, comment) => {
       if(err) {
         console.log(err);
         req.flash("error", 'Oops, could not update your comment!');
         res.redirect('back');
       }
       req.flash("success", 'Your comment has been updated!');
       res.redirect(`/campgrounds/${req.params.id}`);
  });
});

//Destroy route
router.delete('/:commentId', checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId, (err) => {
    if(err) {
      req.flash("error", 'Oops, could not delete your comment!');
      console.log(err);
    }
    req.flash("success", 'Comment deleted!');
    res.redirect('back');
  });
});

module.exports = router;