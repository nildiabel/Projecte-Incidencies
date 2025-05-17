// src/routes/actuacionsEJS.routes.js
const express = require('express');
const router = express.Router();
const Actuacio = require('../models/Actuacio');
const Incidencia = require('../models/Incidencia');
const Tecnic = require('../models/Tecnic');
const Departament = require('../models/Departament');
const actuacionscontroller = require('../controllers/actuacions.controller');

router.get('/actuacions', actuacionscontroller.crearActuacio);

router.post('/create', async (req, res) => {
  try {
    const novaActuacio = await Actuacio.create({
      descripcio_actuacio: req.body.descripcio_actuacio,
      id_incidencia: parseInt(req.body.id_incidencia),
      id_tecnic: parseInt(req.body.id_tecnic),
      temps: parseInt(req.body.temps),
    });

    req.flash('success', `Actuació ${novaActuacio.id} creada correctament`);
    res.redirect('/actuacions');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error al crear la nova actuació');
    res.redirect('/actuacions/new');
  }
});



// Llistar actuacions (GET)
router.get('/', async (req, res) => {
  try {
    const actuacions = await Actuacio.findAll({ include: [Incidencia, Tecnic] });
    res.render('actuacions/list', {
      actuacions,
      messages: req.flash(), // <-- aquí
    });
  } catch (error) {
    res.status(500).send('Error al recuperar les actuacions');
  }
});


// Formulari nova actuació (GET)
router.get('/new', async (req, res) => {
  try {
    const incidencies = await Incidencia.findAll();
    const tecnics = await Tecnic.findAll();

    res.render('actuacions/new', {
      incidencies,
      tecnics,
      messages: {
        success: req.flash('success'),
        error: req.flash('error'),
      }
    });
  } catch (error) {
    console.error('Error al cargar el formulario de nova actuació:', error);
    req.flash('error', 'No es pot carregar el formulari');
    res.redirect('/actuacions');
  }
});


// Formulari edició (GET)
router.get('/:id/edit', async (req, res) => {
    try {
        const actuacio = await Actuacio.findByPk(req.params.id);
        if (!actuacio) return res.status(404).send('Actuació no trobada');

        const incidencies = await Incidencia.findAll();
        const tecnics = await Tecnic.findAll();

        res.render('actuacions/edit', {
            actuacio,
            incidencies,
            tecnics,
            messages: req.flash()
        });
    } catch (error) {
        console.error('Error al carregar el formulari d\'edició:', error);
        res.status(500).send('Error del servidor');
    }
});

// Actualitzar actuació (POST)
router.post('/:id/update', async (req, res) => {
    try {
        const { descripcio_actuacio, id_incidencia, id_tecnic, temps } = req.body;

        const actuacio = await Actuacio.findByPk(req.params.id);
        if (!actuacio) return res.status(404).send('Actuació no trobada');

        actuacio.descripcio_actuacio = descripcio_actuacio;
        actuacio.id_incidencia = parseInt(id_incidencia);
        actuacio.id_tecnic = parseInt(id_tecnic);
        actuacio.temps = parseInt(temps);
        await actuacio.save();

        req.flash('success', 'Actuació actualitzada correctament.');
        res.redirect('/actuacions');
    } catch (error) {
        console.error('Error al actualitzar l’actuació:', error);
        req.flash('error', 'Error al actualitzar l’actuació.');
        res.redirect(`/actuacions/${req.params.id}/edit`);
    }
});

router.post('/:id/delete', async (req, res) => {
  try {
    await Actuacio.destroy({ where: { id: req.params.id } });
    req.flash('success', `Actuació ${req.params.id} eliminada`);
    res.redirect('/actuacions');
  } catch (error) {
    console.error('Error al eliminar l’actuació:', error);
    req.flash('error', 'Error al eliminar l’actuació.');
    res.redirect('/actuacions');
  }
});


// Rutes de test per flash
router.get('/test-flash', (req, res) => {
    req.flash('success', 'Mensaje de prueba');
    res.redirect('/actuacions/test-flash-result');
});

router.get('/test-flash-result', (req, res) => {
    res.render('actuacions/list', { messages: req.flash() });
});


router.get('/test-message', (req, res) => {
  req.flash('success', 'Missatge de prova funcionant correctament!');
  res.redirect('/actuacions');
});

// Exportar el router
module.exports = router;
