<template>
  <div
    :class="['d-app', `${dark ? 'dark' : 'light'}`]"
    :style="{background: `${dark ? '#0F0F0F' : '#fff'}`}"
  >
    <Header :animateLogo="animateLogo"/>
    <transition name="show-menu">
      <Menu v-if="showMenu"/>
    </transition>
    <nuxt/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { theme } from "@/mixins";

export default {
  mixins: [theme],
  computed: {
    ...mapGetters(["showMenu"]),
  },
  data() {
    return {
      animateLogo: false
    }
  }
}
</script>

<style lang="sass" scoped>
  .d-app
    padding: 60px
    background: url("https://images.unsplash.com/photo-1647449680637-00bd9816f4f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80") no-repeat center

  .show-menu-enter-active
    animation: slide-in 2.5s ease forwards

  .show-menu-leave-active
    animation: slide-out 1s ease forwards

  .show-menu, .show-menu-leave-to .show-menu-leave-active
    opacity: 0

  @keyframes slide-in
    0%
      transform: translateY(-100%)
    
    100%
      transform: translateY(0)

  @keyframes slide-out
    0%
      transform: translateY(0)
    
    100%
      transform: translateY(-100%)
</style>