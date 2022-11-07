<template>
  <div v-if="product" class="product-container">
    <div class="product-slider">
      <template v-if="!loading">
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
                    :scale="1"
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
      </template>
      <DLoader v-else/>
    </div>
    <div class="product-description">
      <div class="product-title">
        <nuxt-link class="name" :to="`/product/${product.slug}`">{{` ${product.name}`}}</nuxt-link>
        <nuxt-link class="category" :to="`/?category=${product.parentProduct.category.id}`">{{ product.parentProduct.category[`name_${lang}`] }}</nuxt-link>
      </div>
      <p class="product-text">
        <client-only>
          <vue-show-more-text
            @click="clickEffect()"
            :text="product[`description_${lang}`]"
            :more-text="$t('components.showMore')"
            :less-text="$t('components.showLess')"
            :additional-container-css="'padding: 0'"
            :additional-anchor-css="'text-align: left; font-size: 10px; padding-left: 0; margin-top: 10px'"
            :lines="lines"
          />
        </client-only>
      </p>
      <div class="product-characteristics">
        <DSize
          v-if="product.size"
          :size="product.size"
        />
        <DMaterial
          v-if="product.outsideMaterial"
          :value="outsideMaterial"
          :product="product"
          :data="product.availableOutsideMaterial"
          @input="onOutsideMaterialChange"
          type="outside"
        />
        <DMaterial
          v-if="product.insideMaterial"
          :value="insideMaterial"
          :product="product"
          :data="product.availableInsideMaterial"
          @input="onInsideMaterialChange"
          type="inside"
        />
      </div>
    </div>
    <div class="product-actions">
      <DButton
        v-if="!product.isSoldOut"
        inverted
        :text="$t('catalog.product.actions.addToCart')"
        @click="addToCart(addedProduct)"
      />
      <DButton
        @click="clickEffect"
        v-if="product.isSoldOut"
        :text="$t('catalog.product.actions.notify')"
        :icon="dark ? '/icons/notify-icon.svg' : '/icons/notify-icon-black.svg'"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { settings, cart, theme } from "@/mixins";

export default {  
  name: "Product",
  mixins: [settings, cart, theme],
  head() {
    return {
      title: this.title
    };
  },
  computed: {
    ...mapGetters("products", ["product"]),
    ...mapGetters(["loading"]),
    title() {
      return this.product ? `${this.product.name} | Darklight` : 'Darklight';
    },
    outsideMaterial() {
      return this.selectedOutsideMaterial || this.product.outsideMaterial;
    },
    insideMaterial() {
      return this.selectedInsideMaterial || this.product.insideMaterial;
    },
    addedProduct() {
      return {
        ...this.product,
        outsideMaterial: this.outsideMaterial,
        insideMaterial: this.insideMaterial
      }
    }
  },
  data() {
    return {
      lines: 10,
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
            'breakpoint': 1280,
            'settings': {
              'slidesToShow': 4,
              'slidesToScroll': 3,
              'infinite': true
            }
          },
          {
            'breakpoint': 960,
            'settings': {
              'slidesToShow': 3,
              'slidesToScroll': 3,
              'infinite': true
            }
          },
          {
            'breakpoint': 780,
            'settings': {
              'slidesToShow': 3,
              'slidesToScroll': 3,
              'infinite': true
            }
          },
          {
            'breakpoint': 560,
            'settings': {
              'slidesToShow': 3,
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
    },
    onOutsideMaterialChange(material) {
      this.selectedOutsideMaterial = material;
    },
    onInsideMaterialChange(material) {
      this.selectedInsideMaterial = material;
    }
  }
}
</script>

<style scoped lang="sass">
  .anchor
    text-align: left

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
      width: 80%
      margin: 40px 0
      font-size: 14px
      line-height: 1.2      

    &-actions
      margin-top: 40px

      .d-button
        width: 180px

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

  @include lg
    .product-container
      grid-template-columns: 4fr 2.5fr

    .product-text
      width: 100%
      margin: 20px 0

  @include ml
    .product-container
      grid-template-columns: 4fr 2.5fr
      gap: 0px 40px

    .product-text
      margin-top: 20px
      font-size: 12px

    .product-title
      .name
        font-size: 36px
      .category
        margin: 0
        font-size: 12px
      
  @media (max-width: 560px)
    .product-container 
      grid-template-columns: 1fr

    .product-description
      margin-top: 40px
</style>