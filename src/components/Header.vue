<template>
  <el-header class="header" style="height: 52px;">
    <el-row type="flex" justify="center" style="height: 100%;">
      <el-col :span="spanNo" class="hidden-xs-only">
        <el-row type="flex" justify="end" align="middle" style="height: 100%;">
          <div v-if="userInfo.username" class="username">
            {{ userInfo.username }}
          </div>
          <el-dropdown v-if="!isLogin" trigger="click">
            <el-avatar class="avatar" :src="userInfo.image" @error="errorAvatar">
              <img
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                alt=""
              />
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="font-size: 16px;" icon="el-icon-edit-outline">
                个人信息
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 16px;" icon="el-icon-ice-cream-round">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
      <el-col :span="4" class="hidden-xs-only" v-if="isLogin">
        <el-row type="flex" justify="end">
          <router-link class="router-link" to="/login">登录</router-link>
          <router-link class="router-link" to="/register">注册</router-link>
        </el-row>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { InterfaceUserInfo } from '@/common/Interface';
import ElAvatar from 'element-ui/packages/avatar/src/main.vue';

@Component({
  components: { ElAvatar },
})
export default class HelloWorld extends Vue {
  @State('userInfo') userInfo: InterfaceUserInfo;

  get isLogin() {
    return !this.userInfo.username;
  }

  get spanNo() {
    return this.userInfo.username ? 24 : 20;
  }

  public errorAvatar(): boolean {
    return true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.header
  height: 52px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 99;
  box-shadow 0 2px 2px rgba(0, 0, 0, .05), 0 1px 0 rgba(0, 0, 0, .05)
  background #fff

.router-link
  display block
  line-height 20px
  padding 15px 5px
  color #657180
  font-size 14px

.username
  margin-right 10px
  cursor pointer

.avatar
  cursor pointer
</style>
