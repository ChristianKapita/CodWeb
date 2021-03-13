const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
//const Post = db.Post;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const cookieParser = require("cookie-parser");

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
      req.session.user = user.id;
      console.log(req.session.user);
      //res.status(200).send(user);
      res.redirect("/dashboard");
      console.log(token);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.changePassword = (req, res) => {
  if (
    !req.body.oldPassword ||
    !req.body.newPassword ||
    !req.body.confirmPassword
  ) {
    return res
      .status(404)
      .render("settings", { message: "All the fields are mendatory" });
  } else if (req.body.ChangePassword !== req.body.confirmPassword) {
    return res.status(404).render("settings", {
      message: "New password and confirm password not matching"
    });
  }
  User.findOne({
    where: {
      id: req.session.user
    }
  }).then(user => {
    const passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).render("login", {
        message: "Old password not correct"
      });
    }
    user
      .update(
        {
          password: passwordIsValid
        },
        {
          where: {
            id: req.session.user
          }
        }
      )
      .then(() => {
        res.render("login", {
          feedback: "Password changed. Please log in. "
        });
      });
  });
};
