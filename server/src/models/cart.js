"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Sub_Product, { foreignKey: 'sub_product_id' });
      Cart.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Cart.init(
    {
      user_id: DataTypes.INTEGER,
      sub_product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      total: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
