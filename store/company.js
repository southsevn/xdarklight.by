import { CompanyService } from "@/services";

export const state = () => ({
  carePageContent: null,
  deliveryPageContent: null,
  paymentPageContent: null,
  deliveryPrices: null
});

export const mutations = {
  SET_CARE_CONTENT(state, content) {
    state.carePageContent = content;
  },
  SET_DELIVERY_CONTENT(state, content) {
    state.deliveryPageContent = content;
  },
  SET_PAYMENT_CONTENT(state, content) {
    state.paymentPageContent = content;
  },
  SET_DELIVERY_PRICES(state, value) {
    state.deliveryPrices = value;
  }
};

export const actions = {
  async getDeliveryPrices({ commit }) {
    const prices = await CompanyService.getDeliveryPrices();
    commit("SET_DELIVERY_PRICES", prices);
  },
  async getCarePageContent({ commit }) {
    const content = await CompanyService.getCareContent();
    commit("SET_CARE_CONTENT", content);
  },
  async getDeliveryPageContent({ commit }) {
    const content = await CompanyService.getDeliveryContent();
    commit("SET_DELIVERY_CONTENT", content);
  },
  async getPaymentPageContent({ commit }) {
    const content = await CompanyService.getPaymentContent();
    commit("SET_PAYMENT_CONTENT", content);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
