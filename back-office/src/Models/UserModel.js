const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");
 
 

const User = sequelize.define(
  "Users",
  {
    // Model attributes are defined here
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
    Email_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MotDePasse_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
  },
  {
    timestamps: false,
  }
);


module.exports = User;
