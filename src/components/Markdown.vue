<template>
  <div class="markdown">
    <label class="markdown-wrapper">
      <textarea ref="markdown"></textarea>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from 'vue-property-decorator';
import SimpleMDE from 'simplemde';
import showdown from 'showdown';
import { asyncLoad } from '@/utils/core';

const converter = new showdown.Converter();
converter.setFlavor('github');

@Component
export default class Markdown extends Vue {
  @PropSync('value', { type: String }) private syncedValue: string;

  public simplemde: any = null;
  // 组件创建完成 可在这里获取数据
  public created() {
    asyncLoad('css/markdown-theme.css', 'css');
    asyncLoad('css/github-light.css', 'css');
    asyncLoad('css/simplemde.min.css', 'css');
  }

  public mounted() {
    const simplemde = (this.simplemde = new SimpleMDE({
      element: this.$refs.markdown as HTMLTextAreaElement,
      autosave: {
        enabled: true,
        delay: 1000 * 10,
        uniqueId: 'MARKDOWN_SAVE',
      },
      // 自定义解析器，解析markdown数据
      previewRender: function(plainText) {
        return converter.makeHtml(plainText);
      },
    }));

    // 默认开启预览模式
    // @ts-ignore
    // simplemde.toggleSideBySide();

    simplemde.value(this.syncedValue);
    simplemde.codemirror.on('change', () => {
      this.syncedValue = simplemde.value();
    });
  }

  public destroyed() {
    this.simplemde && this.simplemde.clearAutosavedValue();
  }
}
</script>

<style scoped lang="stylus">
.markdown
  background #ffffff
</style>
