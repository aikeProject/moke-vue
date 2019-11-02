<template>
  <div class="home">
    <el-row style="height: 100%;">
      <el-col
        style="height: 100%;"
        :xl="{ span: 18, offset: 3 }"
        :lg="{ span: 18, offset: 3 }"
        :md="{ span: 18, offset: 3 }"
        :sm="{ span: 18, offset: 3 }"
      >
        <el-container class="is-vertical home-container">
          <Header></Header>
          <router-view></router-view>
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
</style>
