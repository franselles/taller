var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tallerPartesSchema = new Schema(
    {
        mecanico: { type: String },
        fecha: { type: String },
        matricula: { type: String },
        vehiculo: { type: String },
        motivo: { type: String },
        km: { type: Number },
        averia: { type: String },
        reparacion: [{
            linea: { type: String },
            fecha: { type: String },
            concepto: { type: String },
            cdad_horas: { type: Number },
            importe: { type: Number }
        }],
        observaciones: { type: String },
        fecha_f: { type: String },
        reparado: { type: Boolean },
        cerrado: { type: Boolean }
    },
    { collection: 'taller_partes' }
);

module.exports = mongoose.model('TallerPartes', tallerPartesSchema);
