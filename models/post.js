module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to a User
    // A Post can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
