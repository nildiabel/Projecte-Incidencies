// src/routes/tecnicsEJS.routes.js
const express = require('express');
const router = express.Router();
const Incidencia = require('../models/Incidencia');
const Tecnic = require('../models/Tecnic');
const Actuacio = require('../models/Actuacio');

// Llistar tècnics (GET)
// GET /tecnics
router.get('/', async (req, res) => {
  try {
    const tecnics = await Tecnic.findAll({
      include: [
        {
          model: Incidencia,
          include: [Actuacio],
        },
      ],
    });
    res.render('tecnics/list', { tecnics });
  } catch (error) {
    console.error('Error al carregar tècnics:', error);
    res.status(500).send('Error al carregar tècnics');
  }
});

// Formulari per crear un tècnic (GET)
router.get('/new', async (req, res) => {
  try {
    const tecnics = await Tecnic.findAll();
    res.render('tecnics/new', { tecnics });
  } catch (error) {
    console.error('Error al recuperar els tècnics:', error);
    res.status(500).send('Error al recuperar els tècnics');
  }
});

// Crear tècnic (POST)
router.post('/create', async (req, res) => {
  try {
    const { nom } = req.body;
    await Tecnic.create({ nom: nom });
    res.redirect('/tecnics');
  } catch (error) {
    console.error('Error al crear el tècnic:', error);
    res.redirect('/tecnics');
  }
});

// Eliminar tècnic (GET)
router.get('/:id/delete', async (req, res) => {
  try {
    const tecnic = await Tecnic.findByPk(req.params.id);
    if (!tecnic) {
      return res.redirect('/tecnics');
    }
    await tecnic.destroy();
    res.redirect('/tecnics');
  } catch (error) {
    console.error('Error al eliminar el tècnic:', error);
    res.redirect('/tecnics');
  }
});

// Exportar el router
module.exports = router;
