<template>
  <component
    :is="(to && !href) ? 'nuxt-link' : 'a'"
    :to="to"
    class="d-link"
    :href="(href && !to) ? href : ''"
    :target="`${blank ? '_blank' : '_self'}`"
    :style="style"
  >{{ text }}</component>
</template>

<script>
import { theme } from "@/mixins";

export default {
  name: "DLink",
  mixins: [theme],
  props: {
    href: {
      type: String,
      required: false,
      default: ''
    },
    to: {
      type: String,
      required: false,
      default: ''
    },
    text: {
      type: String,
      required: true
    },
    blank: {
      type: Boolean,
      required: false,
      default: false
    },
    light: {
      type: Boolean,
      required: false,
      default: false
    },
    dark: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    style() {
      return {
        color: this.dark && !this.light ? "#ffffff" : this.dark && this.light ? "#ffffff" : !this.dark && !this.light ? "#0f0f0f" : !this.dark && this.light ? "#fff" : "#0f0f0f"
      }
    }
  }
}
</script>