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

export function setPage(state, payload) {
    state.pagination.page = payload
}

export function setPerPage(state, payload) {
    state.pagination.perPage = payload
}

export function setPages(state) {
    state.pagination.page = 1
    let numberOfPages = Math.ceil(
        state.partes.length / state.pagination.perPage
    )
    state.pagination.totalPages = numberOfPages;
}
