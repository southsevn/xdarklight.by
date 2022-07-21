<template>
  <div class="d-select" @click="open = !open" v-click-outside="hide">
    <div class="d-selected">
      <span> {{ value[currency ? 'name': 'title'] }} </span>
      <div class="inner-item">
        <img class="d-icon-arrow" :src="arrow" alt="Arrow" />
      </div>
    </div>
    <ul :class="['d-select-list', {'top-open': topOpen}]" v-if="open">
      <li
        class="d-select-item"
        v-for="(option, idx) in options"
        :key="idx"
        @click="onOptionClick(option)"
      >
        {{ option[currency ? 'name': 'title'] }}
      </li>
    </ul>
  </div>
</template>

<script>
import { theme } from "@/mixins";
import ClickOutside from 'vue-click-outside';

export default {
  name: 'DSelect',
  mixins: [theme],
  directives: {
    ClickOutside
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    currency: {
      type: Boolean,
      required: false,
      default: false
    },
    topOpen: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    arrow() {
      return this.open && this.dark ? '/icons/arrow-up.svg' : this.open && !this.dark ? '/icons/arrow-up-black.svg' : !this.open && this.dark ? '/icons/arrow-down.svg' : '/icons/arrow-down-black.svg';
    }
  },
  methods: {
    onOptionClick(option) {
      this.hide();
      this.$emit('input', option);
    },
    hide() {
      this.open = false;
    }
  }
};
</script>

<style lang="sass">
.d-select
  position: relative

  &-list
    width: 100%
    position: absolute
    z-index: 10

    &.top-open
      bottom: 30px

    @media (max-width: $xl)
      padding-top: 0

  &-item
    cursor: pointer

    &:hover
      // color: $black

    &:first-child
      margin-top: 10px

    &:not(:last-child)
      margin-bottom: 10px

.d-selected
  position: relative
  padding: 0px
  display: flex
  flex-direction: row
  cursor: pointer
  align-items: center

  [class^="d-icon-"]
    margin-left: 10px
    user-select: none
    width: 10px
    height: 10px
    font-size: 15px
    line-height: 0
</style>
