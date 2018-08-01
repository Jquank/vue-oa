<template>
  <div class="charts">
    <div class="line-chart" id="line-chart" :style="{width:width,height:height}">

    </div>
  </div>
</template>

<script>
import { $post } from 'api/http'
// import  from './chartsMock'
const Echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: {
    width: {
      type: String,
      default: '800px'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data () {
    return {

    }
  },
  created () {
    $post('lineChart').then(res => {
      console.log(res)
    })
  },
  mounted () {
    let lineChart = Echarts.init(document.getElementById('line-chart'))
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
          data: [230, 152, 230, 230, 190, 330, 380],
          smooth: true
        },
        {
          name: '完成',
          type: 'line',
          stack: '完成',
          data: [220, 182, 191, 234, 290, 330, 310],
          smooth: true
        }
      ]
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
    display: flex;
    justify-content: center;
    .line-chart{
    }
  }
</style>
