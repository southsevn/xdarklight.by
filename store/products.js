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
  async getProducts({ commit, dispatch }) {
    dispatch("setLoading", true, { root: true });
    const products = await ProductService.getProducts();
    commit('SET_PRODUCTS', products.results.reverse());
    dispatch("setLoading", false, { root: true });
  },
  async getProductBySlug({ commit, dispatch }, slug) {
    dispatch("setLoading", true, { root: true });
    const product = await ProductService.getProduct(slug);
    commit('SET_PRODUCT', product);
    dispatch("setLoading", false, { root: true });
  }
};

export const getters = {
  product: state => state.product
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
