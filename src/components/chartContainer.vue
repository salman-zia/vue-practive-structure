<template>
  <div>
    <div class="container">
      <!-- <line-chart v-if="loaded" :chartdata="chartdata" :options="options" /> -->
      <div class="ct-chart" id="chart"></div>
      <br />
    </div>
    <div class="legendsDiv">
      <div class="legends">Deep:{{ summary.deep }}</div>
      <div class="legends">Light:{{ summary.light }}</div>
      <div class="legends">Rem:{{ summary.rem }}</div>
    </div>.
    <BarChart :chartdata="barChartData" :options="options" />
  </div>
</template>

<script>
import Chartist from "chartist";

import BarChart from "./barChart.vue";
import moment from "moment";
export default {
  name: "LineChartContainer",

  components: { BarChart },
  data: () => ({
    loaded: false,
    chartdata: null,
    sleepLog: { x: 3, y: 50 },
    summary: {},
    labelsArr: [],
    options: {
      responsive: false
    },
    barChartData: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: "#f87979",
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    }
  }),
  computed: {
    log() {
      return this.summary;
    }
  },
  async mounted() {
    this.loaded = false;
    this.$store
      .dispatch("fetchSleepLog")
      .then(data => {
        this.summary = data.summary.stages;
        this.sleepLog = data.sleep[0]["levels"].data.map(log => {
          // return {
          //   x: parseInt(moment(log.dateTime).format("HH.MM")),
          //   y: parseInt(log.seconds)
          // };
          if (log.level === "wake") {
            return 400;
          } else if (log.level === "light") {
            return 200;
          } else if (log.level === "rem") {
            return 300;
          } else if (log.level === "deep") {
            return 100;
          }
        });
        this.labelsArr = data.sleep[0]["levels"].data.map(log =>
          moment(log.dateTime).format("HH:MM")
        );
        // this.sleepLog = [{ x: 1, y: 100, x: 2, y: 40 }];
        console.log("data 123", this.sleepLog);
        new Chartist.Line(
          ".ct-chart",
          {
            labels: this.labelsArr,

            series: [this.sleepLog]
            // series: [
            //   [
            //     { x: 0, y: 50 },
            //     { x: 1, y: 25 },
            //     { x: 2, y: 12.5 }
            //     // { x: 3, y: 6.25 },
            //     // { x: 4, y: 6.25 },
            //     // { x: 0, y: 6.25 },
            //     // { x: 2, y: 6.25 },
            //     // { x: 3, y: 6.25 }
            //   ]
            // ]
          },

          {
            height: 400,

            axisX: {
              labelInterpolationFnc: function skipLabels(value, index, labels) {
                if (labels.length > 20) {
                  return index % 5 === 0
                    ? moment(value, "H:MM").format("HH:00")
                    : null;
                } else {
                  return moment(value, "H:MM").format("HH:00");
                }
              }
            },
            axisY: {
              position: "start",
              labelInterpolationFnc: function(value) {
                if (value === 100) {
                  return "Deep";
                } else if (value === 200) {
                  return "Light";
                } else if (value === 300) {
                  return "Rem";
                } else if (value === 400) {
                  return "Awake";
                }
              }
            },

            lineSmooth: Chartist.Interpolation.step(),
            showPoint: false,
            showLabel: true
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
    // Our labels and three data series
    console.log("sleep", this.sleepLog);
  }
};
</script>
<style lang="scss">
@import "~chartist/dist/scss/chartist";

.legendsDiv {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
}
.legends {
  margin-right: 20px;
}
.ct-vertical {
  ~ .ct-vertical {
    stroke: none;
  }
}
.ct-horizontal {
  ~ .ct-horizontal {
    stroke: none;
  }
}
.ct-chart {
  // position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  padding: 0;
  z-index: -1;
}
.ct-line {
  fill: none;
  stroke-width: 20px;
  /* stroke-linecap: round; */
  stroke-linejoin: round;
}
.ct-series-a .ct-point,
.ct-series-a .ct-line,
.ct-series-a .ct-bar,
.ct-series-a .ct-slice-donut {
  stroke: #3274e8;
}
.ct-label {
  fill: white;
  color: white;
  font-size: 0.75rem;
  line-height: 1;
}
.ct-chart {
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  padding: 0;
  z-index: -1;
  background-color: #1c1939;
}
</style>
