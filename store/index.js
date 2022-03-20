import Vue from "vue";
import Vuex from "vuex";
import cart from "./cart";

Vue.use(Vuex);

export default () => new Vuex.Store({
  state: () => ({
    dark: JSON.parse(window.localStorage.getItem("dl.localStorage"))?.dark || true,
    showMenu: false,
    products: [
      {
        catalogImage: 'https://wartechgear.com/image/catalog/products/razgruzochnie-sistemi/tv-113/img_0020-2.png',
        image: 'https://cdn.shopify.com/s/files/1/1621/9773/products/DSC_0375_1000x.jpg?v=1598646610',
        category: 'Аксессуары',
        name: 'Target',
        price: '120'
      },
      {
        catalogImage: 'https://wartechgear.com/image/catalog/products/razgruzochnie-sistemi/tv-113/img_0020-2.png',
        image: 'https://cdn.shopify.com/s/files/1/1621/9773/products/DSC_0451_1000x.jpg?v=1633350480',
        category: 'Аксессуары',
        name: 'Cors',
        price: '90'
      },
      {
        catalogImage: 'https://wartechgear.com/image/catalog/products/razgruzochnie-sistemi/tv-113/img_0020-2.png',
        image: 'https://cdn.shopify.com/s/files/1/1621/9773/products/scum_crewneck_3_1000x.jpg?v=1632406393',
        category: 'Одежда',
        name: 'True Love',
        price: '90'
      }
    ]
  }),
  getters: {
    dark: state => state.dark,
    showMenu: state => state.showMenu
  },
  mutations: {
    SET_THEME(state, value) {
      state.dark = value;
    },
    SET_MENU(state, value) {
      state.showMenu = value;
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
