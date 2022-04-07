<template>
  <div class="main">
    <Promo/>
    <Catalog/>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "IndexPage",
  head() {
    return {
      title: this.$t("pages.main.head")
    };
  },
  computed: {
    ...mapState(["products"])
  }
} 
</script>

<style lang="sass">
  
</style>