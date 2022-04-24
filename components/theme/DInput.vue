<template>
  <input class="d-input" @input="$emit('input')" :type="type" :value="value" :style="style"/>
</template>
<script>
import { theme } from "@/mixins";

export default {
  name: "DLogo",
  mixins: [theme],
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    style() {
      return {
        color: !this.dark ? '#0f0f0f' : '#fff',
        'border-color': !this.dark ? "#0f0f0f" : "#fff"
      }
    }
  }
}
</script>
<style lang="sass" scoped>
  .d-input
    font-size: 20px
    font-weight: 100
    padding: 15px 20px
    border: none
    outline: none
    background: none
    border-bottom: 1px solid
</style>