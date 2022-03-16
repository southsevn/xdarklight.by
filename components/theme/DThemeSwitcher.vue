<template>
  <div @click="changeTheme" class="d-theme-switcher">
    <img v-if="dark" src="/theme-switcher/dark.svg">
    <img v-else src="/theme-switcher/light.svg">
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { localStorage } from "@/mixins"

export default {
  name: "DThemeSwitcher",
  mixins: [localStorage],
  methods: {
    changeTheme() {
      this.$store.dispatch("localStorage/changeTheme", !this.dark)
    }
  }
}
</script>
<style lang="sass">
  .d-theme-switcher
    cursor: pointer
</style>