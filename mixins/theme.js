import { mapGetters } from "vuex";

export const theme = {
  computed: {
    ...mapGetters(["dark"])
  }
};
