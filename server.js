/* eslint-disable no-console */
// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const serveStatic = require("serve-static");
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
var appRoutes = require('./server/routes/app');
var partesRoutes = require('./server/routes/partes');
var vehiculosRoutes = require('./server/routes/vehiculos');


// Rutas
app.use('/api/v1/partes', partesRoutes);
app.use('/api/v1/vehiculos', vehiculosRoutes);
app.use('/api/v1/', appRoutes);


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// db = 'mongodb://localhost/userserious';
// db = 'mongodb://f54n:Uzituxez1800@ds145295.mlab.com:45295/userserious';
db = 'mongodb://f54n:Uzituxez1800@ds145295.mlab.com:45295/userserious';

// Conexión a la base de datos
mongoose.connection.openUri(
    db,
    { useNewUrlParser: true },
    (err) => {
        if (err) throw err;
        console.log(`Base de datos  ${db} \x1b[36m%s\x1b[0m`, 'online');
    }
);
mongoose.set('useCreateIndex', true);

// Escuchar petciones
var server = app.listen(process.env.PORT || 80, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
