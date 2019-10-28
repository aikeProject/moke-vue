# moke-vue

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### prettier 代码格式化

- 创建`.prettierrc`配置文件

```
/*  prettier的配置 */
"printWidth": 100, // 超过最大值换行
"tabWidth": 4, // 缩进字节数
"useTabs": false, // 缩进不使用tab，使用空格
"semi": true, // 句尾添加分号
"singleQuote": true, // 使用单引号代替双引号
"proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
"arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
"bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
"disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
"endOfLine": "auto", // 结尾是 \n \r \n\r auto
"eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
"htmlWhitespaceSensitivity": "ignore",
"ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
"jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
"jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
"parser": "babylon", // 格式化的解析器，默认是babylon
"requireConfig": false, // Require a 'prettierconfig' to format prettier
"stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
"trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
"tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
```

- 保存时，配合`webstorm`使用，使用`prettier`格式化代码

```
找到webstorm设置，新建一个prettier的监听修改

  setting -> Tools -> Files Watchers

```

### 使用`prettier`格式化代码，并使用`eslint`修复

- `husky` 代码`commit`和`push`之前做一些事情

```
npm i husky -D
```

- `lint-staged` 对匹配文件运行一些代码检查或修复工作

```
npm i lint-staged -D
```

- `husky`与`lint-staged`结合使用，完善工作流

```
修改package.json文件，添加配置

  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,vue,js}": [
      "prettier --write",
      "vue-cli-service lint",
      "git add"
    ],
    "*.{css,md}": [
      "prettier --write",
      "git add"
    ]
  },

```

### element 自定制主题

- npm i element-theme -g
- npm i element-theme-chalk -D
- et -i 初始化变量文件，element-variables.scss，修改其中的变量
- et 编译主题，当前目录下生产 theme 文件夹
- 按需引入组件主题

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "~theme"
      }
    ]
  ]
}
```

### `Typescript`在 vue 项目中的使用

```
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { ajaxPost, ajaxGet } from "@/utils/util.js";
@Component
export default class FirstPage extends Vue {
    // props
    @Prop([String, Boolean]) private propMessage;
    @Prop(Number) private propA!: number;
    @Prop({ default: 'default value' }) private propB!: string;
    // 初始化 data
    private msg: number = 123;
    private helloMsg = "Hello, " + this.propMessage;
    private emitMsg: string  = "This is emitMsg";
    // watch
    @Watch('msg')
    public onChildChanged(val: number, oldVal: number) {
        if (val > 6) {
            console.log('msg is changed');
        }
    }
    // computed
    get computedMsg() {
        return "computed " + this.msg;
    }
    // 生命周期钩子
    public beforeCreate() {
        console.log('beforeCreate');
    }
    public created() {
        this.sayMsg();
    }
    public beforeMount() {
        console.log('beforeMount');
    }
    public mounted() {
        this.greet();
    }
    public beforeUpdate() {
        console.log('beforeUpdate');
    }
    public updated() {
        console.log('updated');
    }
    public beforeDestroy() {
        console.log('beforeDestroy');
    }
    public destroyed() {
        console.log('destroyed');
    }
    // methods
    public sayMsg() {
        console.log('created');
    }
    public showEmit() {
        this.greetEmit(this.emitMsg);
    }
    @Emit()
    public greetEmit(msg: string) {
        console.log('emit');
    }
    public greet() {
        console.log("mounted - greeting: " + this.msg);
    }
}
</script>

```
