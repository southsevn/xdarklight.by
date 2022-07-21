<template>
  <div @click="changeTheme" class="d-theme-switcher">
    <img v-if="!dark" src="/theme-switcher/dark.svg" />
    <img v-else src="/theme-switcher/light.svg" />
  </div>
</template>
<script>
import { theme } from "@/mixins"

export default {
  name: "DThemeSwitcher",
  mixins: [theme],
  methods: {
    changeTheme() {
      this.$storage.set('theme', !this.dark);
      this.$store.dispatch("changeTheme", !this.dark)
    }
  }
}
</script>
<style lang="sass">
  .d-theme-switcher
    cursor: pointer
</style>