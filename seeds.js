var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
  {
    name: "Yosemite",
    image: "https://static.pexels.com/photos/104864/pexels-photo-104864.jpeg",
    description: "Bears everywhere."
  },
  {
    name: "Bryce Canyon",
    image: "https://static.pexels.com/photos/25543/pexels-photo-25543.jpg",
    description: "Rocks, rocks everywhere."
  },
  {
    name: "Denali",
    image: "https://static.pexels.com/photos/48638/pexels-photo-48638.jpeg",
    description: "It's in Alaska.  Sarah Palin lives there."
  },
  {
    name: "South Rim",
    image: "https://static.pexels.com/photos/27865/pexels-photo-27865.jpg",
    description: "It's a giant hole in the ground."
  }
];


function seedDB(){
  Campground.remove({}, (err) => {
    if(err) {
      console.log(err);
    }
    console.log("Removed Campground data...");
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if(err) {
          console.log(err);
        } else {
          console.log("Populated database...");
          Comment.create({
            text: "Here is a comment.",
            author: "Albert"
          }, (err, comment) => {
            if(err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created comment...");
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;