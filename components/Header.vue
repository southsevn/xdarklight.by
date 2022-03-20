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
            blank
          />
        </div>
      </div>
      <Logo class="logo" :animated="animateLogo"/>
      <div class="navigation">
        <d-link
          to="/login"
          :text="$t('header.navigation.enter')"
        />
        <div class="cart">
          <nuxt-link to="/cart">{{ $t('header.navigation.cart') }}</nuxt-link>
          <span> {{ `(${cartCount})` }} </span>
        </div>
        <div class="menu-button">
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
import { theme } from "@/mixins";

export default {
  name: "Header",
  mixins: [theme],
  props: {
    animateLogo: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters("cart", ["cartCount"]),
    menuButtonStyle() {
      return {
        'border-color': this.dark ? "#ffffff" : "#0f0f0f"
      };
    }
  },
  data() {
    return {
      loaded: false,
      socials: [
        {
          link: "https://www.instagram.com/darklight.by",
          text: "header.socials.instagram"
        },
        {
          link: "https://vk.com/darklight_by",
          text: "header.socials.vk"
        },
        {
          link: "https://www.facebook.com/darklight.gear",
          text: "header.socials.fb"
        }
      ]
    }
  },
  mounted() {
    this.loaded = true;
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
    top: 60px

  .header
    display: flex
    align-items: flex-start
    position: relative
    justify-content: space-between

    .socials, .navigation
      display: flex
      align-items: center

    .socials-list
      margin-left: 30px

      .d-link
        margin-right: 20px

    .navigation
      > *
        margin-left: 20px

    .menu-button
      width: 30px
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      cursor: pointer

      .line-1
        display: block
        border-bottom: 3px solid
        width: 100%
        margin-bottom: 5px

      .line-2
        display: block
        border-bottom: 2px solid
        width: 100%
        margin-bottom: 4px

      .line-3
        display: block
        border-bottom: 1px solid
        width: 100%
        margin-bottom: 0
</style>