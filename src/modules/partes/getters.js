export function partesPaginados(state) {
    let page = state.pagination.page;
    let perPage = state.pagination.perPage;
    let from = page * perPage - perPage;
    let to = page * perPage;
    return state.partesPaginados = state.partes.slice(from, to);
}