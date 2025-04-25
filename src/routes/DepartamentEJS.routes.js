// src/routes/motorcyclesEJS.routes.js
const express = require('express');
const router = express.Router();
const Departament = require('../models/Departament');

// Llistar motos (GET) 
router.get('/', async (req, res) => {
    try {
        const Departament = await Departament.findAll();
        res.render('Departament/list', { Departament });
    }
    catch (error) {
        console.error('Error al recuperar els departaments:', error);
        res.status(500).send('Error al recuperar els departaments');
    }
});

module.exports = router;
