<template>
  <div class="content">
    <DPageTitle class="text-page-title" :title="title"/>
    <section class="section" v-for="(item, idx) in content" :key="idx">
      <DPageTitle simply :title="item.heading.ru"/>
      <p class="section-description">{{ item.description.ru }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "TextPage",
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
    width: 45%
    margin: 0 auto 20px

    &-description
      line-height: 1.4
      font-size: 15px
</style>