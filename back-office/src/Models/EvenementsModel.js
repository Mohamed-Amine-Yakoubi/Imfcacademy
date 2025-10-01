const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");

const Evenement = sequelize.define(
  "Evenements",
  {
    id_Evenement: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    libelle_Evenement: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    Description_Evenement: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo_Evenement: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("photo_Evenement");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("photo_Evenement", JSON.stringify(value));
      },
    },
    Date_Evenement: {
      // sans accents
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: false, // à moins que tu veuilles vraiment unique
    },

    horaire_Evenement: {
      // sans accents
      type: DataTypes.TIME,
      allowNull: false,
      unique: false, // à moins que tu veuilles vraiment unique
    },
  },
  {
    tableName: "Evenements",
    timestamps: true,
  }
);

module.exports = Evenement;
