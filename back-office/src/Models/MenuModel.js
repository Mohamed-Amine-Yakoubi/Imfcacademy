const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");

const Menu = sequelize.define(
  "Menu",
  {
    id_Menu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Libelle_Menu: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    Description_Menu: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Prix_Menu: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Type_Menu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Specialite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo_Menu: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("photo_Menu");
        return rawValue || null; // retourne directement l'URL
      },
      set(value) {
        this.setDataValue("photo_Menu", value); // pas besoin de JSON.stringify
      },
    },
  },
  {
    tableName: "Menu",
    timestamps: true,
  }
);

module.exports = Menu;
