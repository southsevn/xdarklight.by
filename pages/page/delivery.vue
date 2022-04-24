<template>
  <div class="page">
    <TextPage v-if="content" :content="content" :title="$t('components.textPages.delivery')"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DeliveryPage",
  head() {
    return {
      title: this.$t("pages.delivery.head")
    };
  },
  computed: {
    ...mapState("company", ["deliveryPageContent"]),
    content() {
      return this.deliveryPageContent;
    }
  },
  methods: {
    ...mapActions("company", ["getDeliveryPageContent"])
  },
  async created() {
    await this.getDeliveryPageContent();
  }
}
</script>

<style>

</style>