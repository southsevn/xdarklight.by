<template>
  <div class="text-pages">
    <nuxt-link
      v-for="(page, idx) in textPages"
      class="text-pages-item hover-link"
      @mouseover.native="hoverEffect"
      :to="page.to"
      :key="idx"
    >
      {{ $t(page.text) }}
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { soundEffects } from "@/mixins";

export default {
  name: "TextPages",
  mixins: [soundEffects],
  computed: {
    ...mapState(["textPages"])
  }
}
</script>

<style lang="sass">
  .text-pages
    padding-left: 60px
    padding-bottom: 40px

    &-item
      &:not(:last-child)
        margin-right: 20px
</style>