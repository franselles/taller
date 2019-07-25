import Vue from 'vue';
import Vuex from 'vuex';

import login from '@/modules/login';
import partes from '@/modules/partes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    partes
  }
});
