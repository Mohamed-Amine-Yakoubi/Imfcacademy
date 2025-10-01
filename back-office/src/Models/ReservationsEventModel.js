const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");
const Evenements = require("./EvenementsModel.js");

const ReservationEvent = sequelize.define(
  "Reservation_Event",
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

    Nbr_personnes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  
    Etat_Reservation: {
      type: DataTypes.ENUM("En attente","Approuver", "Annuler"), // sans accent ni espace
      allowNull: false,
        defaultValue: "En attente",
    },
  },
  {
    tableName: "Reservation_Event",
    timestamps: true,
  }
);
ReservationEvent.belongsTo(Evenements, {
  foreignKey: "id_Evenement",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
module.exports = ReservationEvent;
