'use strict';

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: `title cannot be empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: `description cannot be empty`
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {
          args: true,
          msg: `due date cannot be empty`
        }
      }
    }
  }, {
    hooks:{
      beforeCreate:(instance, option) => {
        if (instance.status == null) {
          instance.status = false
        }
      }
    }
  });
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, { foreignKey:`user_id` })
  };
  return Todo;
};