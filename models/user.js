module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Country: {
      type: DataTypes.STRING
    },
    Mobile: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    Role: {
      type: DataTypes.STRING,
      defaultValue: "Member"
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: "Hey there! I am using CodWeb! "
    },
    defaultImage: {
      type: DataTypes.STRING,
      defaultValue: "/public/imgs/user.png"
    }
  });
  return User;
};
