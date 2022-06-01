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
            <p>{{ item.product.name }}</p>
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
</style>