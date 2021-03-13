const db = require("../models");
const Post = db.Post;
const User = db.User;

module.exports = function(app) {
  app.get("/api/profilePosts/:id", (req, res) => {
    Post.findAll({
      include: [
        {
          model: User,
          required: true
        }
      ],
      where: {
        UserId: req.params.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });
};
