<template>
  <div class="d-pagination">
    <div :class="['arrow', 'item', { dark: dark }]" @click="onArrowClick(-1)">
      <img :src="dark ? '/icons/arrow-left.svg' : '/icons/arrow-left-black.svg'" alt="Prev">
    </div>
    <div :class="['page-number', 'item', {'active': item === value}, { dark: dark }]" v-for="(item, idx) in length" :key="idx" @mouseover="hoverEffect">{{ item }}</div>
    <div class="arrow item" @click="onArrowClick(1)">
      <img :src="dark ? '/icons/arrow-right.svg' : '/icons/arrow-right-black.svg'" alt="Next">
    </div>
  </div>
</template>

<script>
import { theme, soundEffects } from "@/mixins";
 
export default {
  mixins: [theme, soundEffects],
  props: {
    value: {
      type: String | Number,
      required: false,
      default: 1
    },
    length: {
      type: Number,
      required: true
    }
  },
  methods: {
    onArrowClick(navQty) {
      if(this.value + navQty === 0 || (this.value + navQty) > this.length) {
        this.deniedEffect();
      } else {
        this.$emit("change", navQty);
      }
    }
  }
}
</script>

<style lang="sass">
  .d-pagination
    display: flex

    img
      width: 10px

    .item
      width: 50px
      height: 50px
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer
      border: 1px solid
      font-size: 20px
      font-weight: bold
      transition: .2s all
      user-select: none

      &:hover:not(.arrow)
        background: $black
        color: $white
        border: $black

      &.dark:not(.arrow)
        &.active
          background: $white
          color: $black

        &:hover
          background: $white
          color: $black
          border: $white

      &:not(:last-child)
        margin-right: 20px

      &.active
        background: $black
        color: $white
        border: $black
</style>