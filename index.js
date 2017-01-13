var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

var campgrounds = ["Yosemite", "Denali", "Bryce Canyon", "South Rim"];

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/campgrounds', (req, res) => {
  res.render("campgrounds", {campgrounds});
});

app.get('/newCampground', (req, res) => {
  res.render("newCampgroundForm");
});

app.post('/newCampground', (req, res) => {
  var name = req.body.campName;
  campgrounds.push(name);
  res.redirect('/campgrounds');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));