<template>
  <div class="d-input-container">
    <template v-if="label">
      <label>{{ label }}</label>
      <component
        v-if="!phone"
        class="d-input"
        :is="textarea ? 'textarea' : 'input'"
        :type="type"
        :class="{textarea: textarea}"
        :value="newValue"
        @input="input"
        :style="style"
        :placeholder="placeholder"
      />
      <client-only v-else>
        <phone-mask-input
          :value="newValue"
          @input="onPhoneInput"
          :defaultCountry="countryCode"
          :inputClass="phoneInputClass"
          autoDetectCountry
          showFlag
          :style="style"
        />
      </client-only>
    </template>
    <template v-else>
      <component
        v-if="!phone"
        class="d-input"
        :is="textarea ? 'textarea' : 'input'"
        :type="type"
        :class="{textarea: textarea}"
        :value="newValue"
        @input="input"
        :style="style"
        :placeholder="placeholder"
      />
      <client-only v-else>
        <phone-mask-input
          :value="newValue"
          @input="onPhoneInput"
          :defaultCountry="countryCode"
          :inputClass="phoneInputClass"
          autoDetectCountry
          showFlag
          :style="style"
        />
      </client-only>
    </template>
  </div>
</template>
<script>
import { theme } from "@/mixins";

export default {
  name: "DInput",
  mixins: [theme],
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      requierd: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    textarea: {
      type: Boolean,
      required: false,
      default: false
    },
    phone: {
      type: Boolean,
      required: false,
      default: false
    },
    countryCode: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    style() {
      return {
        color: !this.dark ? '#0f0f0f' : '#fff',
        'border-color': !this.dark ? "#0f0f0f" : "#fff"
      }
    },
    phoneInputClass() {
      return `d-input ${this.dark ? 'dark' : 'light'} phone`;
    }
  },
  data() {
    return {
      newValue: this.value || ''
    };
  },
  methods: {
    input(e) {
      this.newValue = e?.target?.value;
      this.$emit('input', this.newValue);
    },
    onPhoneInput(value) {
      console.log(value);
      this.newValue = value;
      this.$emit('input', this.newValue);
    }
  }
}
</script>
<style lang="sass">
  .d-input
    font-size: 20px
    font-weight: 100
    padding: 15px 20px
    border: none
    outline: none
    background: none
    border-bottom: 1px solid

    &.dark
      color: $white

    &.light
      color: $black

    &.phone
      width: 100%
      margin-bottom: 12px

    &-container
      display: flex
      flex-direction: column
      width: auto
      margin: 0
</style>