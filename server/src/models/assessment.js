"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Assessment.belongsTo(models.User, { foreignKey: 'user_id' });
      // Assessment.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  Assessment.init(
    {
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      rate: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Assessment",
    }
  );
  return Assessment;
};
