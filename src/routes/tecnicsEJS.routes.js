const express = require('express');
const router = express.Router();
const Incidencia = require('../models/Incidencia');
const Tecnic = require('../models/Tecnic');
const Actuacio = require('../models/Actuacio');

router.get('/', async (req, res) => {
  try {
    const tecnics = await Tecnic.findAll({
      include: [
        {
          model: Incidencia,
          include: [Actuacio],
        },
      ],
    });

    const msg = req.query.msg || null;
    const type = req.query.type || 'success'; // <-- Afegeixo type
    res.render('tecnics/list', { tecnics, msg, type });
  } catch (error) {
    console.error('Error al carregar tècnics:', error);
    res.status(500).send('Error al carregar tècnics');
  }
});

router.get('/new', async (req, res) => {
  try {
    const tecnics = await Tecnic.findAll();
    res.render('tecnics/new', { tecnics });
  } catch (error) {
    console.error('Error al recuperar els tècnics:', error);
    res.status(500).send('Error al recuperar els tècnics');
  }
});

router.post('/create', async (req, res) => {
  try {
    const { nom } = req.body;
    await Tecnic.create({ nom: nom });
    // Aquí afegeixo type=success perquè la creació va bé
    res.redirect('/tecnics?msg=' + encodeURIComponent('Tècnic creat correctament!') + '&type=success');
  } catch (error) {
    console.error('Error al crear el tècnic:', error);
    res.redirect('/tecnics?msg=' + encodeURIComponent('Error en crear el tècnic.') + '&type=error');
  }
});

router.get('/:id/delete', async (req, res) => {
  try {
    const tecnic = await Tecnic.findByPk(req.params.id);
    if (!tecnic) {
      return res.redirect('/tecnics?msg=' + encodeURIComponent('Tècnic no trobat.') + '&type=error');
    }
    await tecnic.destroy();
    res.redirect('/tecnics?msg=' + encodeURIComponent('Tècnic eliminat correctament!') + '&type=success');
  } catch (error) {
    console.error('Error al eliminar el tècnic:', error);
    res.redirect('/tecnics?msg=' + encodeURIComponent('Error en eliminar el tècnic.') + '&type=error');
  }
});

module.exports = router;
