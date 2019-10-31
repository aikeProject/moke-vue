<template>
  <section class="component-info">
    <h3 class="component-info__title">
      <slot name="title"></slot>
    </h3>
    <div class="component-info__content">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.component-info
  padding 20px 0
  background white
  border-bottom 1px solid #dee5e7
  &__title
    font-size 20px
    color #657180
    padding-bottom 10px
  &__content
    color #98a6ad
</style>
