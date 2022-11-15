<template>
  <div
    :class="['d-app', `${dark ? 'dark' : 'light'}`]"
    :style="{background: `${dark ? '#0F0F0F' : '#fff'}`}"
  >
    <template>
      <Header :animateLogo="animateLogo" ref="header"/>
      <transition name="show-menu">
        <Menu v-if="showMenu" />
      </transition>
      <main class="main">
        <Promo v-if="isIndexPage"/>
        <div class="page">
          <DPageTitle id="title" v-if="!isProductPage" :title="pageTitle"/>
          <div class="page-container">
            <div class="categories-container">
              <Categories v-if="!isTextPages" />
            </div>
            <nuxt />
          </div>
        </div>
      </main>
      <TextPages/>
      <LegalInfo/>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { theme, settings } from "@/mixins";

export default {
  mixins: [theme, settings],
  computed: {
    ...mapGetters(["showMenu", "isPageOnTop"]),
    ...mapState(["languages", "currencies", "language", "selectedCategory"]),
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
      if (this.isClient) {
        if (window.scrollY > 150) {
          this.$store.commit("SET_PAGE_ON_TOP", false);
        } else {
          this.$store.commit("SET_PAGE_ON_TOP", true);
        }
      }
    }
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

    if (this.$route.query.category) {
      this.$store.commit("SET_S ELECTED_CATEGORY", this.$route.query.category);
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
    selectedCategory() {
      this.$router.push("/");
      setTimeout(() => {
        this.$scrollTo("#title", 1400, { offset: -30 })
      }, 300)
    },
    "$route.query": {
      handler(value) {
        if (value.category) {
          this.$store.commit("SET_SELECTED_CATEGORY", value.category);
        }
        this.$i18n.locale = this.language.value;
      },
    },
  },
};
</script>

<style lang="sass" scoped>
</style>