<template>
  <div>
    <div
      class="filter-group"
      v-for="(filter, idx) in filters"
      :key="idx"
    >
      <h5 class="filter-group-parent" :style="style">{{ $t(filter.parentCategory) }}</h5>
      <div class="filter-group-items">
        <span
          @mouseover="hoverEffect"
          @click="clickEffect"
          class="hover-link"
          :style="styles"
          v-for="(item, key) in filter.items"
          :key="key"
        >{{ $t(item.text) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { theme, soundEffects } from "@/mixins";

export default {
  name: "Categories",
  mixins: [theme, soundEffects],
  computed: {
    ...mapState(["filters"]),
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
  }
}
</script>

<style lang="sass">
  .filter-group
    margin-bottom: 30px

  .filter-group-parent
    margin-bottom: 20px
    font-size: 20px
    padding: 1px
    border-bottom: 1px solid
    width: fit-content

  .filter-group-items
    display: flex
    flex-direction: column

    span
      margin-bottom: 10px
      cursor: pointer
      width: fit-content
</style>