export function ordersPaged(state) {
  let page = state.pagination.page;
  let perPage = state.pagination.perPage;
  let from = page * perPage - perPage;
  let to = page * perPage;
  return state.orders.slice(from, to);
}
