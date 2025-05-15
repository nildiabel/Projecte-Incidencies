// src/routes/logsEJS.routes.js
const express = require('express');
const router = express.Router();
const { getMongoCollection } = require('../mongo');

// Variable para rastrear solicitudes recientes
const recentRequests = new Map();

// Middleware mejorado con triple protección
router.use(async (req, res, next) => {
  // 1. Filtro por tipo de solicitud y ruta
  if (req.method !== 'GET' || req.path.match(/\.(css|js|jpg|png|ico|svg|webp|woff2?)$/i)) {
    return next();
  }

  // 2. Clave única para identificar solicitudes similares
  const requestKey = `${req.ip}-${req.originalUrl}`;
  
  // 3. Comprobar si ya hemos registrado una solicitud idéntica recientemente
  if (recentRequests.has(requestKey)) {
    return next();
  }

  try {
    const logsCollection = getMongoCollection();
    
    // 4. Comprobar en MongoDB (protección adicional)
    const existingLog = await logsCollection.findOne({
      ip: req.ip,
      url: req.originalUrl,
      timestamp: { $gt: new Date(Date.now() - 3000) } // 3 segundos
    });

    if (!existingLog) {
      await logsCollection.insertOne({
        url: req.originalUrl,
        method: req.method,
        timestamp: new Date(),
        userAgent: req.get('User-Agent'),
        ip: req.ip
      });

      // Registrar en memoria para evitar duplicados en corto plazo
      recentRequests.set(requestKey, true);
      setTimeout(() => recentRequests.delete(requestKey), 3000); // Limpiar después de 3s
    }
  } catch (err) {
    console.error("Error registrando acceso:", err);
  }
  
  next();
});


// Ruta para obtener logs
router.get('/', async (req, res) => {
  try {
    const logsCollection = getMongoCollection();
    const logs = await logsCollection.find().sort({ timestamp: -1 }).toArray();
    res.render('logs/index', { logs });
  } catch (error) {
    console.error('Error al obtener los logs:', error);
    res.status(500).send('Error al obtener los logs');
  }
});

// src/routes/logsEJS.routes.js
router.get('/logs', async (req, res) => {
  try {
    const logsCollection = getMongoCollection();
    const logs = await logsCollection.find().sort({ timestamp: -1 }).toArray();
    res.json(logs);  // Responder con JSON
  } catch (error) {
    console.error('Error al obtener los logs:', error);
    res.status(500).send('Error al obtener los logs');
  }
});

router.get('/', async (req, res) => {
  try {
    const logsCollection = getMongoCollection();
    const logs = await logsCollection.find().sort({ timestamp: -1 }).toArray();  // Asegura que estén ordenados por la fecha más reciente
    res.render('logs/index', { logs });
  } catch (error) {
    console.error('Error al obtener los logs:', error);
    res.status(500).send('Error al obtener los logs');
  }
});

router.get('/api', async (req, res) => {
  try {
    const logsCollection = getMongoCollection();
    const logs = await logsCollection.find().sort({ timestamp: -1 }).toArray(); // 👈 también aquí
    res.json(logs);
  } catch (error) {
    console.error('Error al obtener los logs API:', error);
    res.status(500).json({ error: 'Error al obtener los logs' });
  }
});


router.post('/click', async (req, res) => {
  try {
    const { url, timestamp, userAgent } = req.body;
    const logsCollection = getMongoCollection();
    await logsCollection.insertOne({
      url,
      method: 'CLICK',
      timestamp: new Date(timestamp),
      userAgent,
    });
    res.status(200).json({ message: 'Click registrado' });
  } catch (error) {
    console.error('❌ Error al registrar el clic:', error);
    res.status(500).json({ error: 'Error al registrar el clic' });
  }
});



module.exports = router;
