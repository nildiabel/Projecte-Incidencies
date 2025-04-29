
// src/routes/categories.routes.js

const express = require('express');

const router = express.Router();

const Incidencia = require('../models/Incidencia');



// CREATE

router.post('/', async (req, res) => {

  try {

    const { descripcio } = req.body;

    const incidencia = await Incidencia.create({ descripcio });

    res.status(201).json(incidencia);

  } catch (error) {

    res.status(500).json({ error: 'Error en crear la incidencia' });

  }

});



// READ: totes

router.get('/', async (req, res) => {

  try {

    const incidencies = await Incidencia.findAll();

    res.json(incidencies);

  } catch (error) {

    res.status(500).json({ error: 'Error al recuperar les incidencies' });

  }

});



// READ: una sola

router.get('/:id', async (req, res) => {

  try {

    const incidencia = await Incidencia.findByPk(req.params.id);

    if (!incidencia) return res.status(404).json({ error: 'Incidencia no trobada' });

    res.json(incidencia);

  } catch (error) {

    res.status(500).json({ error: 'Error al recuperar la incidencia' });

  }

});



// UPDATE

router.put('/:id', async (req, res) => {

  try {

    const { descripcio } = req.body;

    const incidencia = await Incidencia.findByPk(req.params.id);

    if (!incidencia) return res.status(404).json({ error: 'Incidencia no trobada' });

    incidencia.descripcio = descripcio;

    await incidencia.save();

    res.json(incidencia);

  } catch (error) {

    res.status(500).json({ error: 'Error al fer update de la incidencia' });

  }

});



// DELETE

router.delete('/:id', async (req, res) => {

  try {

    const incidencia = await Incidencia.findByPk(req.params.id);

    if (!incidencia) return res.status(404).json({ error: 'Incidencia no trobada' });

    await incidencia.destroy();

    res.json({ message: 'Incidencia eliminada correctament' });

  } catch (error) {

    res.status(500).json({ error: 'Error al eliminar la incidencia' });

  }

});



module.exports = router;