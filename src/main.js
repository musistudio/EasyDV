import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Select,
  Slider,
  Popover,
  Tabs,
  TabPane,
  InputNumber,
  Switch,
  Option,
  Tree
} from "element-ui";

Vue.use(Button)
  .use(Select)
  .use(Slider)
  .use(Popover)
  .use(Tabs)
  .use(TabPane)
  .use(InputNumber)
  .use(Switch)
  .use(Option)
  .use(Tree);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
