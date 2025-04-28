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

  nom_dpt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Departament;