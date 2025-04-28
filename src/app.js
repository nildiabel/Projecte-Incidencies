// src/app.js

const express = require('express');

require('dotenv').config();

const sequelize = require('./db');

const path = require('path');

const Incidencia = require('./models/Incidencia');
const Departament = require('./models/Departament');



// Relacions

Departament.hasMany(Incidencia, { foreignKey: 'id_departament', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Incidencia.belongsTo(Departament, { foreignKey: 'id_departament', onUpdate: 'CASCADE' });



const incidenciesRoutes = require('./routes/incidencies.routes');

const DepartamentRoutes = require('./routes/departament.routes');



const app = express();
app.use(express.urlencoded({ extended: true })); // per formularis
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Rutes EJS
const incidenciesRoutesEJS = require('./routes/incidenciesEJS.routes');
const DepartamentRoutesEJS = require('./routes/departamentEJS.routes');

// Rutes EJS
app.use('/incidencies', incidenciesRoutesEJS);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/api/incidencies', incidenciesRoutes);

app.use('/departament', DepartamentRoutesEJS);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/api/departament', DepartamentRoutes);



app.use('/departament', DepartamentRoutesEJS);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/api/departament', incidenciesRoutes);

app.use('/departament', DepartamentRoutesEJS);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/api/departament', DepartamentRoutes);


// Ruta de prova

app.get('/', (req, res) => {

  res.render('index');

});



const port = process.env.PORT || 3000;



(async () => {
  try {
    await sequelize.sync();
    console.log('Base de dades sincronitzada (API JSON)');

    // Check if any departments exist before creating
    const existingDepartments = await Departament.findOne();
    if (!existingDepartments) {
      // Only create departments if none exist
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
        { nom_dpt: 'Biblioteca Escolar' }
      ]);
      console.log('Departaments inicials creats');
    }

    app.listen(port, () => {
      console.log(`Servidor escoltant a http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error a l'inici:", error);
  }
})();
