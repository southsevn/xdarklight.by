<template>
  <div class="menu">
    <div class="menu-list"></div>
    <div class="menu-cart"></div>
  </div>
</template>

<script>
export default {
  name: "Menu"
}
</script>

<style lang="sass">
  .menu
    width: 100%
    position: fixed
    top: 0
    left: 0
    right: 0
    z-index: 50
    background: rgba(15, 15, 15, .7)
    height: 95vh
    backdrop-filter: blur(20px)
</style>