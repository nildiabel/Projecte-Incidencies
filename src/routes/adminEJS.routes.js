const express = require('express');
const router = express.Router();

router.get('/admin/stats', (req, res) => {
  const stats = {
    totalAccesos: 125,
    accesosPorDia: [
      { fecha: '2025-05-10', cantidad: 35 },
      { fecha: '2025-05-11', cantidad: 40 },
      { fecha: '2025-05-12', cantidad: 50 },
    ],
  };

  res.render('logs/stats', { stats });
});

module.exports = router;
