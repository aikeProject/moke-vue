<template>
  <el-header class="header" style="height: 52px;padding: 0 10px;">
    <el-row type="flex" justify="center" style="height: 100%;">
      <el-col :span="spanNo" class="hidden-xs-only">
        <el-row type="flex" justify="space-between" align="middle" style="height: 100%;">
          <div v-if="menu">
            <i
              @click="isCollapse = false"
              v-show="isCollapse"
              class="el-icon-s-fold menu-collapse"
            ></i>
            <i
              @click="isCollapse = true"
              v-show="!isCollapse"
              class="el-icon-s-unfold menu-collapse"
            ></i>
          </div>
          <router-link v-if="!menu" to="/">
            <i class="el-icon-ice-cream-round logo">&nbsp;&nbsp;moke</i>
          </router-link>
          <el-row type="flex" align="middle">
            <router-link :to="{ name: 'editor' }">
              <el-button
                class="edit-article"
                v-if="isLogin"
                size="small"
                type="primary"
                icon="el-icon-edit"
              >
                写博客
              </el-button>
            </router-link>
            <el-dropdown @command="handleCommand" v-if="isLogin" trigger="click">
              <el-avatar class="avatar" :src="userInfo.image" @error="errorAvatar">
                <img
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  alt=""
                />
              </el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="info"
                  style="font-size: 16px;"
                  icon="el-icon-edit-outline"
                >
                  个人信息
                </el-dropdown-item>
                <el-dropdown-item
                  command="out"
                  style="font-size: 16px;"
                  icon="el-icon-ice-cream-round"
                >
                  退出
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </el-row>
      </el-col>
      <el-col :span="4" class="hidden-xs-only" v-if="!isLogin">
        <el-row type="flex" justify="end">
          <router-link class="router-link" to="/login">登录</router-link>
          <router-link class="router-link" to="/register">注册</router-link>
        </el-row>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { InterfaceUserInfo } from '@/common/Interface';
import ElAvatar from 'element-ui/packages/avatar/src/main.vue';

@Component({
  components: { ElAvatar },
})
export default class Header extends Vue {
  @State('userInfo') userInfo: InterfaceUserInfo;
  @Action('logOut') logOut: Function;
  @Prop({ type: Boolean, default: false }) menu: boolean;
  public isCollapse: boolean = false;

  @Watch('isCollapse')
  changeCollapse(collapse: boolean) {
    this.onCollapse(collapse);
  }

  get isLogin() {
    return !!this.userInfo.username;
  }

  get spanNo() {
    return this.userInfo.username ? 24 : 20;
  }

  @Emit()
  onCollapse(isCollapse: boolean) {
    return isCollapse;
  }

  public errorAvatar(): boolean {
    return true;
  }

  public handleCommand(command: 'info' | 'out'): void {
    if (command === 'info') {
      const { uid } = this.userInfo;

      this.$router.push({ name: 'user', params: { uid: uid } });
    }

    if (command === 'out') {
      this.logOut().then(() => {
        this.$router.push({ name: 'login' });
      });
    }
  }
}
</script>

<style scoped lang="stylus">
.header
  height: 52px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow 0 2px 2px rgba(0, 0, 0, .05), 0 1px 0 rgba(0, 0, 0, .05)
  background #fff

.router-link
  display block
  line-height 20px
  padding 15px 5px
  color #657180
  font-size 14px

.avatar
  cursor pointer

.edit-article
  margin-right 10px

.logo
  font-size 20px
  font-style italic
  color #606266

.menu-collapse
  font-size 20px
  color #393d49
  cursor pointer
</style>
