const Actuacio = require('../models/Actuacio'); // Modelo de actuaciones correcto

// Listar actuacions
exports.listarActuacions = async (req, res) => {
  try {
    const actuacions = await Actuacio.findAll();
    res.render('actuacions/list', {
      actuacions,
      messages: req.flash()
    });
  } catch (error) {
    req.flash('error', '❌ Error al carregar les actuacions.');
    res.redirect('/');
  }
};

// Mostrar formulario para crear nueva actuació
exports.formCrearActuacio = (req, res) => {
  res.render('actuacions/new', { messages: req.flash() });
};

// Crear actuació
exports.crearActuacio = async (req, res) => {
  try {
    await Actuacio.create(req.body);
    req.flash('success', '✅ Actuació creada correctament.');
    res.redirect('/actuacions');
  } catch (error) {
    req.flash('error', '❌ Error al crear l’actuació.');
    res.redirect('/actuacions/new');
  }
};

// Mostrar formulario para editar actuació
exports.formEditarActuacio = async (req, res) => {
  try {
    const actuacio = await Actuacio.findByPk(req.params.id);
    if (!actuacio) {
      req.flash('error', 'Actuació no trobada.');
      return res.redirect('/actuacions');
    }
    res.render('actuacions/edit', { actuacio, messages: req.flash() });
  } catch (error) {
    req.flash('error', 'No s’ha pogut carregar l’actuació.');
    res.redirect('/actuacions');
  }
};

// Editar actuació
exports.editarActuacio = async (req, res) => {
  try {
    await Actuacio.update(req.body, { where: { id: req.params.id } });
    req.flash('success', '✏️ Actuació editada correctament.');
    res.redirect('/actuacions');
  } catch (error) {
    req.flash('error', '❌ Error al editar l’actuació.');
    res.redirect(`/actuacions/${req.params.id}/edit`);
  }
};

// Eliminar actuació
exports.eliminarActuacio = async (req, res) => {
  try {
    await Actuacio.destroy({ where: { id: req.params.id } });
    req.flash('success', '🗑️ Actuació eliminada correctament.');
    res.redirect('/actuacions');
  } catch (error) {
    req.flash('error', '❌ Error al eliminar l’actuació.');
    res.redirect('/actuacions');
  }
};
