export default {
    partes: [
    ],
    partesPaginados: [],
    vehiculos: [],
    parte: {
        mecanico: '',
        fecha: '',
        matricula: '',
        vehiculo: '',
        motivo: '',
        km: '',
        averia: '',
        reparacion: [],
        observaciones: '',
        fecha_f: '',
        reparado: '',
        cerrado: ''
    },
    reparacion: {
        linea: '',
        fecha: '',
        concepto: '',
        cdad_horas: '',
        importe: '',
    },
    nuevoParte: true,
    filtroPartes: 'SR',
    pagination: {
        page: 1,
        perPage: 10,
        totalPages: 1
    }
}
