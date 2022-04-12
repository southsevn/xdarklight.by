<template>
  <div class="d-page" v-if="deliveryDescription">{{ deliveryDescription }}</div>
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
    ...mapState("company", ["deliveryDescription"])
  },
  methods: {
    ...mapActions("company", ["getDeliveryDescription"])
  },
  async created() {
    await this.getDeliveryDescription();
  }
}
</script>

<style>

</style>