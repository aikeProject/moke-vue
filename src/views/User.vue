<template>
  <div class="user-edit">
    <el-card class="box-card">
      <div slot="header">
        <span>个人资料</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { InterfaceUserInfo } from '@/common/Interface';

@Component
export default class HelloWorld extends Vue {
  @State('userInfo') userInfo: InterfaceUserInfo;
  @Prop({ default: '' }) private uid: string;

  public created() {}
}
</script>

<style lang="stylus">
.user-edit
  padding 20px
  .box-card
    max-width 500px
    min-width 335px
    margin 0 auto
</style>
