<template>
  <div :style="{background: `${!dark ? '#000' : '#fff'}`}">
    <d-theme-switcher/>
    <d-logo/>
    <d-logo text/>
    <d-page-title title="Каталог"/>
    <d-button text="Click"/>
  </div>
</template>

<script>
import { localStorage } from "@/mixins";

export default {
  mixins: [localStorage]
} 
</script>

<style scoped>
</style>