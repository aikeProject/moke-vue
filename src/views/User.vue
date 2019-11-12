<template>
  <div class="user-edit">
    <el-card class="box-card">
      <div slot="header">
        <span>个人资料</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="register"
        size="small"
        label-position="left"
      >
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-change="changeAvatar"
            :auto-upload="false"
          >
            <img v-if="imageUrlComputed" :src="imageUrlComputed" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="博客标题" prop="title">
          <el-input v-model="ruleForm.blog.title" placeholder="请输入博客标题"></el-input>
        </el-form-item>
        <el-form-item label="博客签名" prop="site_name">
          <el-input v-model="ruleForm.blog.site_name" placeholder="请输入博客标签"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { InterfaceUserInfo } from '@/common/Interface';
import { ElForm } from 'element-ui/types/form';
import { ElUploadInternalFileDetail } from 'element-ui/types/upload';

@Component
export default class User extends Vue {
  @State('userInfo') userInfo: InterfaceUserInfo;
  @Action('userUpdate') userUpdate: Function;
  @Prop({ default: '' }) private uid: string;
  private imageUrl: string = '';
  private imageFile: File;
  private ruleForm = {
    username: '',
    blog: {
      title: '',
      site_name: '',
    },
  };

  get imageUrlComputed(): string {
    return this.imageUrl || this.userInfo.image;
  }

  private rules: object = {
    username: [{ message: '请输入用户名', trigger: 'blur' }],
  };

  public created() {
    const { username, blog } = this.userInfo;
    const { title, site_name } = blog || { title: '', site_name: '' };
    this.ruleForm = { username, blog: { title, site_name } };
  }

  public submitForm(formName: string) {
    (this.$refs[formName] as ElForm).validate((isValid: boolean) => {
      if (isValid) {
        const { imageFile } = this;
        const { username, blog } = this.ruleForm;
        const { title, site_name } = blog;

        this.userUpdate({ username, image: imageFile, blog: { title, site_name } });
      } else {
        return false;
      }
    });
  }

  changeAvatar(file: ElUploadInternalFileDetail) {
    const fileData = file.raw;
    const isLt2M = fileData.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      // @ts-ignore
      this.$message.error('上传头像图片大小不能超过 2MB!');
      return;
    }

    this.imageFile = fileData;
    this.imageUrl = URL.createObjectURL(fileData);
  }
}
</script>

<style lang="stylus">
.user-edit
  padding 20px

  .box-card
    max-width 500px
    min-width 335px
    margin 0 auto

  .avatar-uploader
    .el-upload
      border 1px dashed #d9d9d9
      border-radius 6px
      cursor pointer
      position relative
      overflow hidden

  .avatar-uploader .el-upload:hover
    border-color #409EFF

  .avatar-uploader-icon
    font-size 28px
    color #8c939d
    width 100px
    height 100px
    line-height 100px
    text-align center

  .avatar
    width 100px
    height 100px
    display block
</style>
