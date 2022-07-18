<template>
  <div class="d-size">
    <div class="d-size-heading">{{ $t('components.size.header') }}</div>
    <div class="d-size-container">
      <div v-if="size && size.type === 'clothing'" class="clothing-size">
        {{ size.value }}
      </div>
      <div v-if="size && size.type === 'physical'" class="physical-size">
        <div v-if="size.value.w" class="d-size-item width">{{ $t('components.size.width', { width: size.value.w }) }}</div>
        <div v-if="size.value.h" class="d-size-item height">{{ $t('components.size.height', { height: size.value.h }) }}</div>
        <div v-if="size.value.d" class="d-size-item deep">{{ $t('components.size.deep', { deep: size.value.d }) }}</div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: "DSize",
  props: {
    size: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass">
  .d-size
    margin-bottom: 20px

    &-heading
      margin-bottom: 10px
      font-size: 15px
      font-weight: bold

    .clothing-size, .physical-size
      margin-top: 10px
      font-size: 12px
      font-weight: 400

    .physical-size
      display: flex

    &-item
      margin-right: 10px
</style>