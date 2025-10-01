const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,         // enis
  process.env.DB_USER,         // root
  process.env.DB_PASSWORD,     // mot de passe
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // mysql
    port: process.env.DB_PORT,
 logging: console.log,
  }
);

 
module.exports = sequelize;
