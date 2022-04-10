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
          :style="style"
          v-for="(item, key) in filter.items"
          :key="key"
        >{{ $t(item.text) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { soundEffects } from "@/mixins";

export default {
  name: "CatalogFilter",
  props: {
    style: {
      type: Object,
      required: true
    }
  },
  mixins: [soundEffects],
  computed: {
    ...mapState(["filters"])
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