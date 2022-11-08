<template>
  <div class="text-page">
    <TextPage v-if="content" :content="content" :title="$t('components.textPages.payment')"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PaymentsPage",
  head() {
    return {
      title: this.$t("pages.payments.head")
    };
  },
  computed: {
    ...mapState("company", ["paymentPageContent"]),
    content() {
      return this.paymentPageContent;
    }
  },
  methods: {
    ...mapActions("company", ["getPaymentPageContent"])
  },
  async created() {
    await this.getPaymentPageContent();
  }
}
</script>

<style>

</style>