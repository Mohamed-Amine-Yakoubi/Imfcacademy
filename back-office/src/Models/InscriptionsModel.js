const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");
const Formations = require("./FormationsModel.js");

const Inscription = sequelize.define(
  "Inscription_formation",
  {
    id_Inscrit: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nom_Prenom_inscrit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email_inscrit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NumTel_Inscrit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NumCin_Inscrit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Adresse_Inscrit: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Montant_payer: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    Etat_Inscrit: {
      type: DataTypes.ENUM("Approuver", "Rejeter", "En attente"), // sans accent ni espace
      allowNull: false,
      defaultValue: "En attente",
    },
  },
  {
    tableName: "Inscription_formation",
    timestamps: true,
  }
);
Inscription.belongsTo(Formations, {
  foreignKey: "id_formation",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
module.exports = Inscription;
