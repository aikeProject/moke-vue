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
      <div v-for="item in articles" :key="item.id">
        <Article class="article--margin">
          <template v-slot:title>
            {{ item.title }}
          </template>
          {{ item.description }}
          <template v-slot:footer>
            <el-row type="flex" align="middle" justify="end">
              <router-link class="el-link el-link--default" to="">阅读全文</router-link>
            </el-row>
          </template>
        </Article>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="currentPage"
      ></el-pagination>
    </el-main>
    <el-aside class="home-aside" width="240px"></el-aside>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Info from '@/components/Info.vue';
import Article from '@/components/Article.vue';
import { InterfaceArticle } from '@/common/Interface';
import { ArticlesList } from '@/common/Api';

@Component({
  components: {
    Info,
    Article,
  },
})
export default class HelloWorld extends Vue {
  public articles: InterfaceArticle[] = [];
  public total: number = 0;
  public currentPage: number = 0;

  @Watch('currentPage')
  public onChildChanged(val: number, oldVal: number) {
    const { currentPage: page } = this;

    ArticlesList({ page }).then(({ data }) => {
      this.articles = data.results || [];
      this.total = data.count || 0;
    });
  }

  public mounted() {
    this.currentPage = 1;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.home-aside
  background #f9f9f9

.article--margin
  margin-bottom 20px
</style>
