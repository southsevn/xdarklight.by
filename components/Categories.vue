<template>
  <div class="categories">
    <div
      v-if="categories && categories.length"
      class="filter-group"
      v-for="(category, idx) in categories"
      :key="idx"
    >
      <h5 class="filter-group-parent" :style="style">{{ category[`name_${lang}`] }}</h5>
      <div class="filter-group-items">
        <span
          :key="key"
          v-for="(item, key) in category.children"
        >
          <span class="hover-link" @click="sort(item.id)" @mouseover="hoverEffect" :style="style">{{ item[`name_${lang}`] }}</span>
          <span
            v-if="selectedCategory === item.id"
            @click="clearSelectedCategory()"
            class="close-icon button"
          >
            <img src="/icons/close-icon.svg" alt="Close" />
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { settings, theme, soundEffects } from "@/mixins";

export default {
  name: "Categories",
  mixins: [settings, theme, soundEffects],
  computed: {
    ...mapState(["selectedCategory", "categories"]),
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
  },
  methods: {
    ...mapActions(["getCategories"]),
    sort(id) {
      this.clickEffect();
      this.$router.push({ query: { category: id } });
      this.$store.commit("SET_SELECTED_CATEGORY", id);
    },
    clearSelectedCategory() {
      this.$store.commit("SET_SELECTED_CATEGORY", null);
      this.$router.replace({'query': null})
    }
  },
  async created() {
    if (!this.categories) {
      await this.getCategories();
    }
  }
}
</script>

<style lang="sass">
  .categories
    position: sticky
    top: 160px

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

  .close-icon.button
    margin-left: 10px
</style>