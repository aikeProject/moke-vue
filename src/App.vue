<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="stylus">
@import "style/markdown.styl";

body
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: linear-gradient(to top, rgb(251, 194, 235) 0%, rgb(166, 193, 238));
  width 100%
  min-height 100vh
  font-size 14px

a
  text-decoration none
</style>
