// src/routes/departament.routes.js

const express = require('express');

const router = express.Router();

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

  router.get('/incidencies/create', async (req, res) => {
    try {
      // Obtener todos los departamentos de la base de datos
      const departaments = await Departament.findAll();
      
      // Renderizar la vista y pasar los departamentos
      res.render('incidencies/create', { departaments });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los departamentos');
    }
  });

  module.exports = router;