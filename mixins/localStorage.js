import { mapGetters } from "vuex";

export const localStorage = {
  computed: {
    ...mapGetters("localStorage", ["dark"])
  }
};
