/* eslint-disable no-console */
var express = require('express')
var Partes = require('../models/partes')

var app = express()

// Obtener todos los partes
app.get('/', (req, res) => {
    Partes.find({})
        .exec((err, partes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error en base de partes',
                    errors: err
                });
            }

            Partes.countDocuments({}, (err, cuenta) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error en base de partes',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    partes,
                    cuenta
                });
            });
        })
})

// Actualiza parte
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Partes.findById(id, (err, parte) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar parte',
                errors: err
            });
        }

        if (!parte) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al buscar parte, no existe',
                errors: err
            });
        }

        parte.mecanico = body.mecanico,
            parte.fecha = body.fecha,
            parte.matricula = body.matricula,
            parte.vehiculo = body.vehiculo,
            parte.motivo = body.motivo,
            parte.km = body.km,
            parte.averia = body.averia,
            parte.reparacion = body.reparacion,
            parte.observaciones = body.observaciones,
            parte.fecha_f = body.fecha_f,
            parte.reparado = body.reparado,
            parte.cerrado = body.cerrado

        parte.save((err, parteGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al guardar parte',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                parteGuardado: parteGuardado
            });
        });
    });
});

// Crea parte
app.post('/', (req, res) => {
    var body = req.body;

    /*     const parte = new Partes({
            mecanico: body.mecanico,
            fecha: body.fecha,
            matricula: body.matricula,
            vehiculo: body.vehiculo,
            averia: body.averia,
            reparacion: body.reparacion,
            observaciones: body.observaciones,
            fecha_f: body.fecha_f,
            reparado: body.reparado,
            cerrado: body.cerrado
        }); */

    const parte = new Partes(body)

    parte.save((err, parteGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear parte',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            parteGuardado: parteGuardado
        });
    });
});

// Borrar parte
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Partes.findByIdAndRemove(id, (err, parteBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar parte',
                errors: err
            });
        }

        if (!parteBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al borrar parte, no existe parte',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            parteBorrado: parteBorrado
        });
    });
});

module.exports = app;