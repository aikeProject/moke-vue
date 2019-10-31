<template>
  <div class="home">
    <el-row style="height: 100%;">
      <el-col
        style="height: 100%;"
        :xl="{ span: 20, offset: 2 }"
        :lg="{ span: 20, offset: 2 }"
        :md="{ span: 20, offset: 2 }"
        :sm="{ span: 20, offset: 2 }"
      >
        <el-container class="is-vertical home-container">
          <Header></Header>
          <el-container>
            <el-main class="home-main">
              <Info>
                <template v-slot:title>
                  哈哈
                </template>
                Here might be a page title
              </Info>
            </el-main>
            <el-aside width="240px"></el-aside>
          </el-container>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Info from '@/components/Info.vue';
import { InterfaceUserInfo } from '../common/Interface';

@Component({
  components: {
    Header,
    Info,
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="stylus">
.home-container
  box-shadow 0 0 30px rgba(0, 0, 0, .3)
  background #fff

.home-main
  min-height calc(100vh - 56px)
</style>
