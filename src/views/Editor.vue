<template>
  <div class="editor">
    <el-row class="editor-top" type="flex" align="middle" justify="space-between">
      <el-input v-model="title" class="article-title" autofocus placeholder="请输入标题"></el-input>
      <el-button @click="dialogVisible = true" size="small" type="primary" icon="el-icon-edit">
        保存
      </el-button>
    </el-row>
    <Markdown></Markdown>
    <el-dialog title="文章编辑" :visible.sync="dialogVisible" width="40%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        size="mini"
        class="demo-ruleForm"
      >
        <el-form-item label="文章描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Markdown from '@/components/Markdown.vue';
import { Form as ElForm } from 'element-ui';

@Component({
  components: {
    Markdown,
  },
})
export default class HelloWorld extends Vue {
  public dialogVisible: boolean = false;
  public title: string = '';
  public ruleForm = {
    desc: '',
    resource: '',
  };
  public rules = {
    desc: [{ required: true, message: '请输入文章描述', trigger: 'blur' }],
  };

  public submitForm(formName: string) {
    (this.$refs[formName] as ElForm).validate(valid => {
      if (valid) {
        // do something
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

<style lang="stylus">
.editor
  min-height 100vh
  background #FFFFFF

  .editor-top
    height 52px
    padding-right 10px

.article-title
  input
    border none
    color #393d49
    font-size 18px
</style>
