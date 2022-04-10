<template>
  <div class="catalog">
    <DPageTitle :title="$t('catalog.title')"/>
    <div class="catalog-container">
      <div class="filters">
        <div class="filter-group" v-for="(filter, idx) in filters" :key="idx">
          <h5 class="filter-group-parent" :style="style">{{ $t(filter.parentCategory) }}</h5>
          <div class="filter-group-items">
            <span
              @mouseover="hoverEffect"
              @click="clickEffect"
              class="hover-link"
              :style="style"
              v-for="(item, key) in filter.items"
              :key="key"
            >{{ $t(item.text) }}</span>
          </div>
        </div>
      </div>
      <div class="products-container">
        <div :class="['product', {'sale': product.isSale, 'sold-out': product.isSoldOut}]" v-for="(product, idx) in products" :key="idx">
          <div class="product-image">
            <span class="product-sale-percent" v-if="product.isSale && product.salePercent > 0">{{ $tc("catalog.product.salePercent", product.salePercent) }}</span>
            <p class="product-soldout" v-if="product.isSoldOut">{{ $t("catalog.product.soldOut") }}</p>
            <img :src="product.images[0]" :alt="product.name">
          </div>
          <div class="product-info">
            <span :style="style" class="product-category">{{ product.category }}</span>
            <span :style="style" class="product-name">{{ product.name }}</span>
          </div>
          <DPrice class="product-price" v-model="product.price"/>
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
              @click="clickEffect"
            />
            <DButton
              @click="clickEffect"
              v-if="product.isSoldOut"
              :text="$t('catalog.product.actions.notify')"
              :icon="dark ? '/icons/notify-icon.svg' : '/icons/notify-icon-black.svg'"
            />
          </div>
        </div>
      </div>
    </div>
    <DPagination :value="paginationValue" :length="7" @change="onPaginate"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { theme, soundEffects } from "@/mixins";

export default {
  name: "Catalog",
  mixins: [theme, soundEffects],
  computed: {
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
  },
  data() {
    return {
      paginationValue: 1
    };
  },
  computed: {
    ...mapState(["products", "filters"])
  },
  methods: {
    onPaginate(navQty) {
      this.paginationValue = this.paginationValue + navQty;
    }
  }
}
</script>

<style lang="sass">
  .catalog
    padding: 60px
    margin-top: 60px
    display: flex
    flex-direction: column
    
    &-container
      display: grid
      grid-auto-columns: 1fr
      grid-auto-rows: 1fr
      grid-template-columns: 1fr 3fr
      grid-template-rows: 1fr
      gap: 0px 0px
      margin-top: 50px

    .filters
      grid-area: 1

    .filter-group
      margin-bottom: 30px

    .filter-group-parent
      margin-bottom: 20px
      font-size: 20px
      padding: 1px
      border-bottom: 1px solid
      width: fit-content

    .filter-group-items
      display: flex
      flex-direction: column

      span
        margin-bottom: 10px
        cursor: pointer
        width: fit-content

    .products-container
      grid-area: 1
      display: grid
      grid-template-columns: 1fr 1fr 1fr
      gap: 100px 60px
      grid-area: 1 / 2 / 2 / 3

    .product
      display: flex
      flex-direction: column

      &-image
        width: 100%
        height: 446px
        position: relative

        img
          max-width: 100%
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
        margin-bottom: 10px
        margin-left: auto
        margin-right: 0

      &-actions
        display: flex
        width: 100%

        .d-button
          width: 100%
    
  .d-pagination
    margin: 92px auto 0
</style>