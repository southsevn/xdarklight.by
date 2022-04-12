<template>
  <div class="text-pages">
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
</template>

<script>
import { mapState } from "vuex";
import { theme, soundEffects } from "@/mixins";

export default {
  name: "TextPages",
  mixins: [theme, soundEffects],
  props: {
    menu: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState(["textPages"]),
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
    padding-left: 60px
    padding-bottom: 40px

    &-item
      user-select: none

      &:not(:last-child)
        margin-right: 20px
</style>