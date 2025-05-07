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
// Exportar el router
module.exports = router;


