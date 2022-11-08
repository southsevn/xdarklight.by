<template>
  <div class="text-page">
    <TextPage v-if="content" :content="content" :title="$t('components.textPages.care')"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CarePage",
  head() {
    return {
      title: this.$t("pages.care.head")
    };
  },
  computed: {
    ...mapState("company", ["carePageContent"]),
    content() {
      return this.carePageContent
    }
  },
  methods: {
    ...mapActions("company", ["getCarePageContent"])
  },
  async created() {
    await this.getCarePageContent();
  }
}
</script>

<style>

</style>