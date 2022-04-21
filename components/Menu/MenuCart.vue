<template>
  <div class="cart-list">
    <div class="cart-product" v-for="(item, idx) in cartItems" :key="idx">
      <span @click="deleteCartItem(item.product)" class="close-icon">
        <img src="/icons/close-icon.svg" alt="Close">
      </span>
      <img v-if="item && item.product" :src="`${STATIC_PATH}${item.product.images[0]}`" :alt="item.product.name">
      <div v-if="item && item.product" class="product-info">
        <span class="product-category">{{ item.product.category }}</span>
        <h4 class="product-name">{{ item.product.name }}</h4>
      </div>
      <div v-if="item" class="product-price">
        <div class="product-quantity">
          <span @click="changeCartItem(item, -1)" class="minus">-</span>
          <span class="quantity">{{ item.qnt }}</span>
          <span @click="changeCartItem(item, 1)" class="plus">+</span>
        </div>
        <DPrice v-if="item && item.product" :value="getProductPrice(item.product)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { settings, soundEffects, cart } from "@/mixins";

export default {
  name: "MenuCart",
  mixins: [settings, soundEffects, cart],
  methods: {
    getProductPrice(product) {
      return product.prices.find(price => price.name.toLowerCase() === this.cur.toLowerCase());
    }
  }
}
</script>

<style lang="sass">
  .cart-list
    margin-top: 10px

  .cart-product
    position: relative
    text-align: center
    padding-top: 23px
    margin-bottom: 20px

    img
      max-width: 80%

    .quantity
      font-size: 20px
      margin: 0 10px

    .product-price
      padding-top: 10px
      border-top: 1px solid $white
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      user-select: none

      .price-value, .price-char
        font-size: 20px

        .value, .zeros
          font-size: 20px
          line-height: 1

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

    .product-quantity
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      user-select: none

    .plus, .minus
      font-size: 20px
      cursor: pointer
      user-select: none

    .price-char
      font-size: 20px
      margin-right: 10px
      user-select: none
</style>