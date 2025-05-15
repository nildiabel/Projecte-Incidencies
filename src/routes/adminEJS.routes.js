const express = require('express');
const router = express.Router();
const { getMongoCollection } = require('../mongo');

// Middleware para detectar solicitudes API
const isAPIRequest = (req) => {
  return req.path.startsWith('/api/') || req.get('Accept') === 'application/json';
};

// Ruta única para manejar HTML y JSON
router.get('/admin/stats', async (req, res) => {
  try {
    const logsCollection = getMongoCollection();
    
    // Consulta optimizada
    const statsData = await logsCollection.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          count: { $sum: 1 },
          uniqueIps: { $addToSet: "$ip" }
        }
      },
      {
        $project: {
          fecha: "$_id",
          cantidad: "$count",
          ipsUnicas: { $size: "$uniqueIps" },
          _id: 0
        }
      },
      { $sort: { fecha: 1 } }
    ]).toArray();

    const totalAccesos = statsData.reduce((sum, day) => sum + day.cantidad, 0);

    // Respuesta para API (JSON)
    if (isAPIRequest(req)) {
      return res.json({
        total: totalAccesos,
        byDay: statsData
      });
    }

    // Respuesta para navegador (HTML/EJS)
    res.render('admin/index', {
      stats: {
        totalAccesos,
        accesosPorDia: statsData
      },
      chartData: JSON.stringify(statsData.map(item => ({
        fecha: item.fecha,
        cantidad: item.cantidad
      })))
    });

  } catch (err) {
    console.error('Error:', err);
    if (isAPIRequest(req)) {
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      res.status(500).render('error', { error: 'Error en el panel' });
    }
  }
});

module.exports = router;