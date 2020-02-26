'use strict';

const express = require('express');
const WorkshopOrdersModel = require('../models/workshop_orders_model');

const app = express();

app.get('/order/:id', (req, res) => {
  let id = req.params.id;

  WorkshopOrdersModel.findById(id).exec((err, doc) => {
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

app.get('/orders/:state', (req, res) => {
  let state = req.params.state;

  WorkshopOrdersModel.find({ closed: state }).exec((err, doc) => {
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

app.post('/order', (req, res) => {
  const data = new WorkshopOrdersModel();

  data.date = req.body.date;
  data.fault = req.body.fault;
  data.vehicle_id = req.body.vehicle_id;
  data.vehicle = req.body.vehicle;
  data.license_plate = req.body.license_plate;
  data.price = req.body.price;
  data.hours = req.body.hours;
  data.materials = req.body.materials;
  data.closed = req.body.closed;
  data.finished = req.body.finished;
  data.images = req.body.images;

  data.save((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored._id);
  });
});

app.put('/order/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;

  WorkshopOrdersModel.findOneAndUpdate(
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

app.delete('/order/:id', (req, res) => {
  const id = req.params.id;

  WorkshopOrdersModel.findOneAndRemove(
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
