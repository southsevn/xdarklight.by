<template>
  <div class="filter-navigation">
      <div class="filter-row" v-for="(row, idx) in filters" :key="idx">
        <MarqueeText :reverse="idx+1 %1 !== 0" :duration="30">
          <div class="filter-item" :key="idx" v-for="(item, idx) in row.items">  
            <div class="filter-item-content">
              <span @click="onFilterSelect(item.id)" class="filter-item-text">{{ $t(item.text) }}</span>
              <span class="filter-item-category">{{ $t(row.parentCategory) }}</span>
            </div>
            <span class="filter-item-separator" v-if="idx !== (filters.length - 1)">/</span>
          </div>
        </MarqueeText>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex"; 
export default {
  name: "FilterNavigation",
  computed: {
    ...mapState(["filters"]),
    mappedFilters() {
      return this.filters.map()
    }
  },
  methods: {
    onFilterSelect(id) {
      this.$emit("on-filter", id);
    }
  }
}
</script>

<style lang="sass">
  .filter-item
    display: flex
    flex-direction: row

    &-content
      display: flex
      flex-direction: column
      margin: 0 30px

    &-separator
      font-size: 70px
      font-weight: bold

  .filter-item-text
    font-size: 70px
    font-weight: bold
    cursor: pointer

  .filter-item-category
    font-size: 15px
  
  .marquee-text-text
    display: flex
</style>