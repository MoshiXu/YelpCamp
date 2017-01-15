var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
  {
    name: "Yosemite",
    image: "https://static.pexels.com/photos/104864/pexels-photo-104864.jpeg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Bryce Canyon",
    image: "https://static.pexels.com/photos/25543/pexels-photo-25543.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Denali",
    image: "https://static.pexels.com/photos/48638/pexels-photo-48638.jpeg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "South Rim",
    image: "https://static.pexels.com/photos/27865/pexels-photo-27865.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];


function seedDB(){
  Campground.remove({}, (err) => {
    if(err) {
      console.log(err);
    }
    console.log("Removed Campground data...");
    Comment.remove({}, (err) => {
      if(err) {
        console.log(err);
      }
      console.log("Removed Comment data...");
      // data.forEach((seed) => {
      //   Campground.create(seed, (err, campground) => {
      //     if(err) {
      //       console.log(err);
      //     } else {
      //       console.log("Populated database...");
      //       Comment.create({
      //         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      //         author: "Albert"
      //       }, (err, comment) => {
      //         if(err) {
      //           console.log(err);
      //         } else {
      //           campground.comments.push(comment);
      //           campground.save();
      //           console.log("Created comment...");
      //         }
      //       });
      //     }
      //   });
      // });
    });
  });
}

module.exports = seedDB;