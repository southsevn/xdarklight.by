<template>
  <div class="d-material">
    <h5 class="d-material-heaading">{{ $t(`components.material.fabric.${type}`) }}</h5>
    <div class="material-container" v-click-outside="hide">
      <div class="selected-material" @click="open = !open" :style="style">
        <div class="material-color" :style="{background: value.color}"></div>
        <div class="material-text"> {{ value.name }} </div>
        <img class="d-icon-arrow" :src="arrow" alt="Arrow" />
      </div>
      <div class="material-list" v-if="open" :style="style">
        <div
          class="material"
          v-for="(material, idx) in data"
          :key="idx"
          :class="{choose: (value === material.id && !selected) || (selected && (selected.id === material.id))}"
          @click="onMaterialSelect(material)"
          :label="material.name"
        >
          <div class="material-color" :style="{background: material.color}"></div>
          <div class="material-text">{{ material.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { theme } from "@/mixins";

export default {
  name: "DMaterial",
  mixins: [theme],
  directives: {
    ClickOutside
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    arrow() {
      return this.open && this.dark ? '/icons/arrow-up.svg' : this.open && !this.dark ? '/icons/arrow-up-black.svg' : !this.open && this.dark ? '/icons/arrow-down.svg' : '/icons/arrow-down-black.svg';
    },
    style() {
      return {
        background: this.dark ? '#0f0f0f' : '#fff',
        'border-color': !this.dark ? '#0f0f0f' : '#fff',
        color: !this.dark ? '#0f0f0f' : '#fff'
      }
    }
  },
  data() {
    return {
      selected: null,
      open: false
    };
  },
  methods: {
    onMaterialSelect(material) {
      this.open = false;
      this.$emit('input', {
        material: material,
        product: this.product,
        type: this.type
      });
    },
    hide() {
      this.open = false;
    }
  }
}
</script>

<style lang="sass">
  .d-material
    width: 220px
    margin-bottom: 20px
    background: none
    position: relative

    &-container
      display: flex
      align-items: flex-start
      flex-direction: column
      position: relative

    &-heaading
      margin-bottom: 10px
      font-size: 15px
      font-weight: bold

    .selected-material, .material
      width: 100%
      display: flex
      align-items: center
      cursor: pointer
      user-select: none
      padding: 5px 10px

    .selected-material
      border: 1px solid

    .material
      border: none

    .material-list
      width: 100%
      position: absolute
      z-index: 10
      background: none
      padding: 5px 0
      overflow-y: scroll
      border: 1px solid
      border-top: 0 !important

      &::-webkit-scrollbar
        display: none

    .material-list .selected-material
      background: none

    .material-color
      width: 20px
      height: 20px
      margin-right: 5px

    .material-text
      font-size: 12px
      font-weight: regular

    [class^="d-icon-"]
      margin-left: auto
      user-select: none
      width: 10px
      height: 10px
      line-height: 0
      margin-right: 5px
</style>