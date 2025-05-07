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

  id_tecnic: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  
  descripcio: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },

  prioritat: {
    type: DataTypes.ENUM('Baixa', 'Mitjana', 'Alta'),
    allowNull: true, 
  },

  estat: {
    type: DataTypes.ENUM('Resolt', 'No resolt'),
    allowNull: false,
    defaultValue: 'No resolt'
  }  
});

module.exports = Incidencia;