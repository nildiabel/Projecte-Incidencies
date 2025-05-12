// src/models/Tipus.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tipu = sequelize.define('Tipu', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_tipus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Tipu;