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
              {{ item.title }}
              <i
                v-if="item.favorite"
                @click="favoriteDelete(item.slug)"
                class="el-icon-star-on favorite favorite--success"
              ></i>
              <i v-else @click="favorite(item.slug)" class="el-icon-star-off favorite"></i>
            </div>
          </template>
          {{ item.description }}
          <template v-slot:footer>
            <el-row type="flex" align="middle" justify="space-between">
              <div>
                <time>
                  <i style="padding-right: 5px;" class="el-icon-time"></i>
                  {{ item.updated_at }}
                </time>
              </div>
              <router-link class="el-link el-link--default" to="">阅读全文</router-link>
            </el-row>
          </template>
        </Article>
      </div>
      <el-pagination
        v-if="currentPage > 1"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="currentPage"
      ></el-pagination>
    </el-main>
    <el-aside class="home-aside" width="240px">
      <div class="category-list">
        <div class="tag-title">
          <router-link to="/">
            <el-link type="primary">分类</el-link>
          </router-link>
        </div>
        <el-row class="tag-wrapper" type="flex">
          <template v-for="item in categorys">
            <router-link
              :key="item.id"
              :to="{ name: 'categoryTag', params: { name: 'category', id: item.id } }"
            >
              <el-tag class="tag">{{ item.title }}</el-tag>
            </router-link>
          </template>
        </el-row>
      </div>
      <div class="tag-list">
        <div class="tag-title">
          <router-link to="/">
            <el-link type="primary">标签</el-link>
          </router-link>
        </div>
        <el-row class="tag-wrapper" type="flex">
          <template v-for="item in tags">
            <div :key="item.id">
              <router-link
                :key="item.id"
                :to="{ name: 'categoryTag', params: { name: 'tag', id: item.id } }"
              >
                <el-tag class="tag">{{ item.title }}</el-tag>
              </router-link>
            </div>
          </template>
        </el-row>
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
  InterfaceTag,
  InterfaceCategory,
  InterfaceArticlesRequest,
} from '@/common/Interface';
import {
  articleFavoriteCreate,
  articleFavoriteDelete,
  ArticlesList,
  categoryList,
  tagList,
} from '@/common/Api';

@Component({
  components: {
    Info,
    Article,
  },
})
export default class HelloWorld extends Vue {
  @Prop({ default: '' }) private name: 'category' | 'tag';
  @Prop({ default: '' }) private id: string;
  public articles: InterfaceArticle[] = [];
  public total: number = 0;
  public currentPage: number = 0;
  public tags: InterfaceTag[] = [];
  public categorys: InterfaceCategory[] = [];

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

    tagList().then(({ data }) => {
      this.tags = data || [];
    });

    categoryList().then(({ data }) => {
      this.categorys = data || [];
    });
  }

  public mounted() {}

  public articleList(page: number = 1) {
    const { name, id } = this;

    let requestData: InterfaceArticlesRequest = { page };

    if (name === 'category') requestData.category = id;
    if (name === 'tag') requestData.tagId = id;

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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.home-aside
  background #f9f9f9

.article--margin
  margin-bottom 20px

time
  color #98a6ad
  font-size 12px

.article-title
  position relative

.favorite
  position absolute
  top 0
  right 0
  font-size 20px

  &.favorite--success
    color #393d49
    font-size 22px

.tag-list
  padding 10px

.tag
  margin-right 10px
  margin-bottom 10px
  cursor pointer

  &:hover
    background-color #393d49
    color #fff

.tag-wrapper
  flex-wrap wrap
  padding 10px 0 10px 10px

.tag-title
  font-size 16px
  padding 10px 10px 5px 10px

.category-list
  padding 10px
</style>
