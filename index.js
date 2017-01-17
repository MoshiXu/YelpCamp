////////////////////////////////////
//  Import statements
////////////////////////////////////
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var methodOverride = require('method-override');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');
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
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);
app.set("view engine", "ejs");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Server Start
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));