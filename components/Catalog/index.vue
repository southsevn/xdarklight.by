<template>
  <div class="catalog">
    <DPageTitle :title="$t('catalog.title')"/>
    <div class="catalog-container">
      <div class="filter-container">
        <CatalogFilter/>
      </div>
      <div class="products-container">
        <CatalogProduct
          v-for="(product, idx) in products"
          :key="idx"
          :product="product"
          :style="style"
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
import { mapState } from "vuex";
import { theme } from "@/mixins";

export default {
  name: "Catalog",
  mixins: [theme],
  computed: {
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
  },
  data() {
    return {
      paginationValue: 1
    };
  },
  computed: {
    ...mapState(["products"])
  },
  methods: {
    onPaginate(navQty) {
      this.paginationValue = this.paginationValue + navQty;
    }
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