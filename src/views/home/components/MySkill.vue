<template>
  <div class="skill-chart-box">
    <div id="mySkill"></div>
  </div>
</template>


<script>
import echarts from "echarts";
import _axios from "@/utils/request"
export default {
  name: "MySkill",
  data() {
    return {
      option: {
        backgroundColor: "#fff",
        title: {
          text: "技能及掌握程度",
          left: "center",
          top: 20,
          textStyle: {
            color: "#444"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        visualMap: {
          show: false,
          min: 0,
          max: 120,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "职业技能",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [],
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "rgba(0, 0, 0, 0.7)"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(0, 0, 0, 0.7)"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: "#0084ff",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      },
      seriesData: null
    };
  },
  methods: {
    getSeriesData() {
      _axios.get('/resume/skill').then(res => {
        if(res.data.data.skillList.length == 0) return;
        let skillData = res.data.data.skillList;
        let skillSeries = skillData.map(it => {
          return {
            value: it.skillProgress,
            name: it.skillName,
          }
        })

        this.seriesData = skillSeries;
        this.option.series[0].data = this.seriesData;
        this.initChart();
      })
    },
    initChart() {
      this.mChart = echarts.init(document.querySelector('#mySkill'));
      this.mChart.setOption(this.option)
    }
  },
  created() {
    this.getSeriesData();
  },
  mounted() {
    // this.initChart();
  }
};
</script>

<style lang='scss' scoped>
.skill-chart-box {
  height:100%;
}
#mySkill {
  width:100%;
  height: 100%
}
</style>