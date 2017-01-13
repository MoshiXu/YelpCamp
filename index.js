var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

var campgrounds = ["Yosemite", "Denali", "Bryce Canyon", "South Rim"];

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/campgrounds', (req, res) => {
  res.render("campgrounds", {campgrounds});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));