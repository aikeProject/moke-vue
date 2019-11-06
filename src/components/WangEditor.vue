<template>
  <div ref="wangEditor" class="wang-editor"></div>
</template>

<script lang="ts">
import { Component, PropSync, Vue, Ref, Emit } from 'vue-property-decorator';
import E from 'wangeditor';
import XSS from 'xss';

@Component
export default class HelloWorld extends Vue {
  @PropSync('body', { type: String }) private syncedBody: string;
  @Ref('wangEditor') readonly wangEditor!: HTMLDivElement;
  public editor: E;

  @Emit()
  onChange() {
    return {
      editor: this.editor,
      body: this.syncedBody,
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
      this.syncedBody = XSS(html);
      console.log(this.syncedBody);
      this.onChange();
    };

    editor.create();

    // 设置内容
    editor.txt.html(this.syncedBody);
  }
}
</script>

<style lang="stylus">
.wang-editor
  border 1px solid #f3f6fa
  box-sizing border-box
  border-radius 5px
  .w-e-text-container
    height 150px!important
    padding 10px
</style>
