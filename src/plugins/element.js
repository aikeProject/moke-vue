// Element 额外提供了一系列类名，用于在某些条件下隐藏元素。这些类名可以添加在任何 DOM 元素或自定义组件上
import 'element-ui/lib/theme-chalk/display.css';
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import Vue from 'vue';

import {
  Button,
  Container,
  Header,
  Main,
  Row,
  Col,
  Aside,
  Form,
  FormItem,
  Input,
  Link,
  Loading,
  MessageBox,
  Notification,
  Message,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Tag,
  Tree,
  Dialog,
  Select,
  Option,
  Cascader,
  Breadcrumb,
  BreadcrumbItem,
  Popover,
  Menu,
  MenuItem,
  Tooltip,
  Timeline,
  TimelineItem,
  Card,
  Upload,
} from 'element-ui';

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Row);
Vue.use(Col);
Vue.use(Aside);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Link);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Popover);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Tooltip);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Card);
Vue.use(Upload);
Vue.use(Loading.directive);
Vue.use(CollapseTransition);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
