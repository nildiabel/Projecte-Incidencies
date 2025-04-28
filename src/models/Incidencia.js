// src/models/Incidencies.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Incidencia = sequelize.define('Incidencia', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },

  id_departament: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  descripcio: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },

  prioritat: {
    type: DataTypes.STRING,
    allowNull: false, 
  }
});

module.exports = Incidencia;