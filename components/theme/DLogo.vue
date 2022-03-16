<template>
  <div>
    <img v-if="!text" :src="!dark ? '/logo/darklight-circle.svg' : '/logo/darklight-circle-light.svg'" :alt="$t('components.logo.alt')" :title="$t('components.logo.alt')">
    <img v-else :src="!dark ? '/logo/darklight-text.svg' : '/logo/darklight-text-light.svg'" :alt="$t('components.logo.alt')" :title="$t('components.logo.alt')">
  </div>
</template>
<script>
import { localStorage } from "@/mixins"

export default {
  name: "DLogo",
  mixins: [localStorage],
  props: {
    text: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>