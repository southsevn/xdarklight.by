<template>
  <component :is="to ? 'nuxt-button' : 'button'" :to="to" class="d-button">{{ text }}</component>
</template>
<script>
export default {
  name: "DLogo",
  props: {
    text: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: ''
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