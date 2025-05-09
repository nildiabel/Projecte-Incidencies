// src/models/Tipo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tipo = sequelize.define('Tipo', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },

  id_tipo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  nom_tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = Tipo;