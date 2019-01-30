/* eslint-disable no-console */
import Vue from 'vue'


export async function getVehiculos({ commit }) {
    try {
        const { data } = await Vue.axios({
            method: 'get',
            url: '/vehiculos',
        })
        commit('setVehiculos', data.vehiculos)
    } catch (e) {
        console.log('todosError', e.message)
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
    } finally {
        console.log('La petición para obtener los vehiculos ha finalizado')
    }
}

export async function getPartes({ commit }) {
    try {
        const { data } = await Vue.axios({
            method: 'get',
            url: '/partes',
        })
        commit('setPartes', data.partes)
    } catch (e) {
        console.log('todosError', e.message)
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
    } finally {
        console.log('La petición para obtener los partes ha finalizado')
    }
}

export async function getPartesFiltro({ commit }, payload) {
    try {
        const { data } = await Vue.axios({
            method: 'get',
            url: `/partes/${payload}/true/estado`,
        })
        commit('setPartes', data.partes)
    } catch (e) {
        console.log('todosError', e.message)
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
    } finally {
        console.log('La petición para obtener los partes ha finalizado')
    }
}

export async function addParte({ dispatch }, payload) {
    try {
        await Vue.axios({
            method: 'post',
            url: '/partes',
            data: {
                mecanico: payload.mecanico,
                fecha: payload.fecha,
                matricula: payload.matricula,
                vehiculo: payload.vehiculo,
                motivo: payload.motivo,
                km: payload.km,
                averia: payload.averia,
                reparacion: payload.reparacion,
                observaciones: payload.observaciones,
                fecha_f: payload.fecha_f,
                reparado: payload.reparado,
                cerrado: payload.cerrado,
            },
        })
        dispatch('getPartes')
    } catch (e) {
        console.log(e.message)
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
    } finally {
        console.log('La petición para crear un parte ha finalizado')
    }
}

export async function updateParte({ dispatch }, payload) {
    try {
        await Vue.axios({
            method: 'PUT',
            url: `/partes/${payload._id}`,
            data: {
                mecanico: payload.mecanico,
                fecha: payload.fecha,
                matricula: payload.matricula,
                vehiculo: payload.vehiculo,
                motivo: payload.motivo,
                km: payload.km,
                averia: payload.averia,
                reparacion: payload.reparacion,
                observaciones: payload.observaciones,
                fecha_f: payload.fecha_f,
                reparado: payload.reparado,
                cerrado: payload.cerrado,
            }
        })
        dispatch('getPartes')
    } catch (e) {
        console.log(e.message)
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
    } finally {
        console.log('La petición para actualizar un parte ha finalizado')
    }
}

export async function removeParte({ dispatch }, payload) {
    try {
        await Vue.axios({
            method: 'delete',
            url: `/partes/${payload._id}`,
        })
        dispatch('getPartes')
    } catch (e) {
        console.log(e.message)
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
    } finally {
        console.log('La petición para actualizar el estado de parte ha finalizado')
    }
}