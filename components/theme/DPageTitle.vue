<template>
  <h2 class="d-page-title">{{ title }}</h2>
</template>

<script>
export default {
  name: "DPageTitle",
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
  .d-page-title
    font-weight: bold
    border-bottom: 2px solid $black
    position: relative
    margin-bottom: 10px

    &::before
      width: 100%
      content: " "
      position: absolute
      bottom: -4px
      border-bottom: 1px solid $black
</style>