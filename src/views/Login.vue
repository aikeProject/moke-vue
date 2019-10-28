<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="70px"
    class="login"
    size="mini"
    label-position="left"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item style="margin-bottom: 0;">
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-link @click="toLogin" class="register-link">注册 ></el-link>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Form as ElForm } from 'element-ui';

@Component
export default class Register extends Vue {
  private ruleForm: {
    email: string;
    password: string;
  } = {
    email: '',
    password: '',
  };
  private rules: object = {
    email: [{ required: true, type: 'email', message: '请输入正确邮箱', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };

  public submitForm(formName: string) {
    (this.$refs[formName] as ElForm).validate((isValid: boolean) => {
      if (isValid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  public toLogin(): void {
    this.$router.push({ path: 'register' });
  }
}
</script>

<style scoped lang="stylus">
.login
  width 300px
  background #fff
  padding 20px
  border-radius 4px
  box-shadow 0 2px 2px rgba(0, 0, 0, .05), 0 1px 0 rgba(0, 0, 0, .05)
  margin 200px auto

.register-link
  margin-left 130px
</style>
