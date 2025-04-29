// src/routes/motorcyclesEJS.routes.js
const express = require('express');
const router = express.Router();
const Incidencia = require('../models/Incidencia');
const Departament = require('../models/Departament');
const Tecnic = require('../models/Tecnic');

// Llistar motos (GET) 
router.get('/', async (req, res) => {
    try {
        const incidencies = await Incidencia.findAll({ include: [Departament, Tecnic] });
        res.render('incidencies/list', { incidencies });
    }
    catch (error) { 
        console.error('Error al recuperar les incidencies:', error);
        res.status(500).send('Error al recuperar les incidencies');
    }
});

// Form per crear una moto (GET)
router.get('/new', async (req, res) => {
    try {
        const departaments = await Departament.findAll();
        const tecnics = await Tecnic.findAll();

        res.render('incidencies/new', { departaments, tecnics });
    } catch (error) {
        console.error('Error al recuperar els departaments:', error);
        res.status(500).send('Error al recuperar els departaments');
    }
});

// Crear incidencia (POST)
router.post('/create', async (req, res) => {
    try {
        const { descripcio, id } = req.body;
        await Incidencia.create({ descripcio, id_departament: id, id_tecnic: null, prioritat: null, estat: 'No resolt'});
        return res.redirect('/');
    } catch (error) {
        console.error('Error al crear incidencia:', error);
        return res.status(500).send('Error al crear la incidencia');
    }
});

// Form per editar una moto (GET)
router.get('/:id/edit', async (req, res) => {
    try {
      const incidencia = await Incidencia.findByPk(req.params.id);
      if (!incidencia) return res.status(404).send('Incidència no trobada');
  
      // Carrega els departaments i tècnics per als selects
      const departaments = await Departament.findAll();
      const tecnics = await Tecnic.findAll();
  
      res.render('incidencies/edit', { incidencia, departaments, tecnics });
    } catch (error) {
      res.status(500).send('Error al carregar el formulari d’edició');
    }
  });
  
  // Actualitzar incidència (POST)
router.post('/:id/update', async (req, res) => {
  try {
    const { descripcio, prioritat, departament_id, tecnic_id, estat } = req.body;
    const incidencia = await Incidencia.findByPk(req.params.id);
    if (!incidencia) return res.status(404).send('Incidència no trobada');

    incidencia.descripcio = descripcio;
    incidencia.prioritat = prioritat;
    incidencia.id_departament = parseInt(departament_id);
    incidencia.id_tecnic = parseInt(tecnic_id)
    incidencia.estat = estat;

    await incidencia.save();
    res.redirect('/incidencies');
  } catch (error) {
    console.error('Error al actualitzar la incidència:', error);
    res.status(500).send('Error al actualitzar la incidència');
  }
});

  
// Eliminar moto (GET, per simplicitat)
router.get('/:id/delete', async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');
        await incidencia.destroy();
        res.redirect('/incidencies');
    }
    catch (error) {
        res.status(500).send('Error al eliminar la moto');
    }
});

module.exports = router;
