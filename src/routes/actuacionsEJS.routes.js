// src/routes/actuacionsEJS.routes.js
const express = require('express');
const router = express.Router();
const Actuacio = require('../models/Actuacio');
const Incidencia = require('../models/Incidencia');
const Tecnic = require('../models/Tecnic');
const Departament = require('../models/Departament');

// Llistar actuacions (GET)
router.get('/', async (req, res) => {
    try {
        const actuacions = await Actuacio.findAll({ include: [Incidencia, Tecnic] });

        const infoIncidencia = await Incidencia.findByPk(req.params.id, {
            include: [
                { model: Departament, attributes: ['id', 'nom_dpt'] },
                { model: Tecnic, attributes: ['id', 'nom'] },
            ],
        });

        res.render('actuacions/list', { actuacions, infoIncidencia });
    } catch (error) {
        console.error('Error al recuperar les actuacions:', error);
        res.status(500).send('Error al recuperar les actuacions');
    }
});

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
      });
    } catch (error) {
      console.error('Error al carregar el formulari d\'edició:', error);
      res.status(500).send('Error del servidor');
    }
  });

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

    res.redirect('/actuacions');
  } catch (error) {
    console.error('Error al actualitzar l’actuació:', error);
    res.status(500).send('Error al actualitzar l’actuació'+error.message);
  }
});

router.get('/new', async (req, res) => {
    try {
      const incidencies = await Incidencia.findAll();
      const tecnics = await Tecnic.findAll();
  
      res.render('actuacions/new', {
        incidencies,
        tecnics,
      });
    } catch (error) {
      console.error('Error al carregar el formulari de nova actuació:', error);
      res.status(500).send('Error del servidor');
    }
  });

  router.post('/create', async (req, res) => {
    try {
      const { descripcio_actuacio, id_incidencia, id_tecnic, temps } = req.body;
  
      await Actuacio.create({
        descripcio_actuacio,
        id_incidencia: parseInt(id_incidencia),
        id_tecnic: parseInt(id_tecnic),
        temps: parseInt(temps),
      });
  
      res.redirect('/actuacions');
    } catch (error) {
      console.error('Error al crear l’actuació:', error);
      res.status(500).send('Error al crear l’actuació: ' + error.message);
    }
  });
  

  router.get('/new', async (req, res) => {
    const incidencies = await Incidencia.findAll();
    const tecnics = await Tecnic.findAll();
    res.render('actuacions/new', { incidencies, tecnics });
  });
  
  
// Exportar el router
module.exports = router;


