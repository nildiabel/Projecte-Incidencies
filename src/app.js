// src/app.js

const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const path = require('path');

const Incidencia = require('./models/Incidencia');
const Departament = require('./models/Departament');
const Tecnic = require('./models/Tecnic');
const Actuacio = require('./models/Actuacio');

// Relacions
Departament.hasMany(Incidencia, { foreignKey: 'id_departament', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Incidencia.belongsTo(Departament, { foreignKey: 'id_departament', onUpdate: 'CASCADE' });

Tecnic.hasMany(Incidencia, { foreignKey: 'id_tecnic', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Incidencia.belongsTo(Tecnic, { foreignKey: 'id_tecnic', onUpdate: 'CASCADE' });

Incidencia.hasMany(Actuacio, { foreignKey: 'id_incidencia', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Actuacio.belongsTo(Incidencia, { foreignKey: 'id_incidencia', onUpdate: 'CASCADE' });

Tecnic.hasMany(Actuacio, { foreignKey: 'id_tecnic', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Actuacio.belongsTo(Tecnic, { foreignKey: 'id_tecnic', onUpdate: 'CASCADE' });


// Rutes
const incidenciesRoutesEJS = require('./routes/incidenciesEJS.routes');
const departamentsRoutesEJS = require('./routes/departamentsEJS.routes');
const actuacionsRoutesEJS = require('./routes/actuacionsEJS.routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Configuració EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutes EJS
app.use('/incidencies', incidenciesRoutesEJS);
app.use('/departaments', departamentsRoutesEJS);
app.use('/actuacions', actuacionsRoutesEJS);

// Ruta inicial
app.get('/', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync();
    console.log('Base de dades sincronitzada (API JSON)');

    const existingDepartments = await Departament.findOne();
    if (!existingDepartments) {
      await Departament.bulkCreate([
      { nom_dpt: 'Matemàtiques' },
      { nom_dpt: 'Llengua Castellana' },
      { nom_dpt: 'Llengua Catalana' },
      { nom_dpt: 'Ciències Socials' },
      { nom_dpt: 'Ciències Naturals' },
      { nom_dpt: 'Educació Física' },
      { nom_dpt: 'Anglès' },
      { nom_dpt: 'Llengües Estrangeres' },
      { nom_dpt: 'Filosofia' },
      { nom_dpt: 'Tecnologia' },
      { nom_dpt: 'Informàtica' },
      { nom_dpt: 'Educació Plàstica i Visual' },
      { nom_dpt: 'Música' },
      { nom_dpt: 'Secretaria' },
      { nom_dpt: 'Administració' },
      { nom_dpt: 'Recursos Humans' },
      { nom_dpt: 'Direcció' },
      { nom_dpt: 'Coordinació de Cicles Formatius' },
      { nom_dpt: 'Biblioteca Escolar' },
      ]);
      console.log('Departaments inicials creats');
    }



    const existingTechnicians = await Tecnic.findOne();
    if (!existingTechnicians) {
      await Tecnic.bulkCreate([
      { nom: 'Joan Pérez' },
      { nom: 'Maria López' },
      { nom: 'Carles Garcia' },
      { nom: 'Anna Martínez' },
      { nom: 'Pere Font' },
      { nom: 'Laura Vidal' },
      { nom: 'Marc Soler' },
      { nom: 'Clara Roca' },
      { nom: 'Jordi Serra' },
      { nom: 'Marta Bosch' },
      ]);
      console.log('Tècnics inicials creats');
    }

    const existingIncidencies = await Incidencia.findOne();
    if (!existingIncidencies) {
      await Incidencia.bulkCreate([
      { id_departament: 1, id_tecnic: 1, descripcio: 'Error en la impressora', prioritat: 'Alta', estat: 'No resolt' },
      ]);
      console.log('Incidencia inicials creats');
    }

    const existingActuacions = await Actuacio.findOne({ where: { id: 1 } });
    if (!existingActuacions) {
      await Actuacio.bulkCreate([
      { id_incidencia: 1, id_tecnic: 1, descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 1, id_tecnic: 2, descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 1, id_tecnic: 3, descripcio_actuacio: 'Verificació final' },
      ]);
      console.log('Actuacions inicials creades');
    }

    app.listen(port, () => {
      console.log(`Servidor escoltant a http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error a l'inici:", error);
  }
})();