var express = require('express');
var passport = require('passport');
var {isLoggedIn} = require('../middleware/index');
var User = require('../models/user');
var router = express.Router();

//Landing Page
router.get('/', (req, res) => {
  res.render("landing");
});

router.get('/register', (req, res) => {
  res.render("users/register");
});

router.post('/register', (req, res) => {
  var {username, password} = req.body;

  User.register(new User({ username }), password, (err, user) => {
    if(err) {
      console.log(err);
      req.flash("error", `${err.message}!`);
      res.redirect('register');
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "You have successfully registered!");
      res.redirect('/campgrounds');
    });
  });
});

router.get('/login', (req, res) => {
  res.render("users/login");
});

router.post('/login', passport.authenticate("local", {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: "You have logged in!"
  }), (req, res) => {
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash("success", "You have logged out!");
  res.redirect('/');
});

module.exports = router;