import axios from "axios";
import config from "../../config/config";
import Vue from "vue";
import moment from "moment";
export default {
  //   fetchProfile({ commit }, fitbit) {
  //     Vue.prototype
  //       .$axios({
  //         url:
  //           "https://api.fitbit.com/1/user/" +
  //           fitbit.accountUserId +
  //           "/profile.json",
  //         method: "GET"
  //       })
  //       .then(function(response) {
  //         commit("setFitbitUser", response.data.user);
  //       });
  //     // .catch(function(error) {
  //     //   console.log(error.response);
  //     // });
  //   },
  fetchProfile({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.prototype
        .$axios({
          url:
            "https://api.fitbit.com/1/user/" +
            localStorage.getItem("fitbitOauthAccountUserId") +
            "/profile.json",
          method: "GET"
        })
        .then(resp => {
          resolve(resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  fetchFriends({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.prototype
        .$axios({
          url:
            "https://api.fitbit.com/1.1/user/" +
            localStorage.getItem("fitbitOauthAccountUserId") +
            "/friends.json",
          method: "GET"
        })
        .then(resp => {
          resolve(resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  fetchSleepLog({ commit }) {
    let dt = moment().format("YYYY-MM-DD");
    console.log("date15", typeof dt);
    return new Promise((resolve, reject) => {
      Vue.prototype
        .$axios({
          url:
            "https://api.fitbit.com/1.2/user/" +
            localStorage.getItem("fitbitOauthAccountUserId") +
            `/sleep/date/${dt}.json`,
          method: "GET"
        })
        .then(resp => {
          resolve(resp.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
