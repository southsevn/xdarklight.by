<template>
  <div class="promo">
    <client-only>
      <VueSlickCarousel
        v-if="products && products.length"
        class="promo-slider"
        ref="promo"
        v-bind="promoSlideOptions"
      >
        <div v-show="!loading" class="promo-slide" v-for="(image, idx) in mappedPromoImages" :key="idx">
          <img :src="`${STATIC_PATH}${image}`" :alt="idx"/>
        </div>
      </VueSlickCarousel>
    </client-only>
    <FilterNavigation/>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Promo",
  computed: {
    ...mapState("products", ["products"]),
    ...mapGetters(["loading"]),
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

    &-slider, &-placeholder
      width: 63.2%
      height: 100vh

    &-placeholder
      background: url("/pl1.svg") no-repeat center center / cover

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
  
    @include ml
      &-slider, &-placeholder
        width: 70%
        height: 100vh

    @include md
      &-slider
        width: 100%

      .filter-navigation
        width: 100%
        transform: none
</style>