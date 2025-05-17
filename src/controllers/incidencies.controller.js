const Incidencia = require('../models/Incidencia'); // Modelo correcto

// Listar incidencias
exports.listarIncidencies = async (req, res) => {
  const incidencies = await Incidencia.findAll({
    include: [Tipu, Departament, Tecnic]
    // sin orden si no quieres ordenar
  });
  res.render('incidencies/list', {
    incidencies,
    messages: req.flash()
  });};


// Mostrar formulario para crear nueva incidencia
exports.formCrearIncidencia = (req, res) => {
  res.render('incidencies/new', { messages: req.flash() });
};

// Crear incidencia
exports.crearIncidencia = async (req, res) => {
  try {
    await Incidencia.create(req.body);
    req.flash('success', '✅ Incidència creada correctament.');
    res.redirect('/incidencies');
  } catch (error) {
    req.flash('error', '❌ Error al crear la incidència.');
    res.redirect('/incidencies/new');
  }
};

// Mostrar formulario para editar incidencia
exports.formEditarIncidencia = async (req, res) => {
  try {
    const incidencia = await Incidencia.findById(req.params.id);
    res.render('incidencies/edit', { incidencia, messages: req.flash() });
  } catch (error) {
    req.flash('error', 'No s’ha pogut carregar la incidència.');
    res.redirect('/incidencies');
  }
};

// Editar incidencia
exports.editarIncidencia = async (req, res) => {
  try {
    await Incidencia.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', '✏️ Incidència editada correctament.');
    res.redirect('/incidencies');
  } catch (error) {
    req.flash('error', '❌ Error al editar la incidència.');
    res.redirect(`/incidencies/${req.params.id}/edit`);
  }
};

// Eliminar incidencia
exports.eliminarIncidencia = async (req, res) => {
  try {
    await Incidencia.findByIdAndDelete(req.params.id);
    req.flash('success', '🗑️ Incidència eliminada correctament.');
    res.redirect('/incidencies');
  } catch (error) {
    req.flash('error', '❌ Error al eliminar la incidència.');
    res.redirect('/incidencies');
  }
};

