<template>
  <section>
    <article class="comments-item">
      <el-avatar :src="(comment.author || {}).image" @error="errorAvatar">
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
      </el-avatar>
      <div class="comment-right">
        <p class="comment-author">
          {{ (comment.author || {}).username }}
          {{ comment.is_own ? ' (作者) ' : '' }}
          <time>{{ comment.created_at }}</time>
          <el-link style="color: #567482;">回复</el-link>
        </p>
        <div class="comment-body" v-html="comment.body"></div>
      </div>
    </article>
    <div class="comment-child">
      <Comment
        class="comment-child--background"
        v-for="item in comment.child"
        :key="item.id"
        :comment="item"
      ></Comment>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { InterfaceCommentsResponse } from '@/common/Interface';

@Component
export default class Comment extends Vue {
  @Prop({ default: {} }) private comment: InterfaceCommentsResponse;

  public errorAvatar(): boolean {
    return true;
  }
}
</script>

<style scoped lang="stylus">
.comments-item
  display flex
  margin 5px 0
  background-color #f3f6fa
  border solid 1px #dce6f0
  border-radius 5px
  padding 10px 10px 0 5px
  .comment-right
    margin-left 10px
  .comment-author
    font-weight 500
    color #567482
    font-size 13px
    padding 5px 0
    margin 0
    > time
      color #98A6B4
      padding 0 10px
  .comment-body
    color #567482
    padding 5px 10px 10px 0

.comment-child
  padding-left 20px
</style>
