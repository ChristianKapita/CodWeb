// Requiring path to so we can use relative routes to our HTML files
//const path = require("path");
const db = require("../models");
const User = db.User;
const Post = db.Post;
//for Handlebars
module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("login");
  });
  app.get("/dashboard", (req, res) => {
    if (!req.session.user) {
      res.redirect("/");
    }
    User.findOne({
      where: {
        id: req.session.user
      }
    }).then(user => {
      Post.findAll({
        include: [
          {
            model: User,
            required: true
          }
        ]
      }).then(dbPost => {
        //res.json({ dbPost, user });
        res.render("dashboard", {
          dataPost: dbPost,
          userData: {
            firstname: user.firstName,
            lastName: user.lastName,
            username: user.username,
            userID: user.id,
            country: user.Country,
            mobile: user.Mobile,
            email: user.email,
            bio: user.bio,
            defaultImage: user.defaultImage
          }
        });
      });
    });
  });
  //});

  app.get("/sign-up", (req, res) => {
    res.render("sign-up");
  });
  app.get("/post", (req, res) => {
    res.render("partials/post");
  });
  app.get("/s", (req, res) => {
    res.render("partials/post");
  });
  // app.get("/api/auth/signin", (req, res) => {
  //   res.redirect("/dashboard");
  // });
};
