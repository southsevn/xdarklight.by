export const soundEffects = {
  methods: {
    hoverEffect() {
      const audio = new Audio("/sounds/hover.wav");
      audio.play();
    },
    clickEffect() {
      const audio = new Audio("/sounds/click.wav");
      audio.play();
    }
  }
}