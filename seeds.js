var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');

var campData = [
  {
    name: "Yosemite",
    image: "https://static.pexels.com/photos/104864/pexels-photo-104864.jpeg",
    price: "9.99",
    author: {},
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Bryce Canyon",
    image: "https://static.pexels.com/photos/25543/pexels-photo-25543.jpg",
    price: "6.99",
    author: {},
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Denali",
    image: "https://static.pexels.com/photos/48638/pexels-photo-48638.jpeg",
    price: "21.99",
    author: {},
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "South Rim",
    image: "https://static.pexels.com/photos/27865/pexels-photo-27865.jpg",
    price: "8.99",
    author: {},
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

var commentData = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  author: {}
};

function seedDB(){
  User.remove({}, (err) => {
    if(err) {
      console.log(err);
    }
    User.register(new User({ username: "nmabachi" }), "password", (err, user) => {
      if(err) {
        console.log(err);
      }
      commentData.author.id = user.id;
      commentData.author.username = user.username;
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
          campData.forEach((seed) => {
            seed.author.id = user.id;
            seed.author.username = user.username;
            Campground.create(seed, (err, campground) => {
              if(err) {
                console.log(err);
              } else {
                console.log("Created campground...");
                Comment.create(commentData, (err, comment) => {
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
      });
    });
  });
}

module.exports = seedDB;