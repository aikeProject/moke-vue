<template>
  <div class="home">
    <el-row style="height: 100%;">
      <el-col
        style="height: 100%;"
        :xl="{ span: 20, offset: 2 }"
        :lg="{ span: 20, offset: 2 }"
        :md="{ span: 20, offset: 2 }"
      >
        <el-container class="home-container">
          <el-aside width="200px" class="aside">
            <div class="aside-content">
              Aside
            </div>
          </el-aside>
          <el-container class="is-vertical">
            <Header></Header>
            <el-main class="main">
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import { InterfaceUserInfo } from '../common/Interface';

@Component({
  components: {
    Header,
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="stylus">
.home-container
  box-shadow 0 0 30px rgba(0, 0, 0, .3)
  background #f1f3f4
  min-height 100vh

.main
  padding 0

.aside
  overflow unset

.aside-content
  position: sticky;
  top: 0;
  z-index: 99;
  height 100vh
  background #393d49
</style>
