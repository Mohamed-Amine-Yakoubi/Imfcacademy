const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");
 

const Contact = sequelize.define(
  "Contact",
  {
    id_Contact: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nom_Prenom_Contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  
    NumTel_Contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
        Email_Contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
       Sujet_Contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
       Message_Contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    Etat_Contact: {
      type: DataTypes.ENUM("Approuver",  "En attente"), // sans accent ni espace
      allowNull: false,
      defaultValue: "En attente",
    },
  },
  {
    tableName: "Contact",
    timestamps: true,
  }
);
 
module.exports = Contact;
