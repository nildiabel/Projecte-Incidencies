const express = require('express');
const router = express.Router();
const { getMongoCollection } = require('../mongo');
const UAParser = require('ua-parser-js');

const isAPIRequest = (req) => {
  return req.path.startsWith('/api/') || req.get('Accept') === 'application/json';
};

router.get('/admin/stats', async (req, res) => {
  try {
    const logsCollection = getMongoCollection();
    if (!logsCollection) throw new Error("Colección logs no disponible");

    // Accesos por día con conteo y ips únicas
    const statsData = await logsCollection.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          cantidad: { $sum: 1 },
          uniqueIps: { $addToSet: "$ip" }
        }
      },
      {
        $project: {
          fecha: "$_id",
          cantidad: 1,
          ipsUnicas: { $size: "$uniqueIps" },
          _id: 0
        }
      },
      { $sort: { fecha: 1 } }
    ]).toArray();

    const totalAccesos = statsData.reduce((sum, day) => sum + day.cantidad, 0);

    // Obtener todos los logs para parsear navegadores y SO
    const logs = await logsCollection.find().toArray();

    const navegadoresCount = {};
    const soCount = {};

    logs.forEach(log => {
      const ua = new UAParser(log.userAgent || '');
      const navegador = ua.getBrowser().name || 'Desconocido';
      const sistemaOperativo = ua.getOS().name || 'Desconocido';

      navegadoresCount[navegador] = (navegadoresCount[navegador] || 0) + 1;
      soCount[sistemaOperativo] = (soCount[sistemaOperativo] || 0) + 1;
    });

    const navegadoresData = Object.entries(navegadoresCount).map(([navegador, cantidad]) => ({ navegador, cantidad }));
    const soData = Object.entries(soCount).map(([sistemaOperativo, cantidad]) => ({ sistemaOperativo, cantidad }));

    if (isAPIRequest(req)) {
      return res.json({
        totalAccesos,
        byDay: statsData,
        navegadoresData,
        soData
      });
    }

    res.render('admin/stats', {
      stats: { totalAccesos },
      accesosPorDia: statsData,
      navegadoresData,
      soData,
      chartData: statsData // para gráfico principal
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

// En tu archivo de rutas:
router.get('/admin/contador', async (req, res) => {
  try {
    const totalAccesos = await Acceso.countDocuments();
    res.json({ totalAccesos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contador' });
  }
});


router.get('/paginasMasVisitadas', (req, res) => {
  const paginasMasVisitadas = [
    { pagina: '/', cantidad: 120 },
    { pagina: '/incidencies', cantidad: 95 },
    { pagina: '/actuacions', cantidad: 45 },
  ];

  res.json(paginasMasVisitadas);
});

module.exports = router;
