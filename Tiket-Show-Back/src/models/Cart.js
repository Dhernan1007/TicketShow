// models/cart.js
const { DataTypes } = require('sequelize');
//const Sequelize = require("sequelize");

module.exports = (sequelize) => {
   sequelize.define('cartItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   defaultValue: null,
    // },
  });
  // CartItem.associate = (model) => {
  //   sequelize.model.User.hasMany(CartItem, {
  //     foreignKey: 'user_id',
  //     onDelete: 'CASCADE',
  //     onUpdate: 'CASCADE',
  //   });

  //   CartItem.belongsTo(sequelize.model.User, {
  //     foreignKey: 'user_id',
  //     onDelete: 'CASCADE',
  //     onUpdate: 'CASCADE',
  //   });
  // };


  
};


