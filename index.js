////////////////////////////////////
//  Import statements
////////////////////////////////////
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds');

//Global for port - differentiation between local and hosted ports
const PORT = process.env.PORT || 3000;

//Instantiate express and connect to mongoDB
var app = express();
mongoose.connect('mongodb://localhost/yelpcamp');

//Wipe data and then reseed database
//seedDB();

//Express settings
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
  secret: "Here is a totally secret phrase that nobody will guess",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//////////////////////////////////////
//  Routes
//////////////////////////////////////
//Landing Page
app.get('/', (req, res) => {
  res.render("landing", {currentUser: req.user});
});

//Index route
app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if(err) {
      console.log(err);
      res.redirect(`/`);
    } else {
      res.render("campgrounds/index", {campgrounds, currentUser: req.user});
    }
  });
});

//New route
app.get('/campgrounds/new', isLoggedIn, (req, res) => {
  res.render("campgrounds/new", {currentUser: req.user});
});

//Create route
app.post('/campgrounds', isLoggedIn, (req, res) => {
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
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
    if(err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      res.render("campgrounds/show", {campground, currentUser: req.user});
    }
  });
});

//New route
app.get('/campgrounds/:id/comments/new', isLoggedIn, (req,res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      res.render("comments/new", {campground, currentUser: req.user});
    }
  });
});

//Create route
app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
  const {comment, author} = req.body;
  Campground.findById(req.params.id, (err, campground) => {
    if(err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create({
        author: author,
        text: comment
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

app.get('/register', (req, res) => {
  res.render("users/register", {currentUser: req.user});
});

app.post('/register', (req, res) => {
  var {username, password} = req.body;

  User.register(new User({ username }), password, (err, user) => {
    if(err) {
      console.log(err);
      res.redirect('register');
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect('/campgrounds');
    });
  });
});

app.get('/login', (req, res) => {
  res.render("users/login", {currentUser: req.user});
});

app.post('/login', passport.authenticate("local", {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), (req, res) => {
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//Edit route
app.get('/campgrounds/:id/edit', isLoggedIn, (req, res) => {
  res.send("EDIT PAGE");
});

//Update route
app.put('/campgrounds/:id', isLoggedIn, (req, res) => {
  res.send("UPDATE ROUTE");
});

//Destroy route
app.delete('/campgrounds/:id', isLoggedIn, (req, res) => {
  res.send("DELETE ROUTE");
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
};

//Server Start
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));