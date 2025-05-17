const { getMongoCollection } = require('../mongo');
const Acceso = require('../models/Acceso');

exports.obtenerEstadisticas = async (req, res) => {
    try {
      const navegadoresData = await Acceso.aggregate([
        { $group: { _id: '$navegador', cantidad: { $sum: 1 } } },
        { $project: { navegador: '$_id', cantidad: 1, _id: 0 } }
      ]);
  
      const soData = await Acceso.aggregate([
        { $group: { _id: '$sistemaOperativo', cantidad: { $sum: 1 } } },
        { $project: { sistemaOperativo: '$_id', cantidad: 1, _id: 0 } }
      ]);
  
      const accesosPorDia = await Acceso.aggregate([
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$fecha' } }, cantidad: { $sum: 1 } } },
        { $project: { fecha: '$_id', cantidad: 1, _id: 0 } },
        { $sort: { fecha: 1 } }
      ]);
  
      const totalAccesos = await Acceso.countDocuments();
  
      res.render('admin/stats', {
        navegadoresData,
        soData,
        stats: {
          totalAccesos,
          accesosPorDia
        },
        chartData: accesosPorDia // para usar en el script si quieres
      });
  
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).send('Error al obtener estadísticas');
    }
  };
  
async function getPaginasMasVisitadas(req, res) {
  try {
    const db = await connectDB();

    const paginasMasVisitadas = await db.collection('accesos').aggregate([
      { $group: { _id: "$ruta", cantidad: { $sum: 1 } } },
      { $sort: { cantidad: -1 } },
      { $limit: 10 }
    ]).toArray();

    const resultado = paginasMasVisitadas.map(item => ({
      pagina: item._id,
      cantidad: item.cantidad
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error obteniendo páginas más visitadas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { getPaginasMasVisitadas };
