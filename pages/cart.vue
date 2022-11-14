<template>
  <div class="cart-content">
    <div class="cart-table-container">
      <CartTable v-if="cartCount"/>
      <div v-else :style="style" class="cart-empty">
        <h3 class="cart-empty-heading">{{ $t("cart.empty.header") }}</h3>
        <p class="cart-empty-text">
          <nuxt-link to="/" class="cart-empty-link">{{ $t("cart.empty.link") }}</nuxt-link>
          <span>{{ $t("cart.empty.text") }}</span>
        </p>
      </div>
    </div>
    <aside class="delivery-description">
      <article v-if="deliveryPageContent && deliveryPageContent.length" class="delivery" :style="style">
        <h3 class="description-heading">{{ $t('components.textPages.delivery') }}</h3>
        <div v-for="(item, i) in deliveryPageContent" class="description-item" :key="i">
          <h4 class="description-item-heading">{{ item.heading[lang] }}</h4>
          <p class="description-item-text">{{ item.description[lang] }}</p>
        </div>
      </article>
      <article v-if="paymentPageContent && paymentPageContent.length" class="payments" :style="style">
        <h3 class="description-heading">{{ $t('components.textPages.payment') }}</h3>
        <div v-for="(item, i) in paymentPageContent" class="description-item" :key="i">
          <h4 class="description-item-heading">{{ item.heading[lang] }}</h4>
          <p class="description-item-text">{{ item.description[lang] }}</p>
        </div>
      </article>
    </aside>
  </div>
</template>

<script>
import { theme, settings } from "@/mixins";
import { mapState, mapActions } from "vuex";

export default {
  name: "CartPage",
  mixins: [theme, settings],
  head() {
    return {
      title: this.$t("pages.cart.head")
    };
  },
  computed: {
    ...mapState(["menu", "cartCount"]),
    ...mapState("company", ["deliveryPageContent", "paymentPageContent"])
  },
  methods: {
    ...mapActions("company", ["getDeliveryPageContent", "getPaymentPageContent"])
  },
  async created() {
    if (!this.deliveryPageContent) {
      await this.getDeliveryPageContent();
    }

    if (!this.paymentPageContent) {
      await this.getPaymentPageContent();
    }
  }
}
</script>

<style lang="sass">
  .cart-content
    display: grid
    grid-template-columns: auto 0.6fr
    gap: 0 60px

  .cart-table
    width: 100%

  .cart-table-container
    display: grid
    grid-template-columns: 1fr
    gap: 100px 60px
    grid-area: 1

  .cart-empty
    text-align: center
    margin-top: 20vh

    &-heading
      font-size: 20px
      font-weight: bold
      margin-bottom: 20px

    &-text
      font-size: 15px
      font-weight: regular

    &-link
      text-decoration: underline!important

  .delivery-description
    article
      margin-bottom: 50px

  .description-heading
    font-size: 30px
    margin-bottom: 20px

  .description-item-heading
    margin-bottom: 10px

  .description-item-text
    margin-bottom: 20px
    font-weight: 300
    line-height: 18px

  @include lg
    .cart-content
      grid-template-columns: 1fr
      gap: 50px 0
</style>