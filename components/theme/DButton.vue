<template>
  <component
    :is="to ? 'nuxt-link' : 'button'"
    :to="to"
    :class="['d-button', {disabled: disabled}]"
    :style="style"
    @click="$emit('click')"
    @mouseover.stop="$emit('mouseover')"
  >
    <img v-if="icon" :src="icon" />
    {{ text }}
  </component>
</template>
<script>
import { theme } from "@/mixins";

export default {
  name: "DButton",
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
    },
    icon: {
      type: String,
      required: false,
      default: ""
    },
    disabled: {
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
  },
  methods: {
    onHoverBtnText(e) {
      e.stopPropagation();
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
    display: flex
    align-items: center
    justify-content: center
    
    &.disabled
     opacity: 0.5
     cursor: not-allowed

    img
      margin-right: 20px
      width: 20px

  @include xl
    .d-button
      padding: 10px
      font-size: 18px
</style>