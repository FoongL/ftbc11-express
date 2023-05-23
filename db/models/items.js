const { Model } = require("sequelize");
const users = require("./users");
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Items.belongsTo(models.users)
    }
  }
  Items.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: { // --> user_id
        allowNull: false,
        type: DataTypes.STRING,
        references:{
            model: users,
            key:'id'
        }
      }
    },
    {
      sequelize,
      modelName: "items",
      underscored: true,
    }
  );
  return Items;
};
