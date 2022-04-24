<template>
  <div class="catalog">
    <DPageTitle :title="$t('catalog.title')"/>
    <div class="catalog-container">
      <div class="filter-container">
        <CatalogFilter :styles="style"/>
      </div>
      <div class="products-container">
        <CatalogProduct
          v-for="(product, idx) in products"
          :key="idx"
          :product="product"
          :styles="style"
          :dark="dark"
        />
      </div>
    </div>
    <DPagination
      :value="paginationValue"
      :length="7"
      @change="onPaginate"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { theme } from "@/mixins";

export default {
  name: "Catalog",
  mixins: [theme],
  data() {
    return {
      paginationValue: 1
    };
  },
  computed: {
    ...mapState("products", ["products"]),
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
  },
  async created() {
    if(!this.products) {
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
  .catalog
    padding: 60px
    margin-top: 60px
    display: flex
    flex-direction: column
    
    &-container
      display: grid
      grid-auto-columns: 1fr
      grid-auto-rows: 1fr
      grid-template-columns: 1fr 3fr
      grid-template-rows: 1fr
      gap: 0px 0px
      margin-top: 50px

    .filter-container
      grid-area: 1

    .products-container
      grid-area: 1
      display: grid
      grid-template-columns: 1fr 1fr 1fr
      gap: 100px 60px
      grid-area: 1 / 2 / 2 / 3
    
  .d-pagination
    margin: 92px auto 0
</style>