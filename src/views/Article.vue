<template>
  <el-main class="article markdown-wrapper">
    <Breadcrumb></Breadcrumb>
    <article class="article-main">
      <section>
        <el-row type="flex">
          <el-avatar :src="authorComputed.image" @error="errorAvatar">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
          </el-avatar>
          <div class="user-info">
            <p>{{ authorComputed.username }}</p>
            <time>{{ articleDetailComputed.created_at }}</time>
          </div>
        </el-row>
      </section>
      <h1>{{ articleDetailComputed.title }}</h1>
      <main v-html="articleDetailComputed.body"></main>
      <section style="padding: 20px 0;">
        <div class="comments">评论</div>
        <WangEditor :body.sync="value" @on-change="editorChange"></WangEditor>
      </section>
      <Comment v-for="item in comments" :key="item.id" :comment="item"></Comment>
      <p v-if="isMore" @click="lodaMore" class="comments-more">加载更多</p>
      <p v-if="isLoading" class="comments-more">
        <i style="margin-right: 5px;" class="el-icon-loading"></i>
        加载中...
      </p>
    </article>
    <!--    <p>加载中...</p>-->
    <!--    <p>没有更多了</p>-->
  </el-main>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import showdown from 'showdown';
import { ArticlesRead, commentsList } from '@/common/Api';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { InterfaceArticle, InterfaceCommentsResponse } from '@/common/Interface';
import Article from '@/components/Article.vue';
import WangEditor from '@/components/WangEditor.vue';
import Comment from '@/components/Comment.vue';

const converter = new showdown.Converter();
converter.setFlavor('github');

@Component({
  components: { Article, Breadcrumb, WangEditor, Comment },
})
export default class HelloWorld extends Vue {
  @Prop({ default: '' }) private slug: string;
  public articleDetail: InterfaceArticle = {};
  public value: string = '';
  public comments: InterfaceCommentsResponse[] = [];
  public count: number = 0;
  public page: number = 1;
  public isLoading: boolean = false;

  @Watch('page')
  pageChange() {
    this.commentsList();
  }

  get isMore() {
    return this.count > 10 && !this.isLoading && !this.isNoMore;
  }

  get isNoMore() {
    return this.count < this.page * 10;
  }

  get articleDetailComputed() {
    return {
      ...this.articleDetail,
      body: converter.makeHtml(this.articleDetail.body || ''),
    };
  }

  get authorComputed() {
    return {
      ...this.articleDetail.author,
    };
  }

  public created() {
    ArticlesRead(this.slug).then(({ data }) => {
      this.articleDetail = data;
    });
    this.commentsList();
  }

  public commentsList() {
    this.isLoading = true;

    commentsList({
      article_slug: this.slug,
      page: this.page || 1,
    })
      .then(({ data }) => {
        const { results, count } = data;
        this.comments = [...this.comments, ...(results || [])];
        this.count = count;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
      });
  }

  public beforeRouteLeave(to: any, from: any, next: any) {
    to.meta.keepAlive = true;
    next();
  }

  public errorAvatar(): boolean {
    return true;
  }

  public editorChange(data: any) {
    console.log(data);
  }

  public lodaMore() {
    this.page += 1;
  }
}
</script>

<style scoped lang="stylus">
.article-main
  background #fff
  padding 20px 30px
  margin-top 20px
  min-height 80vh
  border 1px solid transparent
  box-shadow 0 2px 2px rgba(0,0,0,.05)

.user-info
  margin-left 10px
  p
    margin 0
    font-weight 500
    font-size 16px
    color #393d49
  time
    color #98a6ad

.comments
  color #8a9aa9
  font-size 20px
  font-weight 500
  padding 10px 0

.comments-more
  text-align center
  color #567482
  cursor pointer
</style>
