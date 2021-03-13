const db = require("../models");
const Post = db.Post;
const User = db.User;

module.exports = function(app) {
  app.get("/api/displayPosts", (req, res) => {
    Post.findAll({
      include: [
        {
          model: User,
          required: true
        }
      ]
    }).then(dbPost => {
      res.json(dbPost);
    });
  });
};
