<template>
  <div class="promo">
    <client-only>
      <VueSlickCarousel
        v-if="products && products.length"
        class="promo-slider"
        ref="promo"
        v-bind="promoSlideOptions"
      >
        <div class="promo-slide" v-for="(image, idx) in mappedPromoImages" :key="idx">
          <img :src="`${STATIC_PATH}${image}`" :alt="idx"/>
        </div>
      </VueSlickCarousel>
    </client-only>
    <FilterNavigation/>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Promo",
  computed: {
    ...mapState("products", ["products"]),
    mappedPromoImages() {
      return this.products?.map(product => {
        return product.promoImages[0];
      });
    }
  },
  data() {
    return {
      promoSlideOptions: {
        autoplay: true,
        autoplaySpeed: 6000,
        lazyLoad: 'ondemand',
        arrows: false,
        fade: true,
        speed: 2000,
        vertical: false,
        pauseOnHover: false,
        infinite: true
      }
    }
  },
  async created() {
    if (!this.products && !this.products?.length) {
      await this.getProducts();
    }
  },
  methods: {
    ...mapState("products", ["getProducts"]),
  }
}
</script>

<style lang="sass">
  .promo
    height: 100vh
    overflow: hidden
    position: relative

    &-slider
      width: 63.2%
      height: 100vh

    &-slide
      img
        width: 100%
        height: 100vh
        object-fit: cover

    .filter-navigation
      position: absolute
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 70%
</style>