<template>
  <div class="menu">
    <div v-if="categories && categories.length" class="menu-list">
      <div :class="['menu-item', { submenu: item.childCategories }]" v-for="(item, idx) in mappedMenu" :key="idx">
        <div class="menu-item-container" v-if="item.childCategories">
          <nuxt-link class="hover-link page-link" @mouseover.native="hoverEffect" :to="item.to">{{ $t(item.text) }}</nuxt-link>
          <div class="submenu-container" v-for="(category, idx) in item.childCategories" :key="idx">
            <h4 class="submenu-category">{{ category[`name_${lang}`] }}</h4>
            <div class="submenu-list">
              <nuxt-link
                v-for="(children, idx) in category.children"
                class="hover-link submenu-link"
                @mouseover.native="hoverEffect"
                to="/"
                :key="idx"
              >{{ children[`name_${lang}`] }}</nuxt-link>
            </div>
          </div>
        </div>
        <div class="menu-item-container" v-else>
          <nuxt-link class="hover-link page-link" @mouseover.native="hoverEffect" :to="item.to">{{ $t(item.text) }}</nuxt-link>
        </div>
      </div>
    </div>
    <div v-if="isClient && windowWidth > 780" class="menu-cart">
      <MenuCart v-if="cartCount"/>
      <h3 v-else class="empty-cart">{{ $t('components.menu.cart.empty') }}</h3>
    </div>
    <TextPages menu/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { settings, theme, soundEffects } from "@/mixins";

export default {
  name: "Menu",
  mixins: [settings, theme, soundEffects],
  computed: {
    ...mapState(["categories", "menu", "cartCount"]),
    ...mapState("products", ["products"]),
    style() {
      return {
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    },
    mappedMenu() {
      const mappedCategories = this.categories?.reduce((a, item) => {
        const groupIndex = a.findIndex(elem => elem?.id === item.parentCategory.id);

        if (groupIndex === -1) {
          a[a.length] = {
            ...item.parentCategory,
            children: [item]
          };
        } else {
          a[groupIndex].children.push(item);
        }

        return a;
      }, []);

      const mappedMenu = {
        ...this.menu
      }

      mappedMenu[0].childCategories = [...mappedCategories];

      return mappedMenu;
    }
  },
  async created() {
    if (!this.categories) {
      await this.getCategories();
    }
  },
  methods: {
    ...mapActions(["getCategories"]),
  }
}
</script>

<style lang="sass">
  .menu
    width: 100%
    position: fixed
    top: 0
    left: 0
    right: 0
    z-index: 50
    background: rgba(15, 15, 15, .7)
    height: 95vh
    backdrop-filter: blur(20px)
    display: flex
    flex-direction: column
    color: $white

    &-list
      margin: 240px auto auto auto
      width: 50%
      display: flex
      flex-direction: column

    &-item
      font-size: 30px
      margin-bottom: 30px
      align-self: start
      text-align: right
      width: 45%

      &.submenu
        align-self: flex-end
        text-align: left

    &-cart
      position: absolute
      width: 361px
      border-left: 1px solid $white
      height: 95%
      overflow-x: hidden
      overflow-y: scroll
      right: 0
      padding: 90px 30px 0

      .empty-cart
        margin-top: 40px
        text-align: center
        user-select: none

    .submenu-category
      font-size: 20px
      margin: 30px 0 20px
      border-bottom: 1px solid $white
      width: fit-content
      color: $white

    .submenu-list
      display: flex
      flex-direction: row
      width: 60%
      flex-wrap: wrap

    .submenu-link
      font-size: 15px
      margin-right: 10px
      margin-bottom: 10px
      color: $white !important

    .page-link.hover-link
      border-bottom: 2px solid transparent !important
      color: $white
      
      &:hover
        border-bottom: 2px solid !important

    .text-pages
      margin-top: auto
      margin-left: 0

      .actions
        margin-right: 361px

  @include lg
    .menu
      &-list
        margin-top: 180px
        width: 45%

      &-item
        font-size: 24px

  @include ml
    .menu
      &-cart
        width: 296px

      &-list
        width: 60%

      &-item
        text-align: left

        &.submenu
          align-self: flex-start

  @include md
    .menu
      &-list
        margin-top: 25%
        width: 100%
        padding: 0 30px

      &-item
        width: 100%
        font-size: 18px
        margin-bottom: 15px

      .submenu-category
        margin: 25px 0
        font-size: 16px

      .submenu-category

      .text-pages
        .actions
          margin-right: 0

  @include sm
    .menu
      &-list
        margin-top: 30%
</style>