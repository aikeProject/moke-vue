<template>
  <el-container>
    <el-main>
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
        一款高仿Typecho的handsome博客主题 主题简介 抛弃一切繁琐,只想简简单单的呈现你的文采,如你所见,
        这是一款简约清新的博客主题模板,该模板收费69元,包含相册插件和留言板插件(开发中)以及以后所有新出的插件,你只管创作,其他交给
        <template v-slot:footer>
          <router-link to="">阅读全文</router-link>
        </template>
      </Article>
    </el-main>
    <el-aside class="home-aside" width="240px"></el-aside>
  </el-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Info from '@/components/Info.vue';
import Article from '@/components/Article.vue';

@Component({
  components: {
    Info,
    Article,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.home-aside
  background #f9f9f9
</style>
