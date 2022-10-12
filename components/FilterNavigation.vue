<template>
  <div class="filter-navigation">
    <div
      v-if="categories && categories.length"
    >
      <div
        class="filter-row"
        v-for="(i, idx) in 2"
        :key="idx"
      >
        <MarqueeText :reverse="idx+1 %1 !== 0" :duration="duration" :paused="paused">
          <div class="filter-item" v-for="(item, key) in categories" :key="key">
            <div class="filter-item-content">
              <span @click="onFilterSelect(item.id)" @mouseover="onMouseOver" @mouseleave="paused = false"
                class="filter-item-text">
                {{ item[`name_${lang}`] }}
              </span>
              <span class="filter-item-category">{{ item.parentCategory[`name_${lang}`] }}</span>
            </div>
            <span class="filter-item-separator" v-if="idx !== categories.length - 1">/</span>
          </div>
        </MarqueeText>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { settings, soundEffects } from "@/mixins";

export default {
  name: "FilterNavigation",
  mixins: [settings, soundEffects],
  computed: {
    ...mapState(["categories"])
  },
  async created() {
    if (!this.categories) {
      await this.getCategories();
    }
  },
  data() {
    return {
      duration: 30,
      paused: false
    };
  },
  methods: {
    ...mapActions(["getCategories"]),
    onFilterSelect(id) {
      this.clickEffect();
      this.$router.push({ query: { category: id } });
      this.$emit("on-filter", id);
    },
    onMouseOver() {
      this.paused = true;
      this.hoverEffect();
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

    @include ml
      font-size: 54px

  .filter-item-category
    font-size: 15px
    user-select: none

    @include ml
      font-size: 12px
  
  .marquee-text-text
    display: flex
</style>