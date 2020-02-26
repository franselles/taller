// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');

// Inicializacion variables
const app = express();

app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(cors());

app.use(express.static('public'));

// Body parser
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Router
const appRoutes = require('./server/routes/app');
const partesRoutes = require('./server/routes/partes');
const vehiculosRoutes = require('./server/routes/vehiculos');
const workshopRoutes = require('./server/routes/workshop_orders_control');
const vehiclesRoutes = require('./server/routes/vehicles_control');

// Rutas
app.use('/api/v1/partes', partesRoutes);
app.use('/api/v1/vehiculos', vehiculosRoutes);
app.use('/api/v1/workshop', workshopRoutes);
app.use('/api/v1/workshop/vehicles', vehiclesRoutes);
app.use('/api/v1/', appRoutes);

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// db = 'mongodb://localhost/userserious';
db = 'mongodb://f54n:Uzituxez1800@ds145295.mlab.com:45295/userserious';

// Conexión a la base de datos
mongoose.connection.openUri(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) throw err;
    console.log(`Base de datos  ${db} \x1b[36m%s\x1b[0m`, 'online');
  }
);
mongoose.set('useCreateIndex', true);

// Escuchar petciones
const server = app.listen(process.env.PORT || 8000, function() {
  const port = server.address().port;
  console.log('App now running on port', port);
});
