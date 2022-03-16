<template>
  <div :style="{background: `${!dark ? '#000' : '#fff'}`}">
    <d-theme-switcher/>
    <d-logo/>
    <d-logo text/>
    <d-page-title title="Каталог"/>
    <d-button text="Click"/>
    <div>
      <d-input v-model="inputValue"/>
    </div>
  </div>
</template>

<script>
import { localStorage } from "@/mixins";
import DInput from '../components/theme/DInput.vue';

export default {
  components: { DInput },
  mixins: [localStorage],
  data() {
    return { 
      inputValue: 'value'
    }
  }
} 
</script>

<style scoped>
</style>