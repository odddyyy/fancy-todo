'use strict';
const { hashPassword } = require(`../helper/bcrypt`)
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: `name cannot be empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: `email cannot be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: `password cannot be empty`
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (instance, option) => {
        return hashPassword(instance.password)
          .then(hashed => {
            instance.password = hashed
          })
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo, { foreignKey: `user_id` })
  };
  return User;
};