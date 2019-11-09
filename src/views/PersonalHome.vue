<template>
  <div class="home">
    <el-row style="height: 100%;">
      <el-col
        style="height: 100%;"
        :xl="{ span: 20, offset: 2 }"
        :lg="{ span: 20, offset: 2 }"
        :md="{ span: 20, offset: 2 }"
      >
        <el-container class="home-container">
          <el-aside width="200px" class="aside">
            <div class="aside-content">
              <router-link :to="{ name: 'user', params: { uid: userInfo.uid } }">
                <el-row class="user-info" type="flex" align="middle">
                  <el-avatar class="avatar" :src="userInfo.image" @error="errorAvatar">
                    <img
                      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                      alt=""
                    />
                  </el-avatar>
                  <div class="username">{{ userInfo.username }}</div>
                </el-row>
              </router-link>
            </div>
          </el-aside>
          <el-container class="is-vertical">
            <Header></Header>
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

  public errorAvatar(): boolean {
    return true;
  }
}
</script>

<style scoped lang="stylus">
.home-container
  box-shadow 0 0 30px rgba(0, 0, 0, .3)
  background #f1f3f4
  min-height 100vh

.main
  padding 0

.aside
  overflow unset

.aside-content
  position: sticky;
  top: 0;
  z-index: 99;
  height 100vh
  background #393d49

.avatar
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
</style>
