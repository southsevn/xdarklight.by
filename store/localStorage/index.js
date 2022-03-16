export const state = () => ({
  dark: JSON.parse(window.localStorage.getItem("dl.localStorage"))?.dark || false,
  activeLanguage: {
    value: 'ru',
    title: 'Русский',
    active: true
  },
  languages: [
    {
      value: 'en',
      title: 'English',
      active: false
    },
    {
      value: 'ru',
      title: 'Русский',
      active: true
    }
  ],
  activeCurrency: {
    name: 'BYN',
    value: 'byn',
    active: true
  },
  currencies: []
});

export const getters = {
  dark: state => state.dark,
  LANGUAGES: state => state.languages,
  ACTIVE_LANGUAGE: state => state.activeLanguage,
  CURRENCIES: state => state.currencies,
  ACTIVE_CURRENCY: state => state.activeCurrency
};

export const mutations = {
  SET_THEME(state, value) {
    state.dark = value;
  },
  SET_ACTIVE_LANG: (state, payload) => {
    state.activeLanguage = payload;
  },
  SET_ACTIVE_CUR: (state, payload) => {
    state.activeCurrency = payload;
  },
  TOGGLE_ACTIVE_LANG(state, payload) {
    state.languages = state.languages.map(lang => {
      return lang.name === payload.name ?
        {
          ...lang,
          active: false
        }
        :
        {
          ...lang,
          active: true
        };
    });

    state.activeLanguage = payload;

    this.$i18n.locale = payload.value;
  },
  TOGGLE_ACTIVE_CUR(state, payload) {
    state.currencies = state.currencies.map(cur => {
      return cur.value === payload.value ?
        {
          ...cur,
          active: false
        }
        :
        {
          ...cur,
          active: true
        };
    });

    state.activeCurrency = payload;
  },
  SET_CURRENCIES(state, payload) {
    state.currencies = payload;
  },
  SET_CURRENCY(state, payload) {
    state.currency = payload;
  }
};

export const actions = {
  changeTheme({ commit }, value) {
    window.localStorage.setItem("dl.localStorage", JSON.stringify({
      dark: value
    }));

    commit("SET_THEME", value);
  },
  setActiveLang({ state, commit }, val) {
    let language = state.languages.find(lang => lang.value === val);

    if (language) {
      commit('SET_ACTIVE_LANG', language);
    }
  },
  setActiveCurrency({ state, commit }, val) {
    let currency = state.currencies.find(cur => cur.value === val);

    if (currency) {
      commit('SET_ACTIVE_CUR', currency);
    }
  },
  toggleActiveLang({ commit }, lang) {
    commit('TOGGLE_ACTIVE_LANG', lang);
  },
  toggleActiveCurrency({ commit }, lang) {
    commit('TOGGLE_ACTIVE_CUR', lang);
  },
  async getCurrencies({ commit }) {
    await this.$axios.$get('https://apiworkshop.darklight.by/v1/currencies')
      .then(data => {
        let currencies = data.map((cur, idx) => {
          return !idx ? {
            ...cur,
            active: true
          }
          :
          {
            ...cur,
            active: false
          };
        });

        commit('SET_CURRENCIES', currencies);
        commit('SET_CURRENCY', currencies[0]);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
