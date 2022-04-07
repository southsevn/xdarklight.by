<template>
  <div class="menu">
    <div v-if="menu" class="menu-list">
      <div :class="['menu-item', { submenu: item.childCategories }]" v-for="(item, idx) in menu" :key="idx">
        <div class="menu-item-container" v-if="item.childCategories">
          <nuxt-link class="hover-link" @mouseover.native="hoverEffect" :to="item.to">{{ $t(item.text) }}</nuxt-link>
          <div class="submenu-container" v-for="(category, idx) in item.childCategories" :key="idx">
            <h4 class="submenu-category">{{ $t(category.categoryName) }}</h4>
            <div class="submenu-list">
              <nuxt-link
                v-for="(childItem, idx) in category.itemList"
                class="hover-link submenu-link"
                @mouseover.native="hoverEffect"
                to="/"
                :key="idx"
              >{{ $t(childItem) }}</nuxt-link>
            </div>
          </div>
        </div>
        <div class="menu-item-container" v-else>
          <nuxt-link class="hover-link" @mouseover.native="hoverEffect" :to="item.to">{{ $t(item.text) }}</nuxt-link>
        </div>
      </div>
    </div>
    <div class="menu-cart"></div>
    <TextPages/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { soundEffects } from "@/mixins";

export default {
  name: "Menu",
  mixins: [soundEffects],
  computed: {
    ...mapState(["menu"]),
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
      right: 0

    .text-pages
      margin-top: auto
      margin-left: 0

    .submenu-category
      font-size: 20px
      margin: 30px 0 20px
      border-bottom: 1px solid $white
      width: fit-content

    .submenu-list
      display: flex
      flex-direction: row
      width: 60%
      flex-wrap: wrap

    .submenu-link
      font-size: 15px
      margin-right: 10px
      margin-bottom: 10px
</style>