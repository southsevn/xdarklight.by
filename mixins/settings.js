import { mapState } from "vuex";

export const settings = {
  computed: {
    ...mapState(["language", "currency"]),
    lang() {
      return this.language?.value;
    },
    cur() {
      return this.currency?.value;
    },
    isClient() {
      return process.client;
    },
    windowWidth() {
      return this.isClient ? window.innerWidth : 0
    }
  }
};
