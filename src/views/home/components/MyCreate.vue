<template>
  <div>
    blog新建热度
    <div class="my-heat" ref="myHeat"></div>
  </div>
</template>


<script>
import echarts from 'echarts';
import _axios from '@/utils/request';

export default {
  data() {
    return {
      option: {
        visualMap: {
          show: false,
          min: 0,
          max: 100
        },
        calendar: {
          range: "2019"
        },
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: []
        }
      }
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
          Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    }
  }
};
</script>

<style lang='scss' scoped>
</style>