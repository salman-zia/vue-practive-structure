/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

import Vue from "vue";
// import Vuetify from "vuetify";
import Routes from "./router/index";

import App from "./App.vue";
import store from "./store/index";
// Vue.use(Vuetify);
const app = new Vue({
  el: "#app",
  router: Routes,
  store,
  //   vuetify: new Vuetify({}),
  render: h => h(App)
});

export default app;
