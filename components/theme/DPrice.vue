<template>
  <div class="price">
    <span class="price-char">{{ value.name }}</span>
    <div class="price-value">
      <span class="value">{{ value.price }}</span>
      <span class="zeros">.00</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DPrice",
  props: {
    value: {
      type: Object,
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
      margin-right: 20px

    &-value, &-char
      font-weight: bold

      .value
        font-size: 50px

      .zeros
        font-size: 40px
</style>