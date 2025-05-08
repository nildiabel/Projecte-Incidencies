// src/models/Actuacio.js

const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Actuacio = sequelize.define("Actuacio", {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    },

    temps: {
        type: DataTypes.STRING,
        allowNull: true
      },

    id_incidencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    id_tecnic: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    
    descripcio_actuacio: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

module.exports = Actuacio;