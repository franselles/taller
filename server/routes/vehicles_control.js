'use strict';

const express = require('express');
const VehiclesModel = require('../models/vehicles_model');

const app = express();

app.get('/', (req, res) => {
  VehiclesModel.find().exec((err, doc) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición: ${err}`
      });
    if (!doc)
      return res.status(404).send({
        message: 'No existe'
      });

    res.status(200).send(doc);
  });
});

app.get('/:id', (req, res) => {
  let id = req.params.id;

  VehiclesModel.findById(id).exec((err, doc) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición: ${err}`
      });
    if (!doc)
      return res.status(404).send({
        message: 'No existe'
      });

    res.status(200).send(doc);
  });
});

app.post('/', (req, res) => {
  const data = new VehiclesModel();

  data.date = req.body.date;

  data.save((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored._id);
  });
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;

  VehiclesModel.findOneAndUpdate(
    { _id: id },
    { $set: update },
    { new: true, useFindAndModify: false }
  ).exec((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;

  VehiclesModel.findOneAndRemove(
    { _id: id },
    { new: true, useFindAndModify: false }
  ).exec((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
});

module.exports = app;
