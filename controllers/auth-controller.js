const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;

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
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(404)
      .render("login", { message: "Please entrer your username and password" });
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
          .render("login", { message: "Username or password is incorret" });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).render("login", {
          message: "Username or password is incorret"
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).redirect("/dashboard");
      console.log(token);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
