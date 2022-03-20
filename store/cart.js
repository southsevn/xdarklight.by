export const state = () => ({
  cart: null,
});

export const getters = {
  cartCount(state) {
    return state.cart && state.cart.length ? state.cart.length : 0;
  }
};

export const mutations = {
  SET_CART(state, items) {
    state.cart = items;
  }
};

export const actions = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
