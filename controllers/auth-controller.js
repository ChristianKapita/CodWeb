const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;

//const Op = db.sequelize.Op;
const jwt = require("jsonwebtoken");
// //const bcrypt = require("bcryptjs");
exports.signin = (req, res) => {
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

      if (req.body.password.trim() !== user.password) {
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
