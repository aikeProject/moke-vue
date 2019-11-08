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
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
