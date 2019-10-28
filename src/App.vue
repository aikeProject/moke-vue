<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
};
</script>

<style lang="stylus">
@import 'style/reset.styl';

body
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: linear-gradient(to top, rgb(251, 194, 235) 0%, rgb(166, 193, 238));
  width 100%
  min-height 100vh
  font-size 14px
</style>
