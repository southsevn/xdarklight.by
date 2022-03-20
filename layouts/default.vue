<template>
  <div :class="['d-app', `${dark ? 'dark' : 'light'}`]" :style="{background: `${dark ? '#0f0f0f' : '#fff'}`}">
    <Header :animateLogo="animateLogo"/>
    <d-button @click="animateLogo = !animateLogo" text="ON"/>
    <nuxt/>
  </div>
</template>

<script>
import { theme } from "@/mixins";

export default {
  mixins: [theme],
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
</style>