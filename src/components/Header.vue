<template>
  <el-header class="header" style="height: 52px;">
    <el-row type="flex" justify="center">
      <el-col :span="20"></el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end" class="hidden-xs-only">
          <router-link class="router-link" to="/login">登录</router-link>
          <router-link class="router-link" to="/register">注册</router-link>
        </el-row>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.header
  height: 52px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 99;
  box-shadow 0 2px 2px rgba(0, 0, 0, .05), 0 1px 0 rgba(0, 0, 0, .05)
  background #fff

.router-link
  display block
  line-height 20px
  padding 15px 5px
  color #657180
  font-size 14px
</style>
