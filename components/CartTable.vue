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
            <nuxt-img :src="`static/${item.product.promoImages[0]}`" :alt="item.name" />
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

    &.price, &.total
      padding-top: 60px

    &.quantity
      padding-top: 60px
</style>