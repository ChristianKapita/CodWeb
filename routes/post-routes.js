const db = require("../models");
const Post = db.Post;

module.exports = function(app) {
  app.post("/api/posts", (req, res) => {
    Post.create(req.body).then(dbPost => {
      res.json(dbPost);
    });
  });
};
