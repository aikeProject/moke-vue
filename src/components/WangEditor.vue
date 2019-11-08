<template>
  <div ref="wangEditor" class="wang-editor"></div>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Ref, Emit } from 'vue-property-decorator';
import E from 'wangeditor';
import XSS from 'xss';

@Component
export default class WangEditor extends Vue {
  @PropSync('body', { type: String }) private syncedBody: string;
  @Ref('wangEditor') readonly wangEditor!: HTMLDivElement;
  public editor: E;

  @Emit()
  onChange(body: string) {
    return {
      editor: this.editor,
      body: body,
      text: this.editor.txt.text(),
    };
  }

  public mounted() {
    const editor = new E(this.wangEditor);
    this.editor = editor;

    // bar
    editor.customConfig.menus = [
      'code', // 插入代码
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'list', // 列表
      'emoticon', // 表情
      'undo', // 撤销
      'redo', // 重复
    ];

    // html 即变化之后的内容
    editor.customConfig.onchange = html => {
      // @ts-ignore
      const xssBody = XSS(html);
      this.syncedBody = xssBody;
      this.onChange(xssBody);
    };

    editor.create();

    // 设置内容
    editor.txt.html(this.syncedBody);
  }
}
</script>

<style lang="stylus">
.wang-editor
  box-sizing border-box
  border-radius 5px
  .w-e-text-container
    height 150px!important
    padding 10px
    border solid 1px #dce6f0 !important
    border-top none !important
    z-index 99 !important
  .w-e-toolbar
    border solid 1px #dce6f0 !important
    background #f3f6fa!important
    display flex
    flex-wrap wrap
</style>
