<template>
  <div class="charts">
    <div class="line-chart" id="line-chart" :style="{width:width,height:height}"></div>
    <div class="pie-chart" id="pie-chart" :style="{width:width,height:height}"></div>
  </div>
</template>

<script>
import { $post } from 'api/http'
const Echarts = require('echarts/lib/echarts')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
export default {
  props: {
    width: {
      type: String,
      default: '1000px'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data () {
    return {
      expected: [],
      done: [],
      pieData: []
    }
  },
  mounted () {
    let that = this
    let lineChart = Echarts.init(document.getElementById('line-chart'))
    let pieChart = Echarts.init(document.getElementById('pie-chart'))
    $post('/lineChart').then(res => {
      if (res.data.code === 0) {
        console.log(res.data)
        this.expected = res.data.expected
        this.done = res.data.done
        lineChart.setOption({
          title: {
            text: '上周业绩图'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['期望', '完成']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {
                type: 'png',
                pixelRatio: 2,
                backgroundColor: 'auto'
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '期望',
              type: 'line',
              stack: '期望',
              data: that.expected,
              smooth: true
            },
            {
              name: '完成',
              type: 'line',
              stack: '完成',
              data: that.done,
              smooth: true
            }
          ]
        })
      }
    })

    $post('/pieChart').then(res => {
      if (res.data.code === 0) {
        console.log(res.data.data)
        this.pieData = res.data.data.sort(function (a, b) { return a.value - b.value })
        pieChart.setOption({
          backgroundColor: '#2c343c',
          title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },

          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: that.pieData,
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              itemStyle: {
                normal: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200
              }
            }
          ]
        })
      }
    })
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .charts{
    background: #fff;
    padding:20px;
    .line-chart{
      margin:0 auto;
    }
    .pie-chart{
      margin:20px auto 0;
    }
  }
</style>
