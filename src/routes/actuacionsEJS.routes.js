// src/routes/actuacionsEJS.routes.js
const express = require('express');
const router = express.Router();
const Actuacio = require('../models/Actuacio');
const Incidencia = require('../models/Incidencia');
const Tecnic = require('../models/Tecnic');

router.post('/create', async (req, res) => {
  try {
    await Actuacio.create({
      descripcio_actuacio: req.body.descripcio_actuacio,
      id_incidencia: parseInt(req.body.id_incidencia),
      id_tecnic: parseInt(req.body.id_tecnic),
      temps: parseInt(req.body.temps),
    });

    res.redirect('/actuacions?msg=' + encodeURIComponent('Actuació creada correctament!') + '&type=success');
  } catch (error) {
    console.error(error);
    res.redirect('/actuacions/new?msg=' + encodeURIComponent('Error al crear l’actuació') + '&type=error');
  }
});


// Llistar actuacions (GET)
router.get('/', async (req, res) => {
  try {
    const actuacions = await Actuacio.findAll({ include: [Incidencia, Tecnic] });

    // Capturar posibles mensajes de query params
    const msg = req.query.msg || null;
    const type = req.query.type || null;

    res.render('actuacions/list', {
      actuacions,
      msg,
      type
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
      tecnics
    });
  } catch (error) {
    console.error('Error al cargar el formulari de nova actuació:', error);
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

    // Leer redirectTo del query, por defecto a /actuacions
    const redirectTo = req.query.redirectTo || '/actuacions';

    res.render('actuacions/edit', {
      actuacio,
      incidencies,
      tecnics,
      redirectTo
    });
  } catch (error) {
    console.error('Error al carregar el formulari d\'edició:', error);
    res.status(500).send('Error del servidor');
  }
});

// Actualitzar actuació (POST)
router.post('/:id/update', async (req, res) => {
  try {
    const { descripcio_actuacio, id_incidencia, id_tecnic, temps, redirectTo } = req.body;

    const actuacio = await Actuacio.findByPk(req.params.id);
    if (!actuacio) return res.status(404).send('Actuació no trobada');

    actuacio.descripcio_actuacio = descripcio_actuacio;
    actuacio.id_incidencia = parseInt(id_incidencia);
    actuacio.id_tecnic = parseInt(id_tecnic);
    actuacio.temps = parseInt(temps);
    await actuacio.save();

    // Redirigir con mensaje de éxito en query string
    res.redirect(`${redirectTo || '/actuacions'}?msg=${encodeURIComponent('Actuació actualitzada correctament!')}&type=success`);
  } catch (error) {
    console.error('Error al actualitzar l’actuació:', error);
    res.redirect(`/actuacions/${req.params.id}/edit`);
  }
});

router.post('/:id/delete', async (req, res) => {
  const redirectTo = req.body.redirectTo || '/actuacions';

  try {
    await Actuacio.destroy({ where: { id: req.params.id } });
    res.redirect(redirectTo + '?msg=' + encodeURIComponent('Actuació eliminada correctament!') + '&type=success');
  } catch (error) {
    console.error('Error al eliminar l’actuació:', error);
    res.redirect(redirectTo + '?msg=' + encodeURIComponent('Error al eliminar l’actuació') + '&type=error');
  }
});


// Exportar el router
module.exports = router;
