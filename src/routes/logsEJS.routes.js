// src/routes/logsEJS.routes.js
const express = require('express');
const router = express.Router();

const { getMongoCollection } = require('../mongo');

router.get('/', async (req, res) => {
  try {
    const logsCollection = getMongoCollection();
    const logs = await logsCollection.find().toArray();
    res.render('logs/index', { logs });
  } catch (error) {
    console.error('Error al obtener los logs:', error);
    res.status(500).send('Error al obtener los logs');
  }
});

module.exports = router;
