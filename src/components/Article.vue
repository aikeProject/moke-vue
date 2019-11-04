<template>
  <article class="article">
    <h4 class="title">
      <slot name="title"></slot>
    </h4>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.article
  padding 30px 30px 20px
  background: #fff
  border 1px solid transparent
  box-shadow 0 2px 2px rgba(0,0,0,.05)

  .title
    text-decoration none
    cursor pointer
    font-size 22px
    padding-bottom 10px
    color #657180

  main
    font-size: 14px
    line-height: 2em
    color: #98a6ad;
    padding 10px 0

  footer
    padding-top 20px
    border-top 1px solid #edf1f2

  h4
    margin 0
    padding 0
</style>
