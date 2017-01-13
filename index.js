var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

var campgrounds = [
  {
    name: "Yosemite",
    image: "https://static.pexels.com/photos/104864/pexels-photo-104864.jpeg"
  },
  {
    name: "Denali",
    image: "https://static.pexels.com/photos/48638/pexels-photo-48638.jpeg"
  },
  {
    name: "Bryce Canyon",
    image: "https://static.pexels.com/photos/25543/pexels-photo-25543.jpg"
  },
  {
    name: "South Rim",
    image: "https://static.pexels.com/photos/27865/pexels-photo-27865.jpg"
  }];

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/campgrounds', (req, res) => {
  res.render("campgrounds", {campgrounds});
});

app.get('/campgrounds/new', (req, res) => {
  res.render("newCampgroundForm");
});

app.post('/campgrounds', (req, res) => {
  var {campName, campImage} = req.body;
  var newCamp = {
    name: campName,
    image: campImage
  };

  campgrounds.push(newCamp);
  res.redirect('/campgrounds');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));