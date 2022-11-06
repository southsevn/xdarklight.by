<template>
  <div :class="['text-pages', { 'at-menu': menu }]">
    <div class="links">
      <nuxt-link
        v-for="(page, idx) in textPages"
        class="text-pages-item hover-link"
        @mouseover.native="hoverEffect"
        :to="page.to"
        :key="idx"
        :style="style"
      >
        {{ $t(page.text) }}
      </nuxt-link>
    </div>
    <div class="actions">
      <DSelect
        v-if="languages"
        v-model="currentLanguage"
        :options="languages"
        top-open
      />
      <DSelect
        v-if="currencies"
        currency
        v-model="currentCurrency"
        :options="currencies"
        top-open
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { theme } from "@/mixins";

export default {
  name: "TextPages",
  mixins: [theme],
  props: {
    menu: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState(["textPages", "languages", "currencies", "language", "currency"]),
    currentLanguage: {
      get() {
        return this.language;
      },
      set(value) {
        this.$storage.set("language", value);
        this.$store.commit("SET_LANGUAGE", value);
      }
    },
    currentCurrency: {
      get() {
        return this.currency;
      },
      set(value) {
        this.$storage.set("currency", value);
        this.$store.commit("SET_CURRENCY", value);
      }
    },
    style() {
      return {
        color: this.menu ? '#fff' : !this.menu && this.dark ? '#fff' : !this.menu && !this.dark ? '#0f0f0f' : '#0f0f0f'
      }
    }
  }
}
</script>

<style lang="sass">
  .text-pages
    padding: 0 60px
    padding-bottom: 40px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: flex-start

    .links
      width: 70%

    &-item
      user-select: none
      display: inline-block
      margin-bottom: 5px

      &:not(:last-child)
        margin-right: 20px

    .actions
      display: flex

    .d-select:not(:last-child)
      margin-right: 20px

  @media (max-width: 1480px)
    .text-pages-item:not(:last-child)
      margin-right: 15px

  @include ml
    .text-pages
      padding: 0 30px

      .links
        font-size: 12px

  @include md
    .text-pages
      flex-direction: column-reverse

      .links
        width: 100%

      .actions
        width: 100%
        margin-bottom: 30px
</style>