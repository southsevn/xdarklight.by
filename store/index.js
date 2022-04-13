import Vue from "vue";
import Vuex from "vuex";
import cart from "./cart";
import company from "./company";

Vue.use(Vuex);

export default () => new Vuex.Store({
  state: () => ({
    dark: JSON.parse(window.localStorage.getItem("dl.localStorage"))?.dark || true,
    showMenu: false,
    isPageOnTop: true,
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
    products: [
      {
        promoImages: [
          '/products/target1.jpg',
          '/products/target2.jpg'
        ],
        images: [
          'https://cdn.shopify.com/s/files/1/1621/9773/products/DSC_0375_1000x.jpg?v=1598646610',
          'https://cdn.shopify.com/s/files/1/1621/9773/products/DSC_0375_1000x.jpg?v=1598646610',
          'https://cdn.shopify.com/s/files/1/1621/9773/products/DSC_0375_1000x.jpg?v=1598646610',
          'https://cdn.shopify.com/s/files/1/1621/9773/products/DSC_0375_1000x.jpg?v=1598646610'
        ],
        category: 'Аксессуары',
        name: 'Target',
        price: '120',
        isSoldOut: false,
        isSale: false,
        salePercent: 0
      },
      {
        promoImages: [
          '/products/long2.jpg',
          '/products/target1.jpg'
        ],
        images: [
          'https://cdn.shopify.com/s/files/1/1621/9773/products/DSC_0451_1000x.jpg?v=1633350480',
          'https://cdn.shopify.com/s/files/1/1621/9773/products/DSC_0451_1000x.jpg?v=1633350480',
          'https://cdn.shopify.com/s/files/1/1621/9773/products/DSC_0451_1000x.jpg?v=1633350480',
          'https://cdn.shopify.com/s/files/1/1621/9773/products/DSC_0451_1000x.jpg?v=1633350480'
        ],
        category: 'Аксессуары',
        name: 'Cors',
        price: '90',
        isSoldOut: false,
        isSale: true,
        salePercent: 20
      },
      {
        promoImages: [
          '/products/long1.jpg',
          '/products/long2.jpg'
        ],
        images: [
          'https://cdn.shopify.com/s/files/1/1621/9773/products/scum_crewneck_3_1000x.jpg?v=1632406393',
          'https://cdn.shopify.com/s/files/1/1621/9773/products/scum_crewneck_3_1000x.jpg?v=1632406393',
          'https://cdn.shopify.com/s/files/1/1621/9773/products/scum_crewneck_3_1000x.jpg?v=1632406393'
        ],
        category: 'Одежда',
        name: 'True Love',
        price: '90',
        isSoldOut: true,
        isSale: false,
        salePercent: 0
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
    ]
  }),
  getters: {
    dark: state => state.dark,
    showMenu: state => state.showMenu,
    isPageOnTop: state => state.isPageOnTop
  },
  mutations: {
    SET_THEME(state, value) {
      state.dark = value;
    },
    SET_MENU(state, value) {
      state.showMenu = value;
    },
    SET_PAGE_ON_TOP(state, value) {
      state.isPageOnTop = value;
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
    cart: cart,
    company: company
  }
});
