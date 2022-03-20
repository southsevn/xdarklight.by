<template>
  <component
    :is="(to && !href) ? 'nuxt-link' : 'a'"
    :to="to"
    class="d-link"
    :href="(href && !to) ? href : ''"
    :target="`${blank ? '_blank' : '_self'}`"
  >{{ text }}</component>
</template>

<script>
export default {
  name: "DLink",
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
    }
  }
}
</script>