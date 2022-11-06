import { mapState } from "vuex";

export const theme = {
  computed: {
    ...mapState(["dark"])
  },
  methods: {
     hoverEffect() {
      const audio = new Audio("/sounds/hover.wav");
      audio.play();
    },
    clickEffect() {
      const audio = new Audio("/sounds/click.wav");
      audio.play();
    },
    deniedEffect() {
      const audio = new Audio("/sounds/denied.wav");
      audio.play();
    }
  }
};
