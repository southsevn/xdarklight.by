<template>
  <div class="cart-table">
    <div class="table-heading" :style="style">
      <div
        :class="['table-heading-cell', item.class]"
        v-for="(item, idx) in tableHeading"
        :key="idx"
        :style="style"
      >{{ item.text }}</div>
    </div>
    <div v-if="products && products.length" class="table-data">
      <div
        class="table-data-row"
        v-for="(item, idx) in cartProducts"
        :key="idx"
        :style="style"
      >
        <div class="table-data-cell product">
          <img v-if="item && item.product" :src="`${STATIC_PATH}${item.product.images[0]}`" :alt="item.name">
          <div class="product-material">
            <DMaterial
              v-if="item && item.product"
              v-model="item.product.outsideMaterial"
              :data="item.product.availableOutsideMaterial"
              :styles="style"
              type="outside"
            />
            <DMaterial
              v-if="item && item.product"
              v-model="item.product.insideMaterial"
              :data="item.product.availableInsideMaterial"
              :styles="style"
              type="inside"
            />
          </div>
        </div>
        <div class="table-data-cell price">
          <DPrice v-if="item && item.product" :value="getProductPrice(item.product)"/>
        </div>
        <div class="table-data-cell quantity">
          <div class="product-quantity">
            <span @click="changeCartItem(item, -1)" class="minus">-</span>
            <span class="quantity">{{ item.qnt }}</span>
            <span @click="changeCartItem(item, 1)" class="plus">+</span>
          </div>
        </div>
        <div class="table-data-cell total">
          <div v-if="item && item.product" class="price">
            <span class="price-char">{{ getProductPrice(item.product).name }}</span>
            <div class="price-value">
              <span class="value">{{ getTotalPrice(getProductPrice(item.product).price, item.qnt) }}</span>
              <span class="zeros">.00</span>
            </div>
          </div>
        </div>
        <div class="table-data-cell remove">x</div>
      </div>
    </div>
  </div>
</template>

<script>
import { CartService } from "@/services";
import { mapState, mapActions } from "vuex";
import { theme, settings } from "@/mixins";

export default {
  name: "CartTable",
  mixins: [theme, settings],
  computed: {
    ...mapState("products", ["products"]),
    cartProducts: {
      set(value) {
        const mappedCartProducts = value.map(cartProduct => {
          const findedProduct = this.products?.find(product => product.id === cartProduct.id);
          
          return {
            product: findedProduct,
            qnt: cartProduct.qnt
          }
        });
        this.cartItems = mappedCartProducts;
      },
      get() {
        const cartProducts = CartService.getCart();

        if (this.cartItems?.length) {
          return this.cartItems;
        }

        if(!cartProducts.length) {
          return [];
        } else {
          return cartProducts.map(cartProduct => {
            const findedProduct = this.products?.find(product => product.id === cartProduct.id);
            
            return {
              product: findedProduct,
              qnt: cartProduct.qnt
            }
          });
        }
      }
    },
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
  },
  data() {
    return {
      cartItems: [],
      tableHeading: [
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
  async created() {
    await this.getProducts();
  },
  methods: {
    ...mapActions("products", ["getProducts"]),
    getProductPrice(product) {
      return product.prices.find(price => price.name.toLowerCase() === this.cur.toLowerCase());
    },
    getTotalPrice(price, qnt) {
      return price * qnt;
    }
  }
}
</script>

<style lang="sass">
  .table-heading
    padding-bottom: 10px
    border-bottom: 2px solid
    display: grid
    grid-auto-columns: 1fr
    grid-auto-rows: 1fr
    grid-template-columns: 50% 14% 14% 1fr 1fr
    grid-template-rows: 1fr

    &-cell
      font-size: 20px
      font-size: bold

      &.product
        width: 30%

  .table-data
    &-row
      display: grid
      grid-auto-columns: 1fr
      grid-auto-rows: 1fr
      grid-template-columns: 50% 14% 14% 1fr 1fr
      grid-template-rows: 1fr
      margin-top: 50px

  .table-data-cell
    &.product
      display: flex
      flex-direction: row

    img
      width: 190px
      max-width: 100%
      height: 140px
      object-fit: cover
      margin-right: 30px

    &.price, &.total
      padding-top: 60px

      .price
        flex-direction: row
        align-items: flex-start

      .price-value
        align-items: flex-end

      .price-char
        font-size: 20px
        margin-right: 10px

      .value
        font-size: 20px

      .zeros
        font-size: 20px
        line-height: 1

    &.quantity
      padding-top: 60px
      font-size: 20px
      user-select: none

      .quantity
        margin: 0 15px

      .plus, .minus
        cursor: pointer

    &.remove
      padding-top: 60px
      cursor: pointer
      text-align: center
</style>