<template>
  <div>
    <img v-if="!text" :src="!dark ? '/logo/darklight-circle.svg' : '/logo/darklight-circle-light.svg'" :alt="$t('components.logo.alt')" :title="$t('components.logo.alt')" />
    <img v-else :src="!dark ? '/logo/darklight-text.svg' : '/logo/darklight-text-light.svg'" :alt="$t('components.logo.alt')" :title="$t('components.logo.alt')" />
  </div>
</template>
<script>
import { theme } from "@/mixins"

export default {
  name: "DLogo",
  mixins: [theme],
  props: {
    text: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>