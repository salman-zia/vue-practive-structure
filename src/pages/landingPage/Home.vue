<template>
  <div class="home">
    <transition name="fade" mode="out-in">
      <section class="user" v-if="show">
        <div class="uk-child-width-expand@s uk-text-center" uk-grid>
          <div>
            <div class="uk-card-body">
              <div class="profiles" uk-grid>
                <div>
                  <img class="profile" :src="user.avatar150" alt="profile" />
                  <p>
                    {{ user.fullName }}
                    <br />
                    <span
                      style="opacity: 0.7; font-size: 0.8em"
                    >member since: {{ user.memberSince }}</span>
                  </p>
                </div>
                <div>
                  <p>Gender: {{ user.gender }}</p>
                  <p>Age: {{ user.age }}</p>
                  <p>Stride Length (running): {{ user.strideLengthRunning }}</p>
                  <p>Stride Length (walking): {{ user.strideLengthWalking }}</p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <table :style="styleObject">
            <tr :style="{textAlign:'left'}">
              <th>Full Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Height</th>
              <th>Member Since</th>
              <th>Weight</th>
            </tr>
            <tr>
              <td>{{user.fullName}}</td>
              <td>{{user.age}}</td>
              <td>{{user.gender}}</td>
              <td>{{user.height}}</td>
              <td>{{user.memberSince}}</td>
              <td>{{user.weight}}</td>
            </tr>
          </table>
        </div>

        <hr class="uk-divider-icon" />
        <div class="badges">
          <div class="uk-child-width-expand@s uk-text-center" uk-grid>
            <!-- <div v-for="(badge, index) in user.topBadges">
              <img :src="badge.image125px" :alt="'badge-' + index" />
              <h5>{{ badge.shortName }}</h5>
              <p>{{ badge.marketingDescription }}</p>
            </div>-->
          </div>
        </div>
      </section>

      <div v-else>
        <div class="uk-text-center">
          <div class="uk-padding">
            <p>
              <i class="fa fa-refresh fa-spin fa-5x"></i>
            </p>
            <h3 style="opacity: 0.7">Loading fitbit user...</h3>
          </div>
        </div>
      </div>
    </transition>
    <LineChartContainer />
  </div>
</template>

<script>
import LineChartContainer from "../../components/chartContainer";
export default {
  name: "home",
  components: {
    LineChartContainer
  },

  // mounted() {
  //   this.renderChart(this.chartdata, this.options);
  // },
  watch: {
    user(val) {
      var self = this;
      if (Object.keys(val).length > 0) {
        setTimeout(function() {
          self.show = true;
        }, 1000);
      }
    }
  },
  data() {
    return {
      show: true,
      user: {},
      sleepLog: [],
      friends: [],
      styleObject: {
        width: "100%"
      }
    };
  },

  computed: {
    // user() {
    //   console.log("getters", this.$store);
    //   return this.$store.getters.fitbit.user;
    // },
    initialize() {
      this.$store
        .dispatch("fetchProfile")
        .then(data => {
          this.user = data.user;
          this.show = true;
          console.log("data", data.user);
        })
        .catch(err => {
          console.log(err);
        });
      this.$store
        .dispatch("fetchFriends")
        .then(data => {
          this.firends = data.user;
          this.show = true;
          console.log("data Friends", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.initialize();
  },
  watch: {
    user(val) {
      var self = this;
      if (Object.keys(val).length > 0) {
        setTimeout(function() {
          self.show = true;
        }, 1000);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profiles {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
img.profile {
  border: 3px solid #fff;
  border-radius: 50%;
  box-shadow: 2px 2px 5px #ccc;
}
</style>
