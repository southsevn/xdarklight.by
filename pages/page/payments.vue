<template>
  <div class="d-page" v-if="paymentDescription">{{ paymentDescription }}</div>
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
    ...mapState("company", ["paymentDescription"])
  },
  methods: {
    ...mapActions("company", ["getPaymentDescription"])
  },
  created() {
    this.getPaymentDescription();
  }
}
</script>

<style>

</style>