// src/app.js
const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./db');
const path = require('path');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  // Excluir todas las rutas estáticas y solicitudes no-GET
  if (req.method !== 'GET' || req.path.match(/\.(css|js|jpg|png|ico|svg|webp|woff2?)$/i)) {
    return next();
  }
  next();
});

// app.js
const { connectMongo } = require('./mongo');

// Conexión a MongoDB
connectMongo();



const Incidencia = require('./models/Incidencia');
const Departament = require('./models/Departament');
const Tecnic = require('./models/Tecnic');
const Actuacio = require('./models/Actuacio');
const Tipu = require('./models/Tipu');
const logsRoutes = require('./routes/logsEJS.routes');
app.use('/logs', logsRoutes);
const adminRoutes = require('./routes/adminEJS.routes');
app.use('/', adminRoutes);



// Relacions
Departament.hasMany(Incidencia, { foreignKey: 'id_departament', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Incidencia.belongsTo(Departament, { foreignKey: 'id_departament', onUpdate: 'CASCADE' });

Tecnic.hasMany(Incidencia, { foreignKey: 'id_tecnic', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Incidencia.belongsTo(Tecnic, { foreignKey: 'id_tecnic', onUpdate: 'CASCADE' });

Incidencia.hasMany(Actuacio, {foreignKey: 'id_incidencia',onDelete: 'CASCADE',onUpdate: 'CASCADE',constraints: true});

Actuacio.belongsTo(Incidencia, {foreignKey: 'id_incidencia',onUpdate: 'CASCADE',constraints: true});

Tecnic.hasMany(Actuacio, { foreignKey: 'id_tecnic', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Actuacio.belongsTo(Tecnic, { foreignKey: 'id_tecnic', onUpdate: 'CASCADE' });

Tipu.hasMany(Incidencia, { foreignKey: 'id_tipus', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Incidencia.belongsTo(Tipu, { foreignKey: 'id_tipus', onUpdate: 'CASCADE' });

// Rutes
const incidenciesRoutesEJS = require('./routes/incidenciesEJS.routes');
const actuacionsRoutesEJS = require('./routes/actuacionsEJS.routes');
const tecnicsRoutesEJS = require('./routes/tecnicsEJS.routes');
const adminRoutesEJS = require('./routes/adminEJS.routes')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));


// Configuració EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutes EJS
app.use('/incidencies', incidenciesRoutesEJS);
app.use('/actuacions', actuacionsRoutesEJS);
app.use('/tecnics', tecnicsRoutesEJS);
app.use('/admin', adminRoutesEJS);

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

    const existingTipu = await Tipu.findOne();
    if (!existingTipu) {
      await Tipu.bulkCreate([
      { nom_tipus: 'Hardware' },
      { nom_tipus: 'Software' },
      { nom_tipus: 'Xarxa' },
      { nom_tipus: 'Impressió' },
      { nom_tipus: 'Seguretat' },
      { nom_tipus: 'Configuració' },
      { nom_tipus: 'Actualització' },
      { nom_tipus: 'Manteniment' },
      { nom_tipus: 'Suport tècnic' },
      { nom_tipus: 'Altres' },
      ]);
      console.log('Tipus de incidencies inicials creats');
    }

    const existingIncidencies = await Incidencia.findOne();
    if (!existingIncidencies) {
      await Incidencia.bulkCreate([
      { id_departament: 1, id_tecnic: 1, id_tipus: 1, descripcio: 'Error en la impressora', prioritat: 'Alta', estat: 'No resolt' },
      { id_departament: 2, id_tecnic: 2, id_tipus: 2, descripcio: 'Error de xarxa', prioritat: 'Alta', estat: 'No resolt' },
      { id_departament: 3, id_tecnic: 3, id_tipus: 3, descripcio: 'Error en la página web', prioritat: 'Mitjana', estat: 'No resolt' },
      { id_departament: 4, id_tecnic: 4, id_tipus: 4, descripcio: 'Cablejat desordenat', prioritat: 'Baixa', estat: 'No resolt' },
      { id_departament: 5, id_tecnic: 5, id_tipus: 5, descripcio: 'Pantalla en mal estat', prioritat: 'Mitjana', estat: 'No resolt' },



      ]);
      console.log('Incidencia inicials creats');
    }

    const existingActuacions = await Actuacio.findOne({ where: { id: 1 } });
    if (!existingActuacions) {
      await Actuacio.bulkCreate([
      { id_incidencia: 1, id_tecnic: 1, temps: '30', descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 1, id_tecnic: 1, temps: '40', descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 1, id_tecnic: 1, temps: '60', descripcio_actuacio: 'Verificació final' },
      { id_incidencia: 2, id_tecnic: 2, temps: '50', descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 2, id_tecnic: 2, temps: '20', descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 2, id_tecnic: 2, temps: '30', descripcio_actuacio: 'Verificació final' },
      { id_incidencia: 3, id_tecnic: 3, temps: '40', descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 3, id_tecnic: 3, temps: '30', descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 3, id_tecnic: 3, temps: '10', descripcio_actuacio: 'Verificació final' },
      { id_incidencia: 4, id_tecnic: 4, temps: '40', descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 4, id_tecnic: 4, temps: '50', descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 4, id_tecnic: 4, temps: '10', descripcio_actuacio: 'Verificació final' },
      { id_incidencia: 5, id_tecnic: 5, temps: '10', descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 5, id_tecnic: 5, temps: '20', descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 5, id_tecnic: 5, temps: '20', descripcio_actuacio: 'Verificació final' },
      
      ]);
      console.log('Actuacions inicials creades');
    }

    app.listen(port, () => {
      console.log(`Servidor escoltant a http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error a l'inici:", error);
  }})
  
();