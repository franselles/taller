export function resetOrder(state) {
  state.order._id = null;
  state.order.date = new Date().toISOString().split('T')[0];
  state.order.fault = null;
  state.order.vehicle_id = null;
  state.order.vehicle = null;
  state.order.license_plate = null;
  state.order.price = 30;
  state.order.hours = null;
  state.order.materials = null;
  state.order.closed = false;
  state.order.finished = false;
  state.order.images = [];
}

export function setVehicles(state, payload) {
  state.vehicles = payload;
}

export function setOrder(state, payload) {
  state.order._id = payload._id;
  state.order.date = payload.date;
  state.order.fault = payload.fault;
  state.order.vehicle_id = payload.vehicle_id;
  state.order.vehicle = payload.vehicle;
  state.order.license_plate = payload.license_plate;
  state.order.price = payload.price;
  state.order.hours = payload.hours;
  state.order.materials = payload.materials;
  state.order.closed = payload.closed;
  state.order.finished = payload.finished;
  state.order.images = payload.images;
}

export function setOrders(state, payload) {
  state.orders = payload;
}

export function setImagesOrder(state, payload) {
  state.order.images.push(payload);
}

export function setCurrentImage(state, payload) {
  state.currentImage = payload;
}

export function setPage(state, payload) {
  state.pagination.page = payload;
  state.paginaActual = payload;
}

export function setPerPage(state, payload) {
  state.pagination.perPage = payload;
}

export function setPages(state) {
  state.pagination.page = 1;
  let numberOfPages = Math.ceil(state.orders.length / state.pagination.perPage);
  state.pagination.totalPages = numberOfPages;
}

export function setFiltro(state, payload) {
  state.filtroOrders = payload;
}
