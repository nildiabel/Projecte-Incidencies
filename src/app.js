// src/app.js

const express = require('express');

require('dotenv').config();

const sequelize = require('./db');

const path = require('path');

const Motorcycle = require('./models/Incidencia');



// Relacions



const incidenciesRoutes = require('./routes/incidencies.routes');

const DepartamentRoutes = require('./routes/Departament.routes');



const app = express();
app.use(express.urlencoded({ extended: true })); // per formularis
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Rutes JSON

// Rutes EJS
const incidenciesRoutesEJS = require('./routes/incidenciesEJS.routes');
const Incidencia = require('./models/Incidencia');

const DepartamentRoutesEJS = require('./routes/DepartamentEJS.routes');
const Departament = require('./models/Departament');

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



    // Engeguem servidor

    app.listen(port, () => {

      console.log(`Servidor escoltant a http://localhost:${port}`);

    });

  } catch (error) {

    console.error("Error a l'inici:", error);

  }

})();
