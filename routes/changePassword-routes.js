const db = require("../models");
//const Post = db.Post;
const User = db.User;
const bcrypt = require("bcryptjs");

module.exports = function(app) {
  app.put("/api/changePassword/:id", (req, res) => {
    const data = { password: bcrypt.hashSync(req.body.password, 8) };
    const selector = { where: { id: req.params.id } };

    User.update(data, selector).then(() => {
      res.render("login", {
        feedback:
          "Successfully change your password. Please login to continue. "
      });
    });
  });
};
