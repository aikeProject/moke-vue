<template>
  <article class="comments-item">
    <el-avatar :src="(comment.author || {}).image" @error="errorAvatar">
      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" />
    </el-avatar>
    <div class="comment-right">
      <p class="comment-author">
        {{ (comment.author || {}).username }} <time>{{ comment.created_at }}</time>
      </p>
      <div class="comment-body" v-html="comment.body"></div>
    </div>
  </article>
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
  .comment-right
    margin-left 5px
  .comment-author
    color #567482
    font-size 13px
    padding 5px 0
    margin 0
    > time
      color #98A6B4
  .comment-body
    color #567482
    padding 5px 10px 10px 0
</style>
