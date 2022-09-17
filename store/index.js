import Vue from "vue";
import Vuex from "vuex";
import company from "./company";
import { CompanyService, CategoryService } from "@/services";
import products from "./products";

Vue.use(Vuex);

export default () => new Vuex.Store({
  state: () => ({
    loading: false,
    showMenu: false,
    isPageOnTop: true,
    dark: !!JSON.parse(window.localStorage.getItem("dl_theme"))?.value,
    language: JSON.parse(window.localStorage.getItem("dl_language"))?.value || {
      value: 'ru',
      title: 'Русский'
    },
    currency: JSON.parse(window.localStorage.getItem("dl_currency"))?.value || {
      name: 'BYN',
      value: 'byn'
    },
    cartCount: JSON.parse(window.localStorage.getItem("dl_cart"))?.value?.length || 0,
    languages: [
      {
        value: 'en',
        title: 'English'
      },
      {
        value: 'ru',
        title: 'Русский'
      }
    ],
    currencies: [],
    menu: [
      {
        text: "components.menu.catalog",
        to: "/catalog",
        childCategories: [
          {
            categoryName: "components.filters.wear",
            itemList: ["components.filters.tshirts", "components.filters.shorts", "components.filters.longsleeves", "components.filters.pants"]
          },
          {
            categoryName: "components.filters.bags",
            itemList: ["components.filters.bags", "components.filters.bagpacks", "components.filters.modules", "components.filters.accessories"]
          }
        ]
      },
      {
        text: "components.menu.mission",
        to: "/mission"
      },
      {
        text: "components.menu.media",
        to: "/media"
      },
      {
        text: "components.menu.contacts",
        to: "/contacts"
      }
    ],
    textPages: [
      {
        text: "components.textPages.payment",
        to: "/page/payments"
      },
      {
        text: "components.textPages.delivery",
        to: "/page/delivery"
      },
      {
        text: "components.textPages.care",
        to: "/page/care"
      },
      {
        text: "components.textPages.return",
        to: "/page/return"
      },
      {
        text: "components.textPages.terms",
        to: "/page/terms"
      },
      {
        text: "components.textPages.privacy",
        to: "/page/privacy"
      },
      {
        text: "components.textPages.publicOffer",
        to: "/page/public-offer"
      }
    ],
    filters: [
      {
        parentCategory: "components.filters.wear",
        items: [
          {
            id: 1,
            text: "components.filters.tshirts"
          },
          {
            id: 2,
            text: "components.filters.shorts"
          },
          {
            id: 3,
            text: "components.filters.longsleeves"
          },
          {
            id: 4,
            text: "components.filters.pants"
          }
        ]
      },
      {
        parentCategory: "components.filters.bags",
        items: [
          {
            id: 5,
            text: "components.filters.bags"
          },
          {
            id: 6,
            text: "components.filters.bagpacks"
          },
          {
            id: 7,
            text: "components.filters.modules"
          },
          {
            id: 8,
            parentCategory: "components.filters.bags",
            text: "components.filters.accessories"
          }
        ]
      }
    ],
    categories: null,
    selectedCategory: null
  }),
  getters: {
    loading: state => state.loading,
    showMenu: state => state.showMenu,
    isPageOnTop: state => state.isPageOnTop
  },
  mutations: {
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_THEME(state, value) {
      state.dark = value;
    },
    SET_CART_COUNT(state, value) {
      state.cartCount = value;
    },
    SET_LANGUAGE(state, language) {
      state.language = language;
      this.$i18n.locale = language.value;
    },
    SET_CURRENCY(state, currency) {
      state.currency = currency;
    },
    SET_CURRENCIES(state, currencies) {
      state.currencies = currencies;
    },
    SET_MENU(state, value) {
      state.showMenu = value;
    },
    SET_PAGE_ON_TOP(state, value) {
      state.isPageOnTop = value;
    },
    SET_CATEGORIES(state, value) {
      state.categories = value;
    },
    SET_SELECTED_CATEGORY(state, value) {
      state.selectedCategory = value;
    }
  },
  actions: {
    changeTheme({ commit }, value) {
      commit("SET_THEME", value);
    },
    setLoading({ commit }, value) {
      commit("SET_LOADING", value);
    },
    async getCurrencies({ commit }) {
      const currencies = await CompanyService.getCurrencies();
      commit('SET_CURRENCIES', currencies);
      commit('SET_CURRENCY', currencies[0]);
    },
    async getCategories({ commit }) {
      const categories = await CategoryService.getCategories();
      const mappedCategories = categories.reduce((a, item) => {
        const groupIndex = a.findIndex(elem => elem?.id === item.parentCategory.id);

        if (groupIndex === -1) {
          a[a.length] = {
            ...item.parentCategory,
            children: [item]
          };
        } else {
          a[groupIndex].children.push(item);
        }

        return a;
      }, []);
      commit('SET_CATEGORIES', mappedCategories);
    }
  },
  modules: {
    company: company,
    products: products
  }
});
