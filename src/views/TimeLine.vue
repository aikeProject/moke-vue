<template>
  <div class="time-line">
    <el-timeline>
      <el-timeline-item
        v-for="item in articles"
        :key="item.id"
        :timestamp="item.created_at.substring(0, 11)"
        placement="top"
        class="time-line-item"
      >
        <router-link :to="{ name: 'article', params: { slug: item.slug } }">
          <el-card>
            <h4>{{ item.title }}</h4>
            <time>{{ item.created_at }}</time>
          </el-card>
        </router-link>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { InterfaceArticle, InterfaceArticlesRequest } from '@/common/Interface';
import { ArticlesList } from '@/common/Api';

@Component
export default class HelloWorld extends Vue {
  @Prop({ default: '' }) private uid: string;

  public articles: InterfaceArticle[] = [];
  public total: number = 0;

  public created() {
    this.articleList();
  }

  public articleList(page: number = 1) {
    const { uid } = this;
    page = page < 1 ? 1 : page;

    let requestData: InterfaceArticlesRequest = { page, uid };

    ArticlesList(requestData).then(({ data }) => {
      this.articles = data.results || [];
      this.total = data.count || 0;
    });
  }
}
</script>

<style lang="stylus">
.time-line
  padding 20px
  .el-timeline
    padding 0
  .time-line-item
    cursor pointer
    max-width 600px
</style>
