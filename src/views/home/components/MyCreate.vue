<template>
  <div>
    blog创建热度
    <div class="my-heat" ref="myHeat"></div>
  </div>
</template>


<script>
import echarts from "@/components/Echarts";
import _axios from "@/utils/request";

export default {
  name: "MyCreate",
  data() {
    return {
      option: {
        visualMap: {
          // show: false,
          min: 0,
          left: "center", // echarts特色  居中作用
          top: 15,
          orient: "horizontal", // 水平分布  默认垂直分布
          type: "piecewise", // 分段   不加的话条状示意图连续
          color: ["#196127", "#239a3b", "#7bc96f", "#c6e48b", "#ebedf0"]
        },
        calendar: {
          range: "2019",
          left: 30,
          right: 30,
          cellSize: ["auto", 20], // 大小调整
          yearLabel: { show: false }
        },
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: []
        }
      },
      myChart: null
    };
  },
  methods: {
    getVirtulData(year) {
      year = year || "2019";
      var date = +echarts.number.parseDate(year + "-01-01");
      var end = +echarts.number.parseDate(year + "-12-31");
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time <= end; time += dayTime) {
        data.push([
          echarts.format.formatTime("yyyy-MM-dd", time),
          Math.floor(Math.random() * 100)
        ]);
      }
      return data;
    },
    initChart() {
      this.myChart = echarts.init(this.$refs.myHeat);
      this.myChart.setOption(this.option);
    }
  },
  mounted() {
    this.option.series.data = this.getVirtulData();
    this.initChart();
  }
};
</script>

<style lang='scss' scoped>
.my-heat {
  width: 100%;
  height: 420px;
}
</style>