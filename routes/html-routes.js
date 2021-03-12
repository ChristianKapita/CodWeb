// Requiring path to so we can use relative routes to our HTML files
//const path = require("path");
const db = require("../models");
const User = db.User;
const Post = db.Post;
//for Handlebars
module.exports = function(app) {
  app.get("/", (req, res) => {
    // if (req.session.user && req.cookies.user_sid) {
    //   res.redirect("/dashboard");
    // } else {
    //res.redirect("/login");
    //res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
    //}
  });
  app.get("/dashboard", (req, res) => {
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
        //res.json(dbPost);
        res.render("dashboard", {
          userData: {
            firstname: user.firstName,
            lastName: user.lastName,
            username: user.username,
            userID: user.id,
            country: user.Country,
            mobile: user.Mobile,
            email: user.email
          },
          dataPost: dbPost
        });
      });
    });
  });

  app.get("/sign-up", (req, res) => {
    res.render("sign-up");
  });
  app.get("/Post", (req, res) => {
    res.render("partials/post");
  });
  // app.get("/api/auth/signin", (req, res) => {
  //   res.redirect("/dashboard");
  // });
};
