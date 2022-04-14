import { ProductService } from "@/services";

export const state = () => ({
  products: null,
  product: null
});

export const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  SET_PRODUCT(state, payload) {
    state.product = payload;
  }
};

export const actions = {
  async getProducts({ commit }) {
    const products = await ProductService.getProducts();
    commit('SET_PRODUCTS', products.results.reverse());
  },
  async getProductBySlug({ commit }, slug) {
    const product = ProductService.getProduct(slug);
    commit('SET_PRODUCT', product);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
