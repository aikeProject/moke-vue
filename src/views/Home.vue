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
              <div style="height: 20px"></div>
              <Article>
                <template v-slot:title>
                  Perfree-Simple-Pro-致更好的你
                </template>
                一款高仿Typecho的handsome博客主题 主题简介
                抛弃一切繁琐,只想简简单单的呈现你的文采,如你所见,
                这是一款简约清新的博客主题模板,该模板收费69元,包含相册插件和留言板插件(开发中)以及以后所有新出的插件,你只管创作,其他交给
                <template v-slot:footer>
                  <router-link to="">阅读全文</router-link>
                </template>
              </Article>
            </el-main>
            <el-aside class="home-aside" width="240px"></el-aside>
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
import Article from '@/components/Article.vue';
import { InterfaceUserInfo } from '../common/Interface';

@Component({
  components: {
    Header,
    Info,
    Article,
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
  background #f1f3f4

.home-aside
  background #f9f9f9
</style>
