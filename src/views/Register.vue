<template>
  <div>
    <div style="height: 200px"></div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="70px"
      class="register"
      size="mini"
      label-position="left"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwordValidate">
        <el-input
          v-model="ruleForm.passwordValidate"
          show-password
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { Form as ElForm } from 'element-ui';

@Component
export default class Register extends Vue {
  private ruleForm: {
    username: string;
    email: string;
    password: string;
    passwordValidate: string;
  } = {
    username: '',
    email: '',
    password: '',
    passwordValidate: '',
  };
  private rules: object = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    email: [{ required: true, type: 'email', message: '请输入正确邮箱', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    passwordValidate: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
  };

  @Action('register') register: Function;

  public submitForm(formName: string) {
    (this.$refs[formName] as ElForm).validate((isValid: boolean) => {
      if (isValid) {
        const { ruleForm } = this;

        this.register(ruleForm).then(() => {
          this.$router.push({ name: 'index' });
        });
      } else {
        return false;
      }
    });
  }

  public resetForm(formName: string) {
    (this.$refs[formName] as ElForm).resetFields();
  }
}
</script>

<style scoped lang="stylus">
.register
  width 300px
  background #fff
  padding 20px
  border-radius 4px
  box-shadow 0 2px 2px rgba(0, 0, 0, .05), 0 1px 0 rgba(0, 0, 0, .05)
  margin 0 auto
</style>
