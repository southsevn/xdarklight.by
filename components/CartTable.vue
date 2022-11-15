<template>
  <div class="cart-table-wrapper">
    <div class="cart-table">
      <div class="table-heading" :style="style">
        <div
          :class="['table-heading-cell', item.class]"
          v-for="(item, idx) in tableHeading"
          :key="idx"
          :style="style"
        >{{ item.text }}</div>
      </div>
      <div class="table-data">
        <div
          class="table-data-row"
          v-for="(item, idx) in cartItems"
          :key="idx"
          :style="style"
        >
          <div class="table-data-cell product">
            <img :src="`${STATIC_PATH}${item.product.promoImages[0]}`" :alt="item.name" />
            <div class="product-material">
              <DMaterial
                :value="item.product.outsideMaterial"
                :product="item.product"
                :data="item.product.availableOutsideMaterial"
                @input="onMaterialChange"
                type="outside"
              />
              <DMaterial
                :value="item.product.insideMaterial"
                :product="item.product"
                :data="item.product.availableInsideMaterial"
                @input="onMaterialChange"
                type="inside"
              />
            </div>
          </div>
          <div class="table-data-cell price">
            <DPrice :value="getProductPrice(item.product)"/>
          </div>
          <div class="table-data-cell quantity">
            <div class="product-quantity">
              <span @click="changeCartItem(item, -1)" class="minus">-</span>
              <span class="quantity">{{ item.qnt }}</span>
              <span @click="changeCartItem(item, 1)" class="plus">+</span>
            </div>
          </div>
          <div class="table-data-cell total">
            <div class="price">
              <span class="price-char">{{ getProductPrice(item.product).name }}</span>
              <div class="price-value">
                <span class="value">{{ getTotalPrice(getProductPrice(item.product).price, item.qnt) }}</span>
                <span class="zeros">.00</span>
              </div>
            </div>
          </div>
          <div class="table-data-cell remove">
            <span @click="deleteCartItem(item.product)" class="remove-btn">x</span>
          </div>
        </div>
      </div>
      <div class="table-total" :style="style">
        <p>{{ $t("cart.table.totalPrice") }}</p>
        <div class="table-total-price">
          <span class="table-total-price-char">{{ cur }}</span>
          <div class="table-total-price-value">
            <span>{{ totalCartPrice }}</span>
            <span>.00</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-table-actions">
      <DButton to="/" :text="$t('cart.actions.continue')"/>
      <DButton to="/checkout" inverted :text="$t('cart.actions.checkout')"/>
    </div>
  </div>
</template>

<script>
import { theme, settings, cart } from "@/mixins";

export default {
  name: "CartTable",
  mixins: [theme, settings, cart],
  computed: {
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    },
    totalCartPrice() {
      return this.cartItems?.reduce((total, { product, qnt }) => {
        return total += product.prices.find(price => price.name === this.cur).price * qnt;
      }, 0);
    },
    tableHeading() {
      return [
        {
          class: "product",
          text: this.$t("cart.table.heading.product")
        },
        {
          class: "price",
          text: this.$t("cart.table.heading.price")
        },
        {
          class: "quantity",
          text: this.$t("cart.table.heading.qnt")
        },
        {
          class: "total",
          text: this.$t("cart.table.heading.total")
        },
        {
          class: "remove",
          text: this.$t("cart.table.heading.remove")
        }
      ]
    }
  },
  methods: {
    getProductPrice(product) {
      return product.prices.find(price => price.name.toLowerCase() === this.cur.toLowerCase());
    },
    getTotalPrice(price, qnt) {
      return price * qnt;
    },
    onMaterialChange({ material, product, type }) {
      if(type === "inside") {
        product.insideMaterial = material;
      }

      if(type === "outside") {
        product.outsideMaterial = material;
      }

      this.updateCartItem(product);
    }
  }
}
</script>
  
<style scoped lang="sass">
  .table-heading
    &-cell
      &.product
        width: 30%

  .table-data-cell
    &.product
      display: flex
      flex-direction: row
      padding-right: 10px

    &.price, &.total
      padding-top: 60px

    &.quantity
      padding-top: 60px

  @include lg
    .table-data-cell.product
      flex-direction: column

      .product-material
        margin-top: 20px

    .table-data-heading.remove
      display: none

  @include md
    .table-data-row
      grid-template-columns: none
      grid-template-areas: "product product product product" "price qnt qnt total"
      position: relative
      margin-top: 0
      padding-top: 20px

    .table-data-cell.product
      grid-area: product
      display: grid
      grid-template-columns: 1fr 1fr
      padding-right: 0
      display: grid
      padding: 0

      .product-material
        margin-top: 0

      img:not(.d-icon-arrow)
        padding-right: 10px

    .table-data-cell.price
      grid-area: price
      align-self: flex-start

    .table-data-cell.quantity
      text-align: center
      grid-area: qnt
      align-self: flex-start

    .table-data-cell.total
      grid-area: total
      align-self: flex-start

    .table-data-cell.remove
      padding: 0
      position: absolute
      right: 10px
      top: 0
      font-size: 18px

    .table-data-cell.price, .table-data-cell.total, .table-data-cell.quantity
      padding-top: 20px
  
    @include sm
      .table-data-row
        grid-template-areas: "product product" "price qnt"
        grid-auto-rows: minmax(100px, auto)

      .table-data-cell.product
        display: flex
        flex-direction: column

        img:not(.d-icon-arrow)
          padding-right: 0
          width: 100%
          margin: 0 auto
          max-width: 100%
          height: 360px
          margin-bottom: 20px

        .d-material
          width: 100%

      .cart-table-actions
        flex-direction: column

      .table-total
        margin-top: 0

      .table-data-cell.total
        display: none
</style>