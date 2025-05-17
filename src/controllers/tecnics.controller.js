const Tecnic = require('../models/Tecnic'); // Modelo correcto


// Crear tècnic
exports.crearTecnic = async (req, res) => {
    try {
      await Tecnic.create(req.body);
      req.flash('success', '✅ Tècnic creat correctament.');
      res.redirect('/tecnics');
    } catch (error) {
      req.flash('error', '❌ Error al crear el tècnic.');
      res.redirect('/tecnics/new');
    }
  };
  
  // Editar tècnic
  exports.editarTecnic = async (req, res) => {
    try {
      await Tecnic.update(req.body, { where: { id: req.params.id } });
      req.flash('success', '✏️ Tècnic editat correctament.');
      res.redirect('/tecnics');
    } catch (error) {
      req.flash('error', '❌ Error al editar el tècnic.');
      res.redirect(`/tecnics/${req.params.id}/edit`);
    }
  };
  
  // Eliminar tècnic
  exports.eliminarTecnic = async (req, res) => {
    try {
      await Tecnic.destroy({ where: { id: req.params.id } });
      req.flash('success', '🗑️ Tècnic eliminat correctament.');
      res.redirect('/tecnics');
    } catch (error) {
      req.flash('error', '❌ Error al eliminar el tècnic.');
      res.redirect('/tecnics');
    }
  };
  