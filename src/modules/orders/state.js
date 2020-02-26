export default {
  urlImgBb: 'https://api.imgbb.com/1/upload',
  urlApi: '/api/v1/', // http://localhost:8000/api/v1/    // /api/v1/
  order: {
    _id: null,
    date: null,
    fault: null,
    vehicle_id: null,
    vehicle: null,
    license_plate: null,
    price: 30,
    hours: null,
    materials: Number,
    closed: false,
    finished: false,
    images: []
  },
  currentImage: null,
  orders: [],
  vehicles: [],
  filtroOrders: 'SR',
  pagination: {
    page: 1,
    perPage: 10,
    totalPages: 1
  },
  paginaActual: 1
};