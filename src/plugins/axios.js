import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const baseURL = 'http://localhost:8000/api/v1';
// const baseURL = '/api/v1';

axios.defaults.baseURL = baseURL;
axios.defaults.json = true;

Vue.use(VueAxios, axios);
