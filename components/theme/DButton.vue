<template>
  <component
    :is="to ? 'nuxt-button' : 'button'"
    :to="to"
    class="d-button"
    :style="style"
    @click="$emit('click')"
  >{{ text }}</component>
</template>
<script>
import { theme } from "@/mixins";

export default {
  name: "DLogo",
  mixins: [theme],
  props: {
    text: {
      type: String,
      required: false,
      default: ""
    },
    to: {
      type: String,
      required: false,
      default: ''
    },
    inverted: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    style() {
      return {
        background: this.dark && !this.inverted ? "#0f0f0f" : this.dark && this.inverted ? "#fff" : !this.dark && this.inverted ? "#0f0f0f" : "#fff",
        color: this.dark && !this.inverted ? "#fff" : this.dark && this.inverted ? "#0f0f0f" : !this.dark && this.inverted ? "#fff" : "#0f0f0f",
        'border-color': this.dark && !this.inverted ? "#fff" : this.dark && this.inverted ? "#fff" : !this.dark && this.inverted ? "#0f0f0f" : "#0f0f0f"
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
    padding: 15px 15px
    min-width: 200px
    cursor: pointer
    border: 1px solid
</style>