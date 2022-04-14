import { mapState } from "vuex";

export const theme = {
  computed: {
    ...mapState(["dark"])
  }
};
