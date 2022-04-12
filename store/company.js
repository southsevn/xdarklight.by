import CompanyInfo from "~/services/CompanyInfo.service.js";

export const state = () => ({
  careDescription: null,
  deliveryDescription: null,
  paymentDescription: null
});

export const mutations = {
  SET_CARE_DESCRIPTION(state, description) {
    state.careDescription = description;
  },
  SET_DELIVERY_DESCRIPTION(state, description) {
    state.deliveryDescription = description;
  },
  SET_PAYMENT_DESCRIPTION(state, description) {
    state.paymentDescription = description;
  }
};

export const actions = {
  async getCareDescription({ commit }) {
    const description = await CompanyInfo.getCareDescription();
    commit("SET_CARE_DESCRIPTION", description);
  },
  async getDeliveryDescription({ commit }) {
    const description = await CompanyInfo.getDeliveryDescription();
    commit("SET_DELIVERY_DESCRIPTION", description);
  },
  async getPaymentDescription({ commit }) {
    const description = await CompanyInfo.getPaymentDescription();
    commit("SET_PAYMENT_DESCRIPTION", description);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
