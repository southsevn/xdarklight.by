import Vue from "vue";
import Vuex from "vuex";
import cart from "./cart";

Vue.use(Vuex);

export default () => new Vuex.Store({
  state: () => ({
    dark: JSON.parse(window.localStorage.getItem("dl.localStorage"))?.dark || true,
  }),
  getters: {
    dark: state => state.dark,
  },
  mutations: {
    SET_THEME(state, value) {
      state.dark = value;
    }
  },
  actions: {
    changeTheme({ commit }, value) {
      window.localStorage.setItem("dl.localStorage", JSON.stringify({
        dark: value
      }));
  
      commit("SET_THEME", value);
    }
  },
  modules: {
    cart: cart
  }
});
