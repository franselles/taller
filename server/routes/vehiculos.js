/* eslint-disable no-console */
var express = require('express');
var Vehiculos = require('../models/vehiculos');

var app = express();

// Obtener todos los vehiculos
app.get('/', (req, res) => {
  Vehiculos.find({}).exec((err, vehiculos) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error en base de vehiculos',
        errors: err,
      });
    }

    Vehiculos.countDocuments({}, (err, cuenta) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error en base de vehiculos',
          errors: err,
        });
      }

      res.status(200).json({
        ok: true,
        vehiculos,
        cuenta,
      });
    });
  });
});

module.exports = app;
