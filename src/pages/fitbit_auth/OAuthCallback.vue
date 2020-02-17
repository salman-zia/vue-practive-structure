<template>
  <div class="oauth-callback">
    {{ $route.hash.access_token }}
    sdfsfsdfsdf
  </div>
</template>

<script>
export default {
  name: "oauth-callback",
  created() {
    this.setOauthInStorage();
    this.setOauthInVue();
    this.$router.push("/");
  },
  data: () => ({
    split: [],
    access_token: "",
    user_id: "",
    expires_in: ""
  }),

  methods: {
    setOauthInStorage: function() {
      this.split = this.$route.hash.replace("#", "");
      this.split = this.split.split("&");
      this.access_token = this.split[0].replace("access_token=", "");
      this.user_id = this.split[1].replace("user_id=", "");
      this.expires_in = this.split[4].replace("expires_in=", "");
      localStorage.setItem("fitbitOauthToken", this.access_token);
      localStorage.setItem("fitbitOauthExpiresIn", this.expires_in);
      localStorage.setItem("fitbitOauthAccountUserId", this.user_id);
    },
    setOauthInVue: function() {
      this.split = this.$route.hash.replace("#", "");
      this.split = this.split.split("&");
      this.access_token = this.split[0].replace("access_token=", "");
      this.user_id = this.split[1].replace("user_id=", "");
      this.expires_in = this.split[4].replace("expires_in=", "");
      this.$fitbit.token = this.access_token;
      this.$fitbit.expiresIn = this.expires_in;
      this.$fitbit.accountUserId = this.user_id;
      this.$fitbit.isLoggedIn = this.$fitbit.token !== undefined;
      this.$axios.defaults.headers.common = {
        Authorization: "Bearer " + this.$fitbit.token
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
