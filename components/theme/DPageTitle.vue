<template>
  <h2 :class="['d-page-title', { simply: simply }]" :style="style">{{ title }}</h2>
</template>

<script>
import { theme } from "@/mixins";

export default {
  name: "DPageTitle",
  mixins: [theme],
  computed: {
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    simply: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
  .d-page-title
    font-weight: bold
    position: relative
    margin-bottom: 10px
    font-size: 30px
    transition: 1s all

    &:not(.simply)
      border-bottom: 2px solid
      font-size: 40px

      &::before
        width: 100%
        content: " "
        position: absolute
        bottom: -4px
        border-bottom: 1px solid
</style>