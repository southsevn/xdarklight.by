import Vue from "vue";

Vue.mixin({
  computed: {
    STATIC_PATH: () => process.env.STATIC_URL
  }
})