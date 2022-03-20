<template>
  <div class="promo">
    <div :class="['promo-item', idx % 2 === 0 ? 'odd' : 'even']" v-for="(product, idx) in products" :key="idx">
      <img class="promo-item-image" :src="product.image" :alt="products.name" :title="product.name"/>
      <div class="promo-item-container">
        <div class="promo-item-product">
          <img class="promo-item-catalog-image" :src="product.catalogImage" :alt="products.name" :title="product.name"/>
          <h4 class="promo-item-category">{{ product.category }}</h4>
          <h3 class="promo-item-name">{{ product.name }}</h3>
        </div>
        <div class="promo-item-price">
          <span>{{ `P ${product.price}` }}</span><span class="price-format">.00</span>
        </div>
        <div class="promo-item-actions">
          <d-button :text="$t('components.promoItem.actions.oneClick')"/>
          <d-button :text="$t('components.promoItem.actions.addToCart')" inverted/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: this.$t("pages.main.head")
    };
  },
  filters: {
    formatNumber(string) {
      return
    }
  },
  computed: {
    ...mapState(["products"])
  }
} 
</script>

<style lang="sass" scoped>
  .promo
    margin-top: 150px

    &-item
      width: 45%
      display: flex
      flex-direction: column
      position: relative

      &:not(:first-child)
        transform: translateY(-50%)

      &.odd
        margin-right: auto

      &.even
        margin-left: auto

      &-container
        display: flex
        width: 50%
        flex-direction: column

      &-image
        max-width: 100%
        width: 100%

      &-product
        margin-top: 110px
        border-bottom: 2px solid
        position: relative

        &::before
          width: 100%
          content: " "
          position: absolute
          bottom: -4px
          border-bottom: 1px solid

      &-catalog-image
        width: 100%
        transform: translateY(-100%)
        position: absolute

      &-category
        font-size: 20px

      &-name
        font-size: 40px
        font-weight: bold
        margin-bottom: 20px

      &-price
        margin-left: auto
        font-size: 60px
        font-weight: bold

        .price-format
          font-size: 40px

      &-actions
        margin-top: 10px
        display: flex
</style>