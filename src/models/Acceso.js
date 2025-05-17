const mongoose = require('mongoose');

const accesoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  ip: {
    type: String,
    required: true
  },
  navegador: {
    type: String,
    required: false,
    default: 'Desconocido'
  },
  sistemaOperativo: {
    type: String,
    required: false,
    default: 'Desconocido'
  }
});

module.exports = mongoose.model('Acceso', accesoSchema);
