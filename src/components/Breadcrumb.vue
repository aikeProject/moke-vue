<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in routes" :key="item.id" :to="item.to">
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Breadcrumb extends Vue {
  get routes(): { to: { name: string }; title: string; id: number }[] {
    return this.$route.matched.map((item, id) => ({
      to: { name: item.name ? item.name : 'index' },
      title: item.meta.title || '',
      id,
    }));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.breadcrumb
  background: white;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #dee5e7;
  font-size: 1.2em;
</style>
