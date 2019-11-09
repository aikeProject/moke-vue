<template>
  <div class="personal-home">
    <el-row style="height: 100%;">
      <el-col
        style="height: 100%;"
        :xl="{ span: 20, offset: 2 }"
        :lg="{ span: 20, offset: 2 }"
        :md="{ span: 20, offset: 2 }"
      >
        <el-container class="home-container">
          <el-aside class="aside-menu" :width="menuWidth">
            <div class="aside-content">
              <transition name="el-zoom-in-center">
                <el-row v-if="!isCollapse" class="user-info" type="flex" align="middle">
                  <router-link
                    style="text-align: center;"
                    :to="{ name: 'user', params: { uid: userInfo.uid } }"
                  >
                    <el-avatar class="user-info-avatar" :src="userInfo.image" @error="errorAvatar">
                      <img
                        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                        alt=""
                      />
                    </el-avatar>
                    <div class="username">{{ userInfo.username }}</div>
                  </router-link>
                </el-row>
              </transition>
              <el-menu
                default-active="1"
                style="width: 100%"
                background-color="#393d49"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
                :collapse-transition="false"
                :collapse="isCollapse"
                class="menu-container"
              >
                <el-menu-item index="1" :route="{ name: 'user', params: { uid: userInfo.uid } }">
                  <i class="el-icon-s-home"></i>
                  <span slot="title">主页</span>
                </el-menu-item>
                <el-menu-item index="2" :route="{ name: 'user', params: { uid: userInfo.uid } }">
                  <i class="el-icon-time"></i>
                  <span slot="title">时间轴</span>
                </el-menu-item>
              </el-menu>
            </div>
          </el-aside>
          <el-container class="is-vertical">
            <Header menu @on-collapse="changeCollapse"></Header>
            <el-main class="main">
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Header from '@/components/Header.vue';
import { InterfaceUserInfo } from '@/common/Interface';

@Component({
  components: { Header },
})
export default class PersonalHome extends Vue {
  @State('userInfo') userInfo: InterfaceUserInfo;
  public isCollapse: boolean = false;

  get menuWidth() {
    return this.isCollapse ? '65px' : '200px';
  }

  public errorAvatar(): boolean {
    return true;
  }

  public changeCollapse(collapse: boolean) {
    this.isCollapse = collapse;
  }
}
</script>

<style lang="stylus">
.personal-home
  .home-container
    box-shadow 0 0 30px rgba(0, 0, 0, .3)
    background #f1f3f4
    min-height 100vh

  .main
    padding 0

  .aside-menu
    overflow unset
    background #393d49
    transition width ease-in 300ms

  .aside-content
    position: sticky;
    top: 0;
    z-index: 99;
    height 100vh
    background #393d49

  .user-info-avatar
    width 100px
    height 100px
    margin-top 20px
    cursor pointer

  .username
    color #fff
    padding-top 10px
    font-size 18px
    font-weight 500
    cursor pointer

  .user-info
    flex-direction column

  .menu-container
    > li
      padding 0 10px !important
      > i
        font-size 20px

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
