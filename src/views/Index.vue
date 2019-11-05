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
            <div class="article-title">
              <router-link
                :to="{ name: 'article', params: { slug: item.slug } }"
                class="el-link el-link--default"
                style="font-size: 22px"
              >
                {{ item.title }}
              </router-link>
            </div>
          </template>
          {{ item.description }}
          <template v-slot:footer>
            <el-row type="flex" align="middle" justify="space-between">
              <div class="article-footer">
                <time>
                  <i style="padding-right: 5px;" class="el-icon-time"></i>
                  {{ item.updated_at }}
                </time>
                <i
                  v-if="item.favorite"
                  @click="favoriteDelete(item.slug)"
                  class="el-icon-star-on favorite favorite--success"
                ></i>
                <i v-else @click="favorite(item.slug)" class="el-icon-star-off favorite"></i>
                {{ item.favoritesCount }}
              </div>
              <router-link
                :to="{ name: 'article', params: { slug: item.slug } }"
                class="el-link el-link--default"
              >
                阅读全文
              </router-link>
            </el-row>
          </template>
        </Article>
      </div>
      <el-pagination
        v-show="total / 10 > 1"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="currentPage"
      ></el-pagination>
    </el-main>
    <el-aside class="aside" width="240px">
      <div class="aside-wrapper">
        <div style="height: 10px;"></div>
        <div class="title">
          <router-link :to="{ name: 'index' }">
            <el-link style="font-size: 16px;" type="primary">网站分类</el-link>
          </router-link>
        </div>
        <div class="category-list">
          <el-tree
            class="category-tree"
            :data="treeCategory"
            :props="defaultTreeProps"
            accordion
            default-expand-all
            :expand-on-click-node="false"
            @node-click="nodeClick"
          >
          </el-tree>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import Info from '@/components/Info.vue';
import Article from '@/components/Article.vue';
import {
  InterfaceArticle,
  InterfaceArticlesRequest,
  InterfaceWebCategory,
} from '@/common/Interface';
import {
  articleFavoriteCreate,
  articleFavoriteDelete,
  ArticlesList,
  webCategoryList,
} from '@/common/Api';

@Component({
  components: {
    Info,
    Article,
  },
})
export default class HelloWorld extends Vue {
  @Prop({ default: '' }) private id: string;

  public articles: InterfaceArticle[] = [];
  public total: number = 0;
  public currentPage: number = 0;
  public defaultTreeProps: any = { children: 'child', label: 'name' };
  public treeCategory: InterfaceWebCategory[] = [];

  @Watch('currentPage')
  public onChildChanged(page: number, oldVal: number) {
    this.articleList(page);
  }

  // 监听路由变化
  @Watch('$route')
  public routerChange() {
    this.articleList();
  }

  // 组件创建完成 可在这里获取数据
  public created() {
    this.articleList();

    webCategoryList().then(({ data }) => {
      this.treeCategory = data || [];
    });
  }

  public mounted() {}

  public articleList(page: number = 1) {
    page = page < 1 ? 1 : page;
    const { id } = this;

    let requestData: InterfaceArticlesRequest = { page };
    if (id) requestData.webCategoryId = id;

    ArticlesList(requestData).then(({ data }) => {
      this.articles = data.results || [];
      this.total = data.count || 0;
    });
  }

  /**
   * 收藏
   * @param article_slug
   */
  public favorite(article_slug: string) {
    articleFavoriteCreate(article_slug).then(() => {
      const { currentPage: page } = this;

      this.articleList(page);
    });
  }

  /**
   * 取消搜藏
   * @param article_slug
   */
  public favoriteDelete(article_slug: string) {
    articleFavoriteDelete(article_slug).then(() => {
      const { currentPage: page } = this;

      this.articleList(page);
    });
  }

  public nodeClick({ id }: InterfaceWebCategory) {
    this.$router.push({
      name: 'webCategory',
      params: { id: id.toString() },
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.aside
  overflow unset
  background #f9f9f9
  height calc(100vh - 52px)

.aside-wrapper
  position fixed
  top 52px
  width 240px
  height 100%
  background #f9f9f9

.article--margin
  margin-bottom 20px

time
  color #98a6ad
  font-size 12px

.article-title
  position relative

.article-footer
  font-size 12px
  color #98a6ad

.favorite
  font-size 14px
  margin-left 10px
  color #98a6ad

  &.favorite--success
    color #393d49
    font-size 14px

.category-list
  padding 10px

.category-tree
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
  border-radius 2px
  padding 5px 0

.title
  font-size 16px
  padding 10px 10px 5px 10px
</style>
