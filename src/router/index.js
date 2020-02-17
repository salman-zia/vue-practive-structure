import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/landingPage/Home.vue";
import Login from "../pages/auth/Login.vue";
import OAuthCallback from "../pages/fitbit_auth/OAuthCallback.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  beforeEach(to, from, next) {
    if (
      to.path !== "/login" &&
      (Vue.prototype.$fitbit.token === undefined ||
        Vue.prototype.$fitbit.token === null)
    ) {
      next("/login");
    }
    next();
  },
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/oauth-callback",
      name: "OAuth Callback Token",
      component: OAuthCallback
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
