// src/routes/categories.routes.js

const express = require('express');

const router = express.Router();

const Category = require('../models/Departament');
const Departament = require('../models/Departament');

// READ: totes

router.get('/', async (req, res) => {

    try {
  
      const Departament = await Departament.findAll();
  
      res.json(Departament);
  
    } catch (error) {
  
      res.status(500).json({ error: 'Error al recuperar els Departament' });
  
    }
  
  });

  module.exports = router;