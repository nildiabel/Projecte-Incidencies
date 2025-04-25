// src/models/Departament.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Departament = sequelize.define('Departament', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },

  departament: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  
  descripcio: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },

  prioritat: {
    type: DataTypes.ENUM('RRHH', 'Secretaría', 'Informática', 'Dirección'),
    allowNull: false, 
  }
});

module.exports = Departament;