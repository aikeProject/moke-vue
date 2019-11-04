<template>
  <el-row style="height: 100%;">
    <el-col
      style="height: 100%;"
      :xl="{ span: 18, offset: 3 }"
      :lg="{ span: 18, offset: 3 }"
      :md="{ span: 18, offset: 3 }"
      :sm="{ span: 18, offset: 3 }"
    >
      <div class="editor">
        <el-row class="editor-top" type="flex" align="middle" justify="space-between">
          <el-input
            v-model="title"
            class="article-title"
            autofocus
            placeholder="请输入标题"
          ></el-input>
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
            class="editor-form"
          >
            <el-form-item label="文章标签" prop="tagsValue">
              <el-select
                v-model="ruleForm.tagsValue"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签"
                value=""
                style="width: 200px"
              >
                <el-option
                  v-for="item in tagsOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文章分类" prop="category">
              <el-select
                v-model="ruleForm.category"
                allow-create
                filterable
                placeholder="请选择文章分类"
                value=""
                style="width: 200px"
              >
                <el-option
                  v-for="item in categories"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="网站分类" prop="webCategoryValue">
              <div class="block">
                <el-cascader
                  v-model="ruleForm.webCategoryValue"
                  :options="webCategoryOptions"
                  :props="{ value: 'id', label: 'name', children: 'child', checkStrictly: true }"
                  @change="webCategoryChange"
                  style="width: 200px"
                ></el-cascader>
              </div>
            </el-form-item>
            <el-form-item label="文章描述" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Markdown from '@/components/Markdown.vue';
import { Form as ElForm } from 'element-ui';
import { InterfaceUserInfo, InterfaceWebCategory } from '@/common/Interface';
import { webCategoryList } from '@/common/Api';

@Component({
  components: {
    Markdown,
  },
})
export default class HelloWorld extends Vue {
  @State('userInfo') userInfo: InterfaceUserInfo;

  public dialogVisible: boolean = false;
  public title: string = '';
  // 网站分类
  public webCategoryOptions: InterfaceWebCategory[] = [];

  // 个人标签
  get tagsOptions() {
    return this.userInfo.blog.tags || [];
  }

  // 个人分类
  get categories() {
    return this.userInfo.blog.categories || [];
  }

  public ruleForm = {
    desc: '',
    tagsValue: [],
    category: '',
    webCategoryValue: [],
  };
  public rules = {
    desc: [{ required: true, message: '请输入文章描述', trigger: 'blur' }],
    tagsValue: [{ required: true, message: '请选择文章标签', trigger: 'change' }],
    category: [{ required: true, message: '请选择文章个人分类', trigger: 'change' }],
    webCategoryValue: [{ required: true, message: '请选择网站分类', trigger: 'change' }],
  };

  // 组件创建完成 可在这里获取数据
  public created() {
    // 获取网站分类
    webCategoryList().then(({ data }) => {
      this.webCategoryOptions = data || [];
    });
  }

  public submitForm(formName: string) {
    (this.$refs[formName] as ElForm).validate(valid => {
      const { title } = this;

      if (!title) {
        this.$notify.error({
          title: '文章标题',
          dangerouslyUseHTMLString: true,
          message: '请输入文章标题',
        });
        return false;
      }

      if (valid) {
        const { desc, tagsValue, category, webCategoryValue } = this.ruleForm;
      } else {
        return false;
      }
    });
  }

  public resetForm(formName: string) {
    (this.$refs[formName] as ElForm).resetFields();
  }

  public webCategoryChange(value: any) {
    console.log(value);
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
