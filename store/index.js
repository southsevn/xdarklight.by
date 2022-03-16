import Vue from 'vue';
import Vuex from 'vuex';
import localStorage from './localStorage';

Vue.use(Vuex);

new Vuex.Store({
  modules: {
    localStorage: localStorage
  }
});
