const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database.js");

const Formation = sequelize.define(
  "Formations",
  {
    id_formation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    libelle_formation: {  // sans accent
      type: DataTypes.STRING,
      allowNull: false,
    
    },
    modules_enseignes: {  // sans accents
      type: DataTypes.STRING,
      allowNull: false,
     },
    
    prix_formation: {  // sans accents
      type: DataTypes.FLOAT,
   // à moins que tu veuilles vraiment unique
    },
    photo_formation: {
      type: DataTypes.TEXT,
              get() {
    const rawValue = this.getDataValue('photo_formation');
    return rawValue ? JSON.parse(rawValue) : [];
  },
  set(value) {
    this.setDataValue('photo_formation', JSON.stringify(value));
  }
    },
    type_formation: {
      type: DataTypes.ENUM("Aide Pâtisserie", "Aide Cuisinier", "Agent de Réception et Accueil", "Aide Service et Bar","Agent de Nettoyage"), // sans accent ni espace
      allowNull: false,
    },
    
    Date_Debut: {  // sans accents
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: false, // à moins que tu veuilles vraiment unique
    },
      Date_Fin: {  // sans accents
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: false, // à moins que tu veuilles vraiment unique
    },
  },
  {
    tableName: "Formations",
    timestamps: true,
  }
);

module.exports = Formation;
