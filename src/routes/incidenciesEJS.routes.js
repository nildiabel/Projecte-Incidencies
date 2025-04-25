// src/routes/motorcyclesEJS.routes.js
const express = require('express');
const router = express.Router();
const Incidencia = require('../models/Incidencia');

// Llistar motos (GET) 
router.get('/', async (req, res) => {
    try {
        const incidencies = await Incidencia.findAll();
        res.render('incidencies/list', { incidencies });
    }
    catch (error) {
        console.error('Error al recuperar les incidencies:', error);
        res.status(500).send('Error al recuperar les incidencies');
    }
});

// Form per crear una moto (GET)
router.get('/new', (req, res) => {
    res.render('incidencies/new');
});

// Crear moto (POST)
router.post('/create', async (req, res) => {
    try {
        const { descripcio, departament } = req.body;
        await Incidencia.create({ descripcio, prioritat: 'Null', departament });
        return res.redirect('/incidencies');
    } catch (error) {
        console.error('Error al crear incidencia:', error);
        return res.status(500).send('Error al crear la incidencia');
    }
});

// Form per editar una moto (GET)
router.get('/:id/edit', async (req, res) => {
    try {
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Moto no trobada');

        res.render('incidencies/edit', { incidencia });
    } catch (error) {
        res.status(500).send('Error al carregar el formulari d’edició');
    }
});

// Actualitzar moto (POST)
router.post('/:id/update', async (req, res) => {
    try {
        const { id, descripcio, prioritat, departament } = req.body;
        const incidencia = await Incidencia.findByPk(req.params.id);
        if (!incidencia) return res.status(404).send('Incidencia no trobada');
        incidencia.id = id;
        incidencia.descripcio = descripcio;
        incidencia.prioritat = prioritat;
        incidencia.departament = departament;
        await incidencia.save();

        res.redirect('/incidencies');
    } catch (error) {
        res.status(500).send('Error al actualitzar la incidencia');
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
