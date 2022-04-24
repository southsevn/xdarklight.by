<template>
  <div class="page">
    <DPageTitle :title="$t('checkout.title')"/>
    <div class="checkout-container">
      <div class="checkout-table-container">
        <CheckoutTable v-if="cartCount"/>
        <div class="checkout-delivery">
          <h3>{{ $t('checkout.delivery.heading') }}</h3>
          <div class="checkout-delivery-actions">
            <country-select
              class="country-select"
              @input="onCountrySelect"
              :placeholder="$t('components.countrySelector.placeholder')"
              :country="country"
              :usei18n="false"
              :style="style"
            />
            <div v-if="country" class="delivery-price-container">
              <p>{{ $t('checkout.delivery.price') }}</p>
              <div class="delivery-price">
                <span class="delivery-price-char">{{ cur }}</span>
                <div class="delivery-price-value">
                  <span>{{ deliveryPrice }}</span>
                  <span>.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="country" class="checkout-form">
          <!-- <DInput
            v-model="phone"
            :label="$t('checkout.customerInfo.phone.label')"
            :defaultCountry="phoneMaskCountry"
            autoDetectCountry
            phone-mask
          /> -->
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
  </div>
</template>

<script>
import { settings, theme } from "@/mixins";
import { mapState, mapActions } from "vuex";

export default {
  name: "CheckoutPage",
  mixins: [settings, theme],
  head() {
    return {
      title: this.$t("pages.checkout.head")
    };
  },
  computed: {
    ...mapState(["menu", "cartCount"]),
    ...mapState("company", ["deliveryPageContent", "paymentPageContent", "deliveryPrices"]),
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff',
        'background': !this.dark ? '#fff' : '#0f0f0f'
      }
    },
    deliveryPrice() {
      return this.deliveryPrices?.find(price => price.title.toLowerCase() === this.country.toLowerCase())?.values[this.cur] || this.deliveryPrices?.find(price => price.title.toLowerCase() === 'other')?.values[this.cur];
    }
  },
  data() {
    return {
      country: '',
      phoneMaskCountry: 'by'
    }
  },
  methods: {
    ...mapActions("company", ["getDeliveryPageContent", "getPaymentPageContent", "getDeliveryPrices"]),
    onCountrySelect(value) {
      this.phoneMaskCountry = value.toLowerCase();
      this.country = value;
    },
  },
  async created() {
    if(!this.cartCount) {
      this.$router.push("/");
    }

    if (!this.deliveryPageContent) {
      await this.getDeliveryPageContent();
    }

    if (!this.paymentPageContent) {
      await this.getPaymentPageContent();
    }

    if (!this.deliveryPrices) {
      await this.getDeliveryPrices();
    }
  }
}
</script>

<style lang="sass">
  .checkout-container
    margin-top: 50px
    display: grid
    grid-template-columns: 3.45fr 1fr
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
      transition: 1s all

    .payments
      transition: 1s all

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

  .checkout-delivery-actions
    margin-top: 20px
    display: flex
    flex-direction: column
    align-items: flex-start

  .country-select
    font-family: $road-radio
    padding: 10px
    transition: 1s all

  .delivery-price-container
    font-weight: bold
    font-size: 20px
    display: flex
    margin-top: 20px

    .delivery-price
      display: flex
      margin-left: 20px

    .delivery-price-value
      margin-left: 5px
      display: flex
</style>