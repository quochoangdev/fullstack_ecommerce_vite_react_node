"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Position_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Position_Role.belongsTo(models.Position, { foreignKey: 'position_id' });
      // Position_Role.belongsTo(models.Role, { foreignKey: 'role_id' });
    }
  }
  Position_Role.init(
    {
      PositionId: DataTypes.INTEGER,
      RoleId:  DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Position_Role",
    }
  );
  return Position_Role;
};
