<template>
  <div class="editor">
    <Markdown></Markdown>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Markdown from '@/components/Markdown.vue';

@Component({
  components: {
    Markdown,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
