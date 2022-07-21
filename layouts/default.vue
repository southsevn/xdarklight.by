<template>
  <div
    :class="['d-app', `${dark ? 'dark' : 'light'}`]"
    :style="{background: `${dark ? '#0F0F0F' : '#fff'}`}"
  >
    <template v-if="!loading">
      <Header :animateLogo="animateLogo" />
      <transition name="show-menu">
        <Menu v-if="showMenu" />
      </transition>
      <main class="main">
        <Promo v-if="isIndexPage"/>
        <div class="page">
          <DPageTitle v-if="!isProductPage" :title="pageTitle"/>
          <div class="page-container">
            <div class="categories-container">
              <Categories v-if="!isTextPages"/>
            </div>
            <nuxt/>
          </div>
        </div>
      </main>
      <TextPages/>
      <LegalInfo/>
    </template>
    <div v-else class="loading">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { theme } from "@/mixins";

export default {
  mixins: [theme],
  computed: {
    ...mapGetters(["loading", "showMenu", "isPageOnTop"]),
    ...mapState(["languages", "currencies", "language"]),
    isIndexPage() {
      return this.$route.path === '/';
    },
    isTextPages() {
      return this.$route.path.includes('page');
    },
    isProductPage() {
      return this.$route.path.includes('product');
    },
    pageTitle() {
      let pageName = this.$route.path.replace('/page', '').replace('/', '');
      pageName = pageName === "" ? "catalog" : pageName;

      return this.$t(`${pageName}.title`)
    }
  },
  data() {
    return {
      animateLogo: false
    };
  },
  methods: {
    ...mapActions(["getCurrencies"]),
    handleScroll() {
      if (window.scrollY > 150) {
        this.$store.commit("SET_PAGE_ON_TOP", false);
      } else {
        this.$store.commit("SET_PAGE_ON_TOP", true);
      }
    },
  },
  async created() {
    await this.getCurrencies();

    const language = this.$storage.get("language");

    if (language) {
      this.$i18n.locale = language.value;
    }

    const currency = this.$storage.get("currency");

    if (currency) {
      this.$store.commit("SET_CURRENCY", currency);
    }

    if (this.$route.query.lang) {
      const findedLang = this.languages.find(
        (lang) => lang.value === this.$route.query.lang
      );

      if (findedLang) {
        this.$storage.set("language", findedLang);
        this.$store.commit("SET_LANGUAGE", findedLang);
        this.$i18n.locale = findedLang.value;
      }
    }

    if (this.$route.query.cur) {
      const findedCur = this.currencies?.find(
        (cur) => cur.value === this.$route.query.cur
      );

      if (findedCur) {
        this.$storage.set("currency", findedCur);
        this.$store.commit("SET_CURRENCY", findedCur);
      }
    }
  },
  beforeMount() {
    if (process.client) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  watch: {
    currencies() {
      if (this.$route.query.cur) {
        const findedCur = this.currencies?.find(
          (cur) => cur.value === this.$route.query.cur
        );

        if (findedCur) {
          this.$storage.set("currency", findedCur);
          this.$store.commit("SET_CURRENCY", findedCur);
        }
      }
    },
    "$route.query": {
      handler() {
        this.$i18n.locale = this.language.value;
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.loading
  position: fixed
  z-index: 1000
  width: 100%
  height: 100vh
  background: #000

.spinner
  margin: 100px auto
  width: 50px
  height: 40px
  text-align: center
  font-size: 10px


.spinner > div
  background-color: #fff
  height: 100%
  width: 6px
  display: inline-block
  
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out
  animation: sk-stretchdelay 1.2s infinite ease-in-out


.spinner .rect2 
  -webkit-animation-delay: -1.1s
  animation-delay: -1.1s


.spinner .rect3
  -webkit-animation-delay: -1.0s
  animation-delay: -1.0s


.spinner .rect4
  -webkit-animation-delay: -0.9s
  animation-delay: -0.9s


.spinner .rect5
  -webkit-animation-delay: -0.8s
  animation-delay: -0.8s


@-webkit-keyframes sk-stretchdelay
  0%, 40%, 100%
    -webkit-transform: scaleY(0.4)
  20%
    -webkit-transform: scaleY(1.0)


@keyframes sk-stretchdelay
  0%, 40%, 100%
    transform: scaleY(0.4)
    -webkit-transform: scaleY(0.4)
  20%
    transform: scaleY(1.0)
    -webkit-transform: scaleY(1.0)

.show-menu-enter-active
  animation: slide-in 2.5s ease forwards

  .show-menu-leave-active
    animation: slide-out 1s ease forwards

  .show-menu, .show-menu-leave-to .show-menu-leave-active
    opacity: 0

  @keyframes slide-in
    0%
      transform: translateY(-100%)

    100%
      transform: translateY(0)

  @keyframes slide-out
    0%
      transform: translateY(0)

    100%
      transform: translateY(-100%)
</style>