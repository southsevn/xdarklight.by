<template>
  <div class="catalog">
    <div class="catalog-container">
      <div v-if="!loading" class="products-container">
        <CatalogProduct
          v-for="(product, idx) in products"
          :key="idx"
          :product="product"
          :styles="style"
          :dark="dark"
        />
      </div>
      <DLoader v-else/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { theme } from "@/mixins";

export default {
  name: "IndexPage",
  head() {
    return {
      title: this.$t("pages.main.head")
    };
  },
  mixins: [theme],
  data() {
    return {
      paginationValue: 1
    };
  },
  computed: {
    ...mapState("products", ["products"]),
    ...mapGetters(["loading"]),
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
  },
  async created() {
    if(!this.products && !this.products?.length) {
      await this.getProducts();
    }
  },
  methods: {
    onPaginate(navQty) {
      this.paginationValue = this.paginationValue + navQty;
    },
    ...mapActions("products", ["getProducts"])
  }
}
</script>

<style lang="sass">
  .products-container
    grid-area: 1
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    gap: 100px 60px
    
  .d-pagination
    margin: 92px auto 0
</style>