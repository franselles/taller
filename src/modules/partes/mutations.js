export function setParte(state, payload) {
    state.parte = payload;
}

export function setPartes(state, payload) {
    state.partes = []
    state.partes = payload;
}

export function setReparacion(state, payload) {
    state.reparacion = payload
}
export function setNuevoParte(state, payload) {
    state.nuevoParte = payload
}

export function setVehiculos(state, payload) {
    state.vehiculos = []
    state.vehiculos = payload;
}

export function setFiltroPartes(state, payload) {
    state.filtroPartes = payload;
}
