// src/app.js
const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const path = require('path');

const Incidencia = require('./models/Incidencia');
const Departament = require('./models/Departament');
const Tecnic = require('./models/Tecnic');
const Actuacio = require('./models/Actuacio');
const Tipo = require('./models/Tipo');


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://a18hugcorcob:<Holapedralbes_01>@cluster0.yoo2cak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


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
      { id_departament: 2, id_tecnic: 2, descripcio: 'Error de xarxa', prioritat: 'Alta', estat: 'No resolt' },
      { id_departament: 3, id_tecnic: 3, descripcio: 'Error en la página web', prioritat: 'Mitjana', estat: 'No resolt' },
      { id_departament: 4, id_tecnic: 4, descripcio: 'Cablejat desordenat', prioritat: 'Baixa', estat: 'No resolt' },
      { id_departament: 5, id_tecnic: 5, descripcio: 'Pantalla en mal estat', prioritat: 'Mitjana', estat: 'No resolt' },


      ]);
      console.log('Incidencia inicials creats');
    }

    const existingActuacions = await Actuacio.findOne({ where: { id: 1 } });
    if (!existingActuacions) {
      await Actuacio.bulkCreate([
      { id_incidencia: 1, id_tecnic: 1, descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 1, id_tecnic: 1, descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 1, id_tecnic: 1, descripcio_actuacio: 'Verificació final' },
      { id_incidencia: 2, id_tecnic: 2, descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 2, id_tecnic: 2, descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 2, id_tecnic: 2, descripcio_actuacio: 'Verificació final' },
      { id_incidencia: 3, id_tecnic: 3, descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 3, id_tecnic: 3, descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 3, id_tecnic: 3, descripcio_actuacio: 'Verificació final' },
      { id_incidencia: 4, id_tecnic: 4, descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 4, id_tecnic: 4, descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 4, id_tecnic: 4, descripcio_actuacio: 'Verificació final' },
      { id_incidencia: 5, id_tecnic: 5, descripcio_actuacio: 'Revisió inicial' },
      { id_incidencia: 5, id_tecnic: 5, descripcio_actuacio: 'Resolució de l\'error' },
      { id_incidencia: 5, id_tecnic: 5, descripcio_actuacio: 'Verificació final' },
      
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