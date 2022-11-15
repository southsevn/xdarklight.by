<template>
  <div class="checkout-table-wrapper">
    <div class="checkout-table">
      <div class="table-data">
        <div
          class="table-data-row"
          v-for="(item, idx) in cartItems"
          :key="idx"
          :style="style"
        >
          <div class="table-data-cell product">
            <p class="category">{{ item.product.parentProduct.category[`name_${lang}`] }}</p>
            <p class="product-name">{{ item.product.name }}</p>
          </div>
          <div class="table-data-cell price">
            <DPrice :value="getProductPrice(item.product)"/>
          </div>
          <div class="table-data-cell quantity">
            <div class="product-quantity">
              <span class="quantity">{{ item.qnt }}</span>
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
        </div>
      </div>
      <div class="table-total" :style="style">
        <p>{{ $t("checkout.table.totalPrice") }}</p>
        <div class="table-total-price">
          <span class="table-total-price-char">{{ cur }}</span>
          <div class="table-total-price-value">
            <span>{{ totalCartPrice }}</span>
            <span>.00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { theme, settings, cart } from "@/mixins";

export default {
  name: "Checkout",
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
          text: this.$t("checkout.table.heading.product")
        },
        {
          class: "price",
          text: this.$t("checkout.table.heading.price")
        },
        {
          class: "quantity",
          text: this.$t("checkout.table.heading.qnt")
        },
        {
          class: "total",
          text: this.$t("checkout.table.heading.total")
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
  .checkout-table
    .table-data-cell
      &.product
        display: flex
        font-size: 20px
        font-weight: bold
        display: flex
        flex-direction: column

        .category
          font-size: 15px
          margin-bottom: 5px
          font-weight: 300

    .table-data-row
      grid-template-columns: 3fr 1fr 1fr 1fr
      align-items: center

      &:first-child
        margin-top: 0

    .table-total
      justify-content: end
      padding-right: 40px

.category
  font-weight: 300
  font-size: 14px

.product-name
  font-weight: bold
  font-size: 18px

@include md
  .table-data-row
    display: grid
    grid-template-columns: auto 25% 15% 25%

  .table-data-cell.quantity
    text-align: center

@include sm
  .table-data-row
    margin-top: 20px
    display: grid
    grid-template-columns: auto auto auto
    grid-auto-rows: minmax(100px, auto)

  .table-data-cell.product
    display: flex
    flex-direction: column

  .table-total
    margin-top: 40px

  .table-data-cell.total
    display: none

@include xs
  .table-data-row
    grid-template-areas: "product product qnt" "price price qnt"
    align-items: flex-start

  .table-data-cell.product
    grid-area: product

  .table-data-cell.price
    height: auto
    margin: 20px 0 0 0
    align-self: flex-start
    grid-area: price

  .table-data-cell.quantity
    grid-area: qnt
    height: auto
    margin: 20px 0 0 0
    align-self: flex-start
</style>