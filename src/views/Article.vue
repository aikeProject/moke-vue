<template>
  <el-main class="article markdown-wrapper">
    <Breadcrumb></Breadcrumb>
    <article class="article-main">
      <section>
        <el-row type="flex">
          <el-avatar class="avatar" :src="authorComputed.image" @error="errorAvatar">
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
      <section>
        <WangEditor></WangEditor>
      </section>
      <article></article>
    </article>
  </el-main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import showdown from 'showdown';
import { ArticlesRead } from '@/common/Api';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { InterfaceArticle } from '@/common/Interface';
import Article from '@/components/Article.vue';
import WangEditor from '@/components/WangEditor.vue';

const converter = new showdown.Converter();
converter.setFlavor('github');

@Component({
  components: { Article, Breadcrumb, WangEditor },
})
export default class HelloWorld extends Vue {
  @Prop({ default: '' }) private slug: string;
  public articleDetail: InterfaceArticle = {};

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
  }

  public beforeRouteLeave(to: any, from: any, next: any) {
    to.meta.keepAlive = true;
    next();
  }

  public errorAvatar(): boolean {
    return true;
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
</style>
