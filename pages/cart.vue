<template>
  <main class="page">
    <DPageTitle :title="$t('cart.title')"/>
    <div class="cart-container">
      <div class="filter-container">
        <CatalogFilter :styles="style"/>
      </div>
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
      <aside class="description">
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
  </main>
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
    ...mapState("company", ["deliveryPageContent", "paymentPageContent"]),
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
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
  .cart-container
    margin-top: 50px
    display: grid
    grid-auto-columns: 1fr
    grid-auto-rows: 1fr
    grid-template-columns: 1fr 55% 1fr
    grid-template-rows: 1fr
    gap: 0px 0px
    margin-top: 50px

  .filter-container
    grid-area: 1

  .cart-table-container
    display: grid
    grid-template-columns: 1fr
    gap: 100px 60px
    grid-area: 1

  .description
    padding-left: 60px

    .delivery
      margin-bottom: 50px

    &-heading
      font-size: 20px
      font-weight: bold
      margin-bottom: 20px

    &-item-heading
      font-size: 15px
      font-weight: 400
      margin-bottom: 20px

    &-item-text
      font-size: 15px
    
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
      text-decoration: underline !important
</style>