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
        <el-button
          @click="commentEdit"
          icon="el-icon-edit"
          style="margin-top: 20px;"
          type="primary"
          size="small"
        >
          评论
        </el-button>
      </section>
      <Comment
        @on-reply="commentReply"
        @on-delete="commentDelete"
        v-for="item in comments"
        :key="item.id"
        :comment="item"
      ></Comment>
      <p v-if="isMore" @click="loadMore" class="comments-more">加载更多</p>
      <p v-if="isLoading" class="comments-more">
        <i style="margin-right: 5px;" class="el-icon-loading"></i>
        加载中...
      </p>
    </article>
    <el-dialog
      title="文章编辑"
      :visible.sync="dialogVisible"
      width="90%"
      class="dialog-comment-reply"
    >
      <WangEditor :body.sync="commentReplyValue" @on-change="editorChange"></WangEditor>
      <el-row type="flex" justify="end">
        <el-button
          @click="commentEdit"
          icon="el-icon-edit"
          style="margin-top: 20px;"
          type="primary"
          size="small"
        >
          评论
        </el-button>
      </el-row>
    </el-dialog>
  </el-main>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import showdown from 'showdown';
import { ArticlesRead, commentsList, commentCreate, commentDelete } from '@/common/Api';
import Breadcrumb from '@/components/Breadcrumb.vue';
import {
  InterfaceArticle,
  InterfaceCommentRequest,
  InterfaceCommentsResponse,
} from '@/common/Interface';
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
  public dialogVisible: boolean = false;
  public commentParent: number = 0;
  public commentReplyValue: string = '';

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
    // 分页
    if (this.isLoading) return;
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
    // do something
  }

  /**
   * 评论
   */
  public commentEdit() {
    const { value, slug, commentParent, commentReplyValue } = this;
    const requestData: InterfaceCommentRequest = {
      body: value,
      article: slug,
    };

    // 回复
    if (commentParent) {
      requestData.parent = commentParent;
      requestData.body = commentReplyValue;
    }

    commentCreate(requestData).then(() => {
      this.$notify.success({
        title: commentParent ? '回复' : '评论',
        dangerouslyUseHTMLString: true,
        message: commentParent ? '回复成功' : '评论成功',
      });

      this.comments = [];
      this.commentsList();
      this.dialogVisible = false;
    });
  }

  public loadMore() {
    this.page += 1;
  }

  /**
   * 回复评论
   * @param data
   */
  public commentReply(data: InterfaceCommentsResponse) {
    const { id } = data;
    this.commentParent = 0;
    this.dialogVisible = true;
    this.commentParent = id;
  }

  /**
   * 删除评论
   * @param data
   */
  public commentDelete(data: InterfaceCommentsResponse) {
    commentDelete(data.id).then(() => {
      this.$notify.success({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: '删除成功',
        duration: 1000,
        onClose: () => {
          this.comments = [];
          this.commentsList();
        },
      });
    });
  }
}
</script>

<style lang="stylus">
.article
  .article-main
    background #fff
    padding 20px 30px
    margin-top 20px
    min-height 80vh
    border 1px solid transparent
    box-shadow 0 2px 2px rgba(0, 0, 0, .05)

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

  .dialog-comment-reply
    .el-dialog
      min-width 300px
      max-width 600px

    .el-dialog__body
      padding 20px
</style>
