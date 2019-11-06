<template>
  <div ref="wangEditor" class="wang-editor"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
import E from 'wangeditor';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  @Ref('wangEditor') readonly wangEditor!: HTMLDivElement;

  public mounted() {
    const editor = new E(this.wangEditor);
    editor.create();
    editor.txt.html('<p>用 JS 设置的内容</p>');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
