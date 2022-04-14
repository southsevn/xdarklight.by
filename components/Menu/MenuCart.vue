<template>
  <div class="product-list">
    <div class="product" v-for="(item, idx) in products" :key="idx">
      <span class="close-icon">
        <img src="/icons/close-icon.svg" alt="Close">
      </span>
      <img :src="`${STATIC_PATH}${item.product.images[0]}`" :alt="item.product.name">
      <div class="product-info">
        <span class="product-category">{{ item.product.category }}</span>
        <h4 class="product-name">{{ item.product.name }}</h4>
      </div>
      <div class="product-price">
        <div class="product-quantity">
          <span class="minus">-</span>
          <span class="quantity">{{ item.qnt }}</span>
          <span class="plus">+</span>
        </div>
        <DPrice :value="getProductPrice(item.product)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { settings } from "@/mixins";

export default {
  name: "MenuCart",
  mixins: [settings],
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    getProductPrice(product) {
      // TODO: Parse price at backend
      return JSON.parse(product.prices.find(price => JSON.parse(price).name.toLowerCase() === this.cur.toLowerCase()));
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