var Campground = require('../models/campground');
var Comment = require('../models/comment');

var middleware = {
    checkCampgroundOwnership: (req, res, next) => {
      if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, campground) => {
          if(err) {
            console.log(err);
            res.redirect("back");
          } else if(campground.author.id.equals(req.user.id)) {
            return next();
          } else {
            req.flash("error", "You do no have permission to do that!");
            res.redirect("back");
          }
        });
      } else {
        req.flash("error", "You must be logged in to do that!");
        res.redirect('/login');
      }
    },

    checkCommentOwnership: (req, res, next) => {
      if(req.isAuthenticated()) {
        Comment.findById(req.params.commentId, (err, comment) => {
          if(err) {
            console.log(err);
            res.redirect('back');
          } else if(comment.author.id.equals(req.user.id)) {
            return next();
          } else {
            req.flash("error", "You do no have permission to do that!");
            res.redirect('back');
          }
        });
      } else {
        req.flash("error", "You must be logged in to do that!");
        res.redirect('/login');
      }
    },

    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) {
          return next();
        }
        req.flash("error", "You must be logged in to do that!");
        res.redirect('/login');
    }
}

module.exports = middleware;