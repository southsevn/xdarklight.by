<template>
  <div class="menu">
    <div v-if="menu" class="menu-list">
      <div :class="['menu-item', { submenu: item.childCategories }]" v-for="(item, idx) in menu" :key="idx">
        <div class="menu-item-container" v-if="item.childCategories">
          <nuxt-link class="hover-link page-link" @mouseover.native="hoverEffect" :to="item.to">{{ $t(item.text) }}</nuxt-link>
          <div class="submenu-container" v-for="(category, idx) in item.childCategories" :key="idx">
            <h4 class="submenu-category">{{ $t(category.categoryName) }}</h4>
            <div class="submenu-list">
              <nuxt-link
                v-for="(childItem, idx) in category.itemList"
                class="hover-link submenu-link"
                @mouseover.native="hoverEffect"
                to="/"
                :key="idx"
              >{{ $t(childItem) }}</nuxt-link>
            </div>
          </div>
        </div>
        <div class="menu-item-container" v-else>
          <nuxt-link class="hover-link page-link" @mouseover.native="hoverEffect" :to="item.to">{{ $t(item.text) }}</nuxt-link>
        </div>
      </div>
    </div>
    <div class="menu-cart">
      <div v-if="products && products.length" class="product-list">
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
      <h3 v-else class="empty-cart">{{ $t('components.menu.cart.empty') }}</h3>
    </div>
    <TextPages/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { theme, soundEffects } from "@/mixins";

export default {
  name: "Menu",
  mixins: [theme, soundEffects],
  computed: {
    ...mapState(["menu", "products"]),
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
  }
}
</script>

<style lang="sass">
  .menu
    width: 100%
    position: fixed
    top: 0
    left: 0
    right: 0
    z-index: 50
    background: rgba(15, 15, 15, .7)
    height: 95vh
    backdrop-filter: blur(20px)
    display: flex
    flex-direction: column
    color: $white

    &-list
      margin: 240px auto auto auto
      width: 50%
      display: flex
      flex-direction: column

    &-item
      font-size: 30px
      margin-bottom: 30px
      align-self: start
      text-align: right
      width: 45%

      &.submenu
        align-self: flex-end
        text-align: left

    &-cart
      position: absolute
      width: 361px
      border-left: 1px solid $white
      height: 95%
      overflow-x: hidden
      overflow-y: scroll
      right: 0
      padding: 90px 30px 0

      .empty-cart
        margin-top: 40px
        text-align: center

      //TODO: MOVE TO COMOPONENT MENU CART PRODUCT

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

      // MENU CART PRODUCT END 

    .text-pages
      margin-top: auto
      margin-left: 0

    .submenu-category
      font-size: 20px
      margin: 30px 0 20px
      border-bottom: 1px solid $white
      width: fit-content
      color: $white

    .submenu-list
      display: flex
      flex-direction: row
      width: 60%
      flex-wrap: wrap

    .submenu-link
      font-size: 15px
      margin-right: 10px
      margin-bottom: 10px
      color: $white !important

    .page-link.hover-link
      border-bottom: 2px solid transparent !important
      color: $white
      
      &:hover
        border-bottom: 2px solid !important
</style>