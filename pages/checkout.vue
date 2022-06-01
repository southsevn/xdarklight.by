<template>
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
        <h3>{{ $t('checkout.form.label') }}</h3>
        <div class="checkout-form-container">
          <DInput
            v-model="name"
            @input="$v.name.$touch()"
            :label="$t('checkout.form.name.label')"
          />
          <DInput
            v-model="phone"
            @input="$v.phone.$touch()"
            :label="$t('checkout.form.phoneNumber.label')"
            :countryCode="phoneMaskCountry"
            phone
          />
          <DInput
            v-model="email"
            @input="$v.email.$touch()"
            type="email"
            :label="$t('checkout.form.email.label')"
          />
          <DInput
            v-model="city"
            @input="$v.city.$touch()"
            :label="$t('checkout.form.city.label')"
          />
          <DInput
            v-model="address"
            @input="$v.address.$touch()"
            :label="$t('checkout.form.address.label')"
          />
          <DInput
            v-model="comment"
            @input="$v.comment.$touch()"
            :label="$t('checkout.form.comment.label')"
            textarea
          />
        </div>
        <DButton :text="$t('checkout.form.submit')" inverted :disabled="!formValid"/>
      </div>
    </div>
    <aside class="order-description">
      <article
        v-if="deliveryPageContent && deliveryPageContent.length"
        class="delivery"
        :style="style"
      >
        <h3 class="description-heading">{{ $t('components.textPages.delivery') }}</h3>
        <div v-for="(item, i) in deliveryPageContent" class="description-item" :key="i">
          <h4 class="description-item-heading">{{ item.heading[lang] }}</h4>
          <p class="description-item-text">{{ item.description[lang] }}</p>
        </div>
      </article>
      <article
        v-if="paymentPageContent && paymentPageContent.length"
        class="payments"
        :style="style"
      >
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
import { settings, theme } from "@/mixins";
import { mapState, mapActions } from "vuex";
import { required, email, maxLength } from 'vuelidate/lib/validators';


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
    },
    formValid() {
      return (
        this.name && !this.$v.name.$error &&
        this.phone && !this.$v.phone.$error &&
        this.email && !this.$v.email.$error &&
        this.city && !this.$v.city.$error &&
        this.address && !this.$v.address.$error &&
        !this.$v.comment.$error
      );
    }
  },
  data() {
    return {
      country: '',
      phoneMaskCountry: 'by',
      name: '',
      phone: '',
      city: '',
      address: '',
      email: '',
      comment: ''
    }
  },
  validations() {
    return {
      name: {
        required
      },
      phone: {
        required
      },
      city: {
        required
      },
      address: {
        required
      },
      email: {
        required,
        email
      },
      comment: {
        maxLength: maxLength(540)
      }
    };
  },
  methods: {
    ...mapActions("company", ["getDeliveryPageContent", "getPaymentPageContent", "getDeliveryPrices"]),
    onCountrySelect(value) {
      this.phoneMaskCountry = value.toLowerCase();
      this.country = value;
    }
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
    display: grid
    grid-template-columns: 2fr 1fr
    gap: 0 60px

  .cart-table-container
    display: grid
    grid-template-columns: 1fr
    gap: 100px 60px
    grid-area: 1

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

  .checkout-form
    margin-top: 60px

    h3
      margin-bottom: 20px

    &-container
      display: grid
      align-items: end
      grid-template-columns: repeat(2, 1fr)
      gap: 40px
      margin-bottom: 60px
</style>