<template>
  <div class="product-container">
    <div class="product-promo" v-if="product && product.promoImages && product.promoImages.length">
      <img
        class="product-promo-image"
        v-for="(image, idx) in product.promoImages"
        :key="idx"
        :src="`${STATIC_PATH}${image}`"
        :alt="product.name">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { soundEffects, settings, cart } from "@/mixins";

export default {
  name: "Product",
  mixins: [soundEffects, settings, cart],
  head() {
    return {
      title: this.title
    };
  },
  computed: {
    ...mapGetters("products", ["product"]),
    title() {
      return this.product ? `${this.product.name} | Darklight` : 'Darklight';
    },
  },
  async created() {
    await this.getProductBySlug(this.$route.params.slug);
  },
  methods: {
    ...mapActions("products", ["getProductBySlug"])
  }
}
</script>

<style scoped lang="sass">
  .product-promo-image
    width: 100%
    height: 100vh
    object-fit: cover
</style>