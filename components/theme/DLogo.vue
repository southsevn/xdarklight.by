<template>
  <div>
    <img v-if="!text" src="/logo/darklight-circle.svg" :alt="$t('components.logo.alt')" :title="$t('components.logo.alt')">
    <img v-else src="/logo/darklight-text.svg" :alt="$t('components.logo.alt')" :title="$t('components.logo.alt')">
  </div>
</template>
<script>
export default {
  name: "DLogo",
  props: {
    text: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>