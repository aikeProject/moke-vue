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
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
