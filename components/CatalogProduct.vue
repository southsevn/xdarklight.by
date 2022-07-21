<template>
  <div :class="['product', {'sale': product.isSale, 'sold-out': product.isSoldOut}]">
    <nuxt-link :to="`/product/${product.slug}`">
      <div class="product-image">
        <span class="product-sale-percent" v-if="product.isSale && product.salePercent > 0">{{ $tc("catalog.product.salePercent", product.salePercent) }}</span>
        <p class="product-soldout" v-if="product.isSoldOut">{{ $t("catalog.product.soldOut") }}</p>
        <img :src="`${STATIC_PATH}${product.promoImages[0]}`" :alt="product.name" preload placeholder/>
      </div>
    </nuxt-link>
    <div class="product-info">
      <span :style="styles" class="product-category">{{ product.category }}</span>
      <span :style="styles" class="product-name">{{ product.name }}</span>
    </div>
    <DPrice class="product-price" v-model="productPrice"/>
    <div class="product-actions">
      <DButton
        v-if="!product.isSoldOut"
        :text="$t('catalog.product.actions.oneClick')"
        @mouseover="hoverEffect"
      />
      <DButton
        v-if="!product.isSoldOut"
        inverted
        :text="$t('catalog.product.actions.addToCart')"
        @click="addToCart(product)"
      />
      <DButton
        @click="clickEffect"
        v-if="product.isSoldOut"
        :text="$t('catalog.product.actions.notify')"
        :icon="dark ? '/icons/notify-icon.svg' : '/icons/notify-icon-black.svg'"
      />
    </div>
  </div>
</template>

<script>
import { soundEffects, settings, cart } from "@/mixins";

export default {
  name: "CatalogProduct",
  mixins: [soundEffects, settings, cart],
  props: {
    product: {
      type: Object,
      required: true
    },
    styles: {
      type: Object,
      required: false
    },
    dark: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    productPrice() {
      // TODO: Parse price at backend
      return this.product.prices.find(price => price.name.toLowerCase() === this.cur.toLowerCase());
    }
  }
};
</script>

<style scoped lang="sass">
  .product
    display: flex
    flex-direction: column

    &-image
      width: 100%
      height: 446px
      position: relative

      img
        max-width: 100%
        width: 100%
        height: 100%
        object-fit: cover

    &-sale-percent
      position: absolute
      background: $black
      padding: 10px
      font-size: 30px
      font-weight: bold
      color: $white !important
      top: 30px
      left: 0

    &-soldout
      top: 0
      left: 0
      right: 0
      bottom: 0
      width: 100%
      height: 100%
      position: absolute
      background: rgba(0, 0, 0, 0.61)
      display: flex
      align-items: center
      justify-content: center
      font-size: 30px
      font-weight: bold
      color: $white

    &-info
      padding-top: 15px
      display: flex
      flex-direction: column
      border-bottom: 2px solid
      position: relative

      &::before
        width: 100%
        content: " "
        position: absolute
        bottom: -5px
        border-bottom: 1px solid

    &-category
      font-size: 20px

    &-name
      font-size: 40px
      font-weight: bold
      padding-bottom: 10px

    &-price
      margin: 15px 0 10px auto

    &-actions
      display: flex
      width: 100%

      .d-button
        width: 100%
</style>