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
    type: DataTypes.ENUM('Baixa', 'Mitjana', 'Alta', 'Null'),
    allowNull: false, 
  }
});

module.exports = Incidencia;