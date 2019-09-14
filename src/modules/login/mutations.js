export function setUsuario(state, payload) {
    state.login.user = payload.user;
    state.login.password = payload.password;
    state.login.level = payload.level;
    state.login.isLogged = payload.isLogged;
}
