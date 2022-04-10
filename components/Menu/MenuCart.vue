<template>
  <div class="product-list">
    <div class="product" v-for="(product, idx) in products" :key="idx">
      <span class="close-icon">
        <img src="/icons/close-icon.svg" alt="Close">
      </span>
      <img :src="product.images[0]" :alt="product.name">
      <div class="product-info">
        <span class="product-category">{{ product.category }}</span>
        <h4 class="product-name">{{ product.name }}</h4>
      </div>
      <div class="product-price">
        <div class="product-quantity">
          <span class="minus">-</span>
          <span class="quantity">1</span>
          <span class="plus">+</span>
        </div>
        <DPrice v-model="product.price"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "MenuCart",
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="sass">
  .product-list
    margin-top: 10px

  .product
    position: relative
    text-align: center
    padding-top: 23px
    margin-bottom: 20px

    img
      max-width: 80%

  .close-icon
    position: absolute
    right: 0
    top: 0
    cursor: pointer
    z-index: 2000

    img
      cursor: pointer

  .product-info
    text-align: left
    margin-top: 5px

  .product-category
    font-size: 15px

  .product-name
    font-size: 20px
    margin: 5px 0
    font-weight: bold

  .product-price
    border-top: 1px solid $white
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center

  .product-quantity
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    margin-top: 10px

  .quantity
    font-size: 20px
    margin: 0 10px

  .plus, .minus
    font-size: 20px
    cursor: pointer
    user-select: none

  .price-char
    font-size: 20px
    margin-right: 10px

  .price-value
    .value, .zeros
      font-size: 20px
</style>