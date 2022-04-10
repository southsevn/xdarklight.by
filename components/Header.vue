<template>
  <transition name="fade">
    <div v-if="loaded" class="header">
      <div class="socials">
        <d-theme-switcher/>
        <div class="socials-list">
          <d-link
            v-for="(social, idx) in socials"
            :key="idx"
            :href="social.link"
            :text="$t(social.text)"
            :light="!dark && showMenu"
            blank
          />
        </div>
      </div>
      <Logo class="logo" :animated="showMenu"/>
      <div class="navigation">
        <d-link
          to="/login"
          :text="$t('components.header.navigation.enter')"
          :light="!dark && showMenu"
        />
        <div class="cart" :style="navItemsStyle">
          <nuxt-link to="/cart" :style="navItemsStyle">{{ $t('components.header.navigation.cart') }}</nuxt-link>
          <span class="cart-counter" :style="navItemsStyle"> {{ `(${cartCount})` }} </span>
        </div>
        <div @click="onMenuButtonClick" class="menu-button">
          <span class="line-1" :style="menuButtonStyle"></span>
          <span class="line-2" :style="menuButtonStyle"></span>
          <span class="line-3" :style="menuButtonStyle"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { theme, soundEffects } from "@/mixins";

export default {
  name: "Header",
  mixins: [theme, soundEffects],
  props: {
    animateLogo: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters(["showMenu"]),
    ...mapGetters("cart", ["cartCount"]),
    menuButtonStyle() {
      return {
        'border-color': this.dark && !this.showMenu ? "#ffffff" : this.dark && this.showMenu ? "#ffffff" : !this.dark && !this.showMenu ? "#0f0f0f" : !this.dark && this.showMenu ? "#fff" : "#fff"
      };
    },
    navItemsStyle() {
      return {
        color: this.dark && !this.showMenu ? "#ffffff" : this.dark && this.showMenu ? "#ffffff" : !this.dark && !this.showMenu ? "#0f0f0f" : !this.dark && this.showMenu ? "#fff" : "#0f0f0f"
      }
    }
  },
  data() {
    return {
      loaded: false,
      socials: [
        {
          link: "https://www.instagram.com/darklight.by",
          text: "components.header.socials.instagram"
        },
        {
          link: "https://vk.com/darklight_by",
          text: "components.header.socials.vk"
        },
        {
          link: "https://www.facebook.com/darklight.gear",
          text: "components.header.socials.fb"
        }
      ]
    }
  },
  mounted() {
    this.loaded = true;
  },
  methods: {
    onMenuButtonClick() {
      this.clickEffect();
      this.$store.commit("SET_MENU", !this.showMenu);
    }
  }
}
</script>

<style lang="sass">
  .fade-enter-active, .fade-leave-active
    transition: all 2s ease

  .fade-enter, .fade-leave-to .fade-leave-active
    opacity: 0

  .logo
    position: absolute
    left: 50%
    right: 50%
    transform: translate(-50%, -50%)
    top: 112px

  .header
    display: flex
    position: fixed
    z-index: 100
    width: 100%
    left: 0
    right: 0
    padding: 60px 0 0

    .socials, .navigation
      display: flex
      align-items: center

    .socials
      margin-left: 60px     

    .socials-list
      margin-left: 30px

      .d-link
        margin-right: 20px

    .navigation
      position: absolute
      right: 0
      width: 301px
      margin-right: 60px

      > *
        margin-left: 30px

        &:first-child
          margin-left: 60px

    .menu-button
      width: 30px
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      cursor: pointer
      transition: all 1s

      .line-1
        transition: all 1s
        display: block
        border-bottom: 3px solid
        width: 100%
        margin-bottom: 5px

      .line-2
        transition: all 1s
        display: block
        border-bottom: 2px solid
        width: 100%
        margin-bottom: 4px

      .line-3
        transition: all 1s
        display: block
        border-bottom: 1px solid
        width: 100%
        margin-bottom: 0

    .cart-counter
      transition: all 1s
</style>