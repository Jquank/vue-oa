<template>
  <div @click="hiddenDepartment" class="money-count component-container media-padding">
    <div class="top">
      <div class="btns top-item">
        <select-department v-model="dept" :title="'部门'" style="display:inline-block"></select-department>
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
      </div>
      <auto-select :title="'时间'" class="top-item">
        <el-option label="7天" value="10"></el-option>
      </auto-select>
    </div>
    <div class="money-count-chart" id="money-count-chart" :style="{width:width,height:height}"></div>
  </div>
</template>

<script>
import { $post } from 'api/http'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import AutoSelect from 'base/autoSelect/autoSelect'
const Echarts = require('echarts/lib/echarts')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

require('echarts/lib/chart/line')
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
      dept: []
    }
  },
  mounted () {
    this._getChartData()
    let that = this
    let lineChart = Echarts.init(document.getElementById('money-count-chart'))
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
        type: 'time',
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
  },
  methods: {
    _getChartData () {
      $post('http://bg.baijiegroup.com/BaiJieOA/receipt.do?countbankreceipt?tk=OTA2MGBkZmEwMGNkN2UxMWQ0OGQ5OWMzNjcwMTk5MmM5NTk5ZWAxNTM1NDE2NjUwNDM0&type="day"').then(res => {

      })
    },
    setXAxis () {
      // let now = new Date()
    },
    hiddenDepartment (e) {
      let tree = document.getElementById('department')
      if (tree && e.target.id !== 'dept-input') {
        tree.style.display = 'none'
      }
    }
  },
  components: {
    SelectDepartment, AutoSelect
  }
}
</script>

<style lang="less" scoped>
.money-count{
  .top{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: -10px;
    .top-item{
      margin-top: 10px;
    }
  }
}
</style>
