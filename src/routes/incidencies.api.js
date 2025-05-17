const express = require('express');
const router = express.Router();
const Incidencia = require('../models/Incidencia'); // Sequelize model

router.get('/api/incidencies/:id', async (req, res) => {
  try {
    const incidencia = await Incidencia.findByPk(req.params.id ); // <-- aquí Sequelize
    if (!incidencia) return res.status(404).json({ error: 'No trobada' });
    res.json(incidencia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
