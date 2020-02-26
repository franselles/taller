import Vue from 'vue';

export async function postImage(context, payload) {
  let formData = new FormData();
  formData.append('key', 'f3289a4706c9d456ecda5be82225c7f3');
  formData.append('image', payload.data);
  formData.append('name', payload.name);

  try {
    const result = await Vue.axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return result.data.data;
  } catch (e) {
    console.log(e.message);
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
  } finally {
    console.log('La petición para crear los datos ha finalizado');
  }
}

export async function deleteImage(context, payload) {
  try {
    const result = await Vue.axios({
      method: 'delete',
      url: payload,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    return result;
  } catch (e) {
    console.log(e.message);
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
  } finally {
    console.log('La petición para borrar los datos ha finalizado');
  }
}

export async function postOrder({ state }, payload) {
  try {
    const result = await Vue.axios({
      method: 'post',
      url: state.urlApi + 'workshop/order',
      data: payload
    });
    return result;
  } catch (e) {
    console.log(e.message);
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
  } finally {
    console.log('La petición para crear los datos ha finalizado');
  }
}

export async function putOrder({ state }, payload) {
  try {
    const result = await Vue.axios({
      method: 'put',
      url: state.urlApi + `workshop/order/${payload._id}`,
      data: payload
    });
    return result;
  } catch (e) {
    console.log(e.message);
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
  } finally {
    console.log('La petición para actualizar los datos ha finalizado');
  }
}

export async function deleteOrder({ state }, payload) {
  try {
    await Vue.axios({
      method: 'delete',
      url: state.urlApi + `workshop/order/${payload._id}`,
      data: payload
    });
    return true;
  } catch (e) {
    console.log(e.message);
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
  } finally {
    console.log('La petición para actualizar los datos ha finalizado');
  }
}

export async function getVehicles({ commit, state }) {
  try {
    const { data } = await Vue.axios({
      method: 'get',
      url: state.urlApi + 'workshop/vehicles'
    });
    commit('setVehicles', data);
  } catch (e) {
    console.log('todosError', e.message);
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
  } finally {
    console.log('La petición para obtener los datos ha finalizado');
  }
}

export async function getOrders({ commit, state }, payload) {
  try {
    const { data } = await Vue.axios({
      method: 'get',
      url: state.urlApi + `workshop/orders/${payload}`
    });
    commit('setOrders', data);
  } catch (e) {
    console.log('todosError', e.message);
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
  } finally {
    console.log('La petición para obtener los daros ha finalizado');
  }
}

export async function getOrder({ commit, state }, payload) {
  try {
    const { data } = await Vue.axios({
      method: 'get',
      url: state.urlApi + `workshop/order/${payload}`
    });
    commit('setOrder', data);
  } catch (e) {
    console.log('todosError', e.message);
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
  } finally {
    console.log('La petición para obtener los daros ha finalizado');
  }
}
