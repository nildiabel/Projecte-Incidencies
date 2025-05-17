// src/routes/motorcyclesEJS.routes.js
const express = require('express');
const router = express.Router();

const Incidencia = require('../models/Incidencia');
const Departament = require('../models/Departament');
const Tecnic = require('../models/Tecnic');
const Tipu = require('../models/Tipu');

// Listar incidencias
router.get('/', async (req, res) => {
  try {
    const incidencies = await Incidencia.findAll({
      include: [Tipu, Departament, Tecnic],
      order: [['createdAt', 'DESC']]
    });
    console.log('Mensajes flash:', req.flash());
    res.render('incidencies/list', {
      incidencies,
    });
  } catch (error) {
    console.error('Error al recuperar les incidencies:', error);
    req.flash('error', 'Error al cargar las incidencias');
    res.redirect('/');
  }
});

// Formulario para crear incidencia
router.get('/new', async (req, res) => {
  try {
    const departaments = await Departament.findAll();
    const tecnics = await Tecnic.findAll();
    const tipus_const = await Tipu.findAll();

    res.render('incidencies/new', {
      departaments,
      tecnics,
      tipus_const,
      messages: req.flash(),
    });
  } catch (error) {
    console.error('Error al recuperar datos para nuevo incidencia:', error);
    req.flash('error', 'Error al cargar el formulario');
    res.redirect('/incidencies');
  }
});

// Crear incidencia (POST)
router.post('/create', async (req, res) => {
  try {
    // Recoge datos del formulario
    const { descripcio, id_departament, id_tecnic, id_tipus, prioritat, estat } = req.body;

    await Incidencia.create({
      descripcio,
      id_departament,
      id_tecnic: id_tecnic || null,
      id_tipus,
      prioritat: prioritat || null,
      estat: estat || 'No resolt',
    });

    req.flash('success', 'Incidència creada correctament.');
    res.redirect('/');
  } catch (error) {
    console.error('Error al crear incidencia:', error);
    req.flash('error', 'Error al crear la incidencia');

    // En caso de error, recarga el form con datos para no perder selects
    try {
      const departaments = await Departament.findAll();
      const tecnics = await Tecnic.findAll();
      const tipus_const = await Tipu.findAll();

      res.render('incidencies/new', {
        departaments,
        tecnics,
        tipus_const,
        messages: req.flash(),
        old: req.body, // para rellenar inputs con lo que el usuario ingresó
      });
    } catch (err) {
      console.error('Error al recargar el formulario tras fallo:', err);
      res.redirect('/incidencies/new');
    }
  }
});

// Formulario para editar incidencia
router.get('/:id/edit', async (req, res) => {
  try {
    const incidencia = await Incidencia.findByPk(req.params.id);
    if (!incidencia) {
      req.flash('error', 'Incidència no trobada.');
      return res.redirect('/incidencies');
    }

    const departaments = await Departament.findAll();
    const tecnics = await Tecnic.findAll();
    const tipus = await Tipu.findAll();

    res.render('incidencies/edit', {
      incidencia,
      departaments,
      tecnics,
      tipus,
      messages: req.flash(),
    });
  } catch (error) {
    console.error('Error al cargar formulario de edición:', error);
    req.flash('error', 'Error al cargar el formulario de edición');
    res.redirect('/incidencies');
  }
});

// Actualizar incidencia (POST)
router.post('/:id/update', async (req, res) => {
  try {
    const { descripcio, prioritat, id_tecnic, estat, id_departament, id_tipus } = req.body;
    const incidencia = await Incidencia.findByPk(req.params.id);
    if (!incidencia) {
      req.flash('error', 'Incidència no trobada.');
      return res.redirect('/incidencies');
    }

    incidencia.descripcio = descripcio;
    incidencia.prioritat = prioritat;
    incidencia.id_tecnic = id_tecnic || null;
    incidencia.estat = estat;
    incidencia.id_departament = id_departament;
    incidencia.id_tipus = id_tipus;

    await incidencia.save();

    req.flash('success', 'Incidència editada correctament.');
    res.redirect('/incidencies');
  } catch (error) {
    console.error('Error al actualizar la incidencia:', error);
    req.flash('error', 'Error al editar la incidencia.');
    res.redirect(`/incidencies/${req.params.id}/edit`);
  }
});

// Eliminar incidencia
router.get('/:id/delete', async (req, res) => {
  try {
    const incidencia = await Incidencia.findByPk(req.params.id);
    if (!incidencia) {
      req.flash('error', 'Incidència no trobada.');
      return res.redirect('/incidencies');
    }

    await incidencia.destroy();
    req.flash('success', 'Incidència eliminada correctament.');
    res.redirect('/incidencies');
  } catch (error) {
    console.error('Error al eliminar la incidencia:', error);
    req.flash('error', 'Error al eliminar la incidencia.');
    res.redirect('/incidencies');
  }
});

module.exports = router;
