const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const Post = db.Post;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    Country: req.body.Country,
    Mobile: req.body.Mobile,
    email: req.body.email
  })
    .then(() => {
      res.render("login", {
        feedback: "Successfully registered. Please login to continue. "
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(404)
      .render("login", { message: "Please enter a username and password" });
  }
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .render("login", { message: "Username or password is incorrect" });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).render("login", {
          message: "Username or password is incorrect"
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      //res.status(200).send(user);
      res.status(200).render("dashboard", {
        userData: {
          firstname: user.firstName,
          lastName: user.lastName,
          username: user.username,
          userID: user.id,
          country: user.Country,
          mobile: user.Mobile,
          email: user.email
        }
      });
      console.log(token);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.post = (req, res) => {
  // if (!req.body.content) {
  //   return res.status(404).send("Please add content for post!!!!");
  // }
  Post.create({
    content: req.text.content,
    UserId: req.text.userId
    //Post.create(req.body)
  })
    .then(() => {
      // res.render("post.handlebars", {
      //   feedbackPost: "Successfully Posted."
      // });
      res.send({ message: "Successfully Posted" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
