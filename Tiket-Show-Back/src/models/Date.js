const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("date", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
