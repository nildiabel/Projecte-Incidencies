// src/routes/departamentEJS.routes.js
const express = require('express');
const router = express.Router();
const Departament = require('../models/Departament');

// Llistar motos (GET) 
router.get('/', async (req, res) => {
    try {
      const departaments = await Departament.findAll();
      res.render('departaments/list', { departaments });
    } catch (error) {
      res.status(500).send('Error al recuperar categories');
    }
  });

module.exports = router;
