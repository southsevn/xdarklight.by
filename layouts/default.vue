<template>
  <div
    :class="['d-app', `${dark ? 'dark' : 'light'}`]"
    :style="{background: `${dark ? '#0F0F0F' : '#fff'}`}"
  >
    <Header :animateLogo="animateLogo" />
    <transition name="show-menu">
      <Menu v-if="showMenu" />
    </transition>
    <nuxt />
    <TextPages />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { theme } from "@/mixins";

export default {
  mixins: [theme],
  computed: {
    ...mapGetters(["showMenu", "isPageOnTop"]),
    ...mapState(["languages", "currencies", "language"])
  },
  data() {
    return {
      animateLogo: false,
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
    this.$i18n.locale = language.value;

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