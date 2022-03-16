<template>
  <component :is="to ? 'nuxt-button' : 'button'" :to="to" class="d-button" :style="style">{{ text }}</component>
</template>
<script>
import { localStorage } from "@/mixins";

export default {
  name: "DLogo",
  mixins: [localStorage],
  props: {
    text: {
      type: String,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    style() {
      return {
        background: this.dark ? '#0f0f0f' : '#fff',
        color: this.dark ? '#fff' : '#0f0f0f'
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .d-button
    font-size: 20px
    font-weight: bold
    background: $white
    color: $black
    border: none
    padding: 15px 44px
    min-width: 200px
</style>