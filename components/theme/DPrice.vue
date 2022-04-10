<template>
  <div class="price">
    <span class="price-char">P</span>
    <div class="price-value">
      <span class="value">{{ value }}</span>
      <span class="zeros">.00</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DPrice",
  props: {
    value: {
    type: Number | String,
    required: true
    }
  }
}
</script>

<style lang="sass">
  .price
    display: flex
    flex-direction: row

    &-char
      font-size: 50px
      margin-right: 1rem

    &-value, &-char
      font-weight: bold

      .value
        font-size: 50px

      .zeros
        font-size: 40px
</style>