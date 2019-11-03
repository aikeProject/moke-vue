<template>
  <div class="markdown">
    <label class="markdown-wrapper">
      <textarea ref="markdown"></textarea>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SimpleMDE from 'simplemde';
import showdown from 'showdown';
import { asyncLoad } from '@/utils/core';

const converter = new showdown.Converter();
converter.setFlavor('github');

@Component
export default class Markdown extends Vue {
  // 组件创建完成 可在这里获取数据
  public created() {
    asyncLoad('css/markdown-theme.css', 'css');
    asyncLoad('css/github-light.css', 'css');
    asyncLoad('css/simplemde.min.css', 'css');
  }

  public mounted() {
    const simplemde = new SimpleMDE({
      element: this.$refs.markdown as HTMLTextAreaElement,
      previewRender: function(plainText) {
        return converter.makeHtml(plainText);
      },
    });

    // 默认开启预览模式
    // @ts-ignore
    // simplemde.toggleSideBySide();
  }
}
</script>

<style scoped lang="stylus">
.markdown
  min-height 100vh
  background #ffffff
</style>
