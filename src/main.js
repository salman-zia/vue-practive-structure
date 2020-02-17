import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import Router from "./router/index";
Vue.config.productionTip = false;
Vue.prototype.$fitbit = {
  token: window.localStorage.getItem("fitbitOauthToken"),
  expiresIn: window.localStorage.getItem("fitbitOauthExpiresIn"),
  accountUserId: window.localStorage.getItem("fitbitOauthAccountUserId"),
  isLoggedIn: window.localStorage.getItem("fitbitOauthToken") !== undefined
};

import axios from "axios";
Vue.prototype.$axios = axios;

if (Vue.prototype.$fitbit.token !== undefined) {
  Vue.prototype.$axios.defaults.headers.common = {
    Authorization: "Bearer " + Vue.prototype.$fitbit.token
  };
}
new Vue({
  router: Router,
  store,
  render: h => h(App)
}).$mount("#app");
