<template>
  <div class="content">
    <section class="section" v-for="(item, idx) in content" :key="idx">
      <DPageTitle simply :title="item.heading[lang]"/>
      <p class="section-description">{{ item.description[lang] }}</p>
    </section>
  </div>
</template>

<script>
import { settings } from "@/mixins";

export default {
  name: "TextPage",
  mixins: [settings],
  props: {
    content: {
      type: Array | Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="sass">
  .content

    .text-page-title
      margin-bottom: 50px

  .section
    width: 68.2%
    margin: 0 auto 20px

    &-description
      line-height: 1.4
      font-size: 15px

  @include lg
    .content
      margin-left: -60px

    .section
      width: 100%

  @include md
    .content
      margin-left: auto
      
    .section-description
      font-size: 14px
</style>