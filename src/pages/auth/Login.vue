<template>
  <div class="login uk-text-center">
    <transition name="fade" mode="out-in">
      <div class="login-options">
        <button
          class="uk-button uk-button-primary uk-button-large"
          @click="login"
        >
          Login with Fitbit
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
// import env from '../../.env'
export default {
  name: "login",
  data() {
    return {
      // fitbitClientId: env.fitbitClientId
      fitbitClientId: "22BLCS"
    };
  },
  methods: {
    login() {
      window.location.href =
        "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BLCS&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth-callback&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";
    }
  }
};
</script>

<style scoped>
.login-options {
  margin-top: 50px;
}
</style>
