// src/routes/tecnicsEJS.routes.js
const express = require('express');
const router = express.Router();
const Incidencia = require('../models/Incidencia');
const Tecnic = require('../models/Tecnic');
const Actuacio = require('../models/Actuacio');

// Llistar tecnics (GET)
// GET /tecnics
router.get('/', async (req, res) => {
    try {
    const tecnics = await Tecnic.findAll({
    include: [
        {
        model: Incidencia,
        include: [Actuacio],
        }
    ]
    });
        res.render('tecnics/list', { tecnics });
    } catch (error) {
        console.error('Error al carregar tècnics:', error);
        res.status(500).send('Error al carregar tècnics');
    }
});

// Form per crear una incidencia (GET)
router.get('/new', async (req, res) => {
    
    try {
        const tecnics = await Tecnic.findAll();

        res.render('tecnics/new', { tecnics });
    } catch (error) {
        console.error('Error al recuperar els tecnics:', error);
        res.status(500).send('Error al recuperar els tecnics');
    }
});

// Crear incidencia (POST)
router.post('/create', async (req, res) => {
    try {
        const { nom } = req.body;
        await Tecnic.create({ nom: nom });
        
        res.redirect('/tecnics');
    } catch (error) {
        console.error('Error al crear el tecnic:', error);
        return res.status(500).send('Error al crear el tecnic');
    }
});



// Eliminar tècnic (GET)
router.get('/:id/delete', async (req, res) => {
    try {
        const tecnic = await Tecnic.findByPk(req.params.id);
        if (!tecnic) return res.status(404).send('Tecnic no trobat');
        await tecnic.destroy();
        res.redirect('/tecnics');
    }
    catch (error) {
        res.status(500).send('Error al eliminar el tècnic');
    }
});

// Exportar el router
module.exports = router;
