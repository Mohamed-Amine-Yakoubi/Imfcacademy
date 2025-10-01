const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");
 

const ReservationTable = sequelize.define(
  "Reservation_Table",
  {
    id_Reservation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nom_Prenom_Reservation: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  
    NumTel_Reservation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
        Nbr_personne_Reservation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
       Date_Reservation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
       Horraire_Reservation: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  
    Etat_Reservation: {
      type: DataTypes.ENUM("Approuver", "Annuler", "En attente"), // sans accent ni espace
      allowNull: false,
      defaultValue: "En attente",
    },
  },
  {
    tableName: "Reservation_Table",
    timestamps: true,
  }
);
 
module.exports = ReservationTable;
