"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ram.hasMany(models.Sub_Product, { foreignKey: 'ram_id' });
    }
  }
  Ram.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ram",
    }
  );
  return Ram;
};
