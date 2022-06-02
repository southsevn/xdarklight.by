<template>
  <div v-if="product" class="product-container">
    <div class="product-slider" v-if="product.promoImages && product.promoImages.length">
      <div class="main-slider">
        <client-only>
          <VueSlickCarousel
            ref="main"
            v-bind="mainSlideOptions"
            :asNavFor="$refs.thumbs"
            @beforeChange="syncSliders"
          >
            <div class="product-slide" v-for="(image, idx) in product.images" :key="idx">
              <client-only>
                <zoom-on-hover
                  :img-normal="`${STATIC_PATH}${image}`"
                  :scale="2"
                  :alt="`${product.slug} image ${idx + 1}`"
                />
              </client-only>
            </div>
          </VueSlickCarousel>
        </client-only>
      </div>
      <div class="thumbs-slider">
        <client-only>
          <VueSlickCarousel
            ref="thumbs"
            v-bind="thumbsSlideOptions"
            :asNavFor="$refs.main"
            :slidesToShow="4"
            :focusOnSelect="true"
            @beforeChange="syncSliders"
          >
            <div class="thumb-slide" v-for="(image, idx) in product.images" :key="idx">
              <img
                v-lazy-load
                :data-src="`${STATIC_PATH}${image}`"
                :alt="`${product.slug} image ${idx + 1}` "
              />
            </div>
          </VueSlickCarousel>
        </client-only>
      </div>
    </div>
    <div class="product-description">
      <div class="product-title">
        <nuxt-link class="name" :to="`/product/${product.slug}`">{{` ${product.name}`}}</nuxt-link>
        <nuxt-link class="category" :to="`/?category=${product.parentProduct.category.id}`">{{ product.parentProduct.category[`name_${lang}`] }}</nuxt-link>
      </div>
      <p class="product-text">{{ product[`description_${lang}`] }}</p>
      <div class="product-characteristics">
        <DSize
          v-if="product.size"
          :size="product.size"
        />
        <DMaterial
          :value="product.outsideMaterial"
          :product="product"
          :data="product.availableOutsideMaterial"
          @input="onMaterialChange"
          type="outside"
        />
        <DMaterial
          :value="product.insideMaterial"
          :product="product"
          :data="product.availableInsideMaterial"
          @input="onMaterialChange"
          type="inside"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { soundEffects, settings, cart, theme } from "@/mixins";

export default {  
  name: "Product",
  mixins: [soundEffects, settings, cart, theme],
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
  data() {
    return {
      selectedInsideMaterial: null,
      selectedOutsideMaterial: null,
      mainSlideOptions: {
        slidesToShow: 1,
        arrows: false,
        adaptiveHeight: true
      },
      thumbsSlideOptions: {
        slidesToShow: 4,
        arrows: false,
        centerMode: true,
        centerPadding: '40',
        responsive: [
          {
            'breakpoint': 780,
            'settings': {
              'slidesToShow': 6,
              'slidesToScroll': 3,
              'infinite': true
            }
          },
          {
            'breakpoint': 565,
            'settings': {
              'slidesToShow': 5,
              'slidesToScroll': 1,
              'infinite': true
            }
          }
        ]
      },
      showPopup: false
    };
  },
  async created() {
    await this.getProductBySlug(this.$route.params.slug);
  },
  methods: {
    ...mapActions("products", ["getProductBySlug"]),
    syncSliders(currentPosition, nextPosition) {
      this.$refs['main'].goTo(nextPosition);
      this.$refs['thumbs'].goTo(nextPosition);
    }
  }
}
</script>

<style scoped lang="sass">
  .product
    &-container
      display: grid
      grid-template-columns: 3.5fr 3fr
      grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content) minmax(min-content, max-content)
      gap: 0px 60px

    &-slider
      overflow: hidden
      position: relative
      grid-area: 1 / 1 / 4 / 2

    &-slide
      img
        max-width: 100%
        width: 100%

    &-title
      display: flex
      flex-direction: column

      .name
        font-size: 40px
        font-weight: bold

      .category
        margin-top: 10px
        font-size: 15px
        font-weight: 300

    &-text
      margin: 60px 0

  .thumbs
    &-slider
      margin-top: 20px
      height: 85px
      position: relative

      @include md
        height: 60px

      img
        margin: auto
        width: 85px
        height: 85px
        object-fit: cover

        @include ml
          width: auto

        @include md
          width: 60px
          height: 60px
</style>