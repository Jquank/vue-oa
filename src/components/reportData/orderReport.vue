<template>
  <div class="money-count component-container media-padding">
    <div class="top">
      <div class="top-item radio">
        <el-radio-group v-model="radio" @change="radioChange">
          <el-radio-button :label="{day:8,type:'day'}">近7天</el-radio-button>
          <el-radio-button :label="{day:31,type:'day'}">近30天</el-radio-button>
          <el-radio-button :label="{day:0,type:'week'}">周</el-radio-button>
          <el-radio-button :label="{day:0,type:'month'}">月</el-radio-button>
          <el-radio-button :label="{day:0,type:'quarter'}">季度</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="money-count-chart mt10px" id="money-count-chart" :style="{width:width,height:height}"></div>
  </div>
</template>

<script>
import { appMark } from 'common/js/utils'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
const Echarts = require('echarts/lib/echarts')
// todo 按需引入
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')
// require('echarts/lib/component/dataZoom')
require('echarts/lib/component/legend')
const legengData = ['收单出纳1', '收单出纳2', '收单出纳3', '收单出纳4', '加款出纳', '加款出纳2']
export default {
  data () {
    return {
      width: '1000px',
      height: '700px',
      radio: {day: 8, type: 'day'},
      dayData: [],
      xAxiasData: [],
      seriesData: [],
      y1: [],
      y2: [],
      y3: [],
      y4: [],
      y5: [],
      y6: [],
      option: {},
      lineChart: ''
    }
  },
  created () {
    if (appMark()) {
      this.width = document.documentElement.clientWidth - 15 + 'px'
      this.height = '400px'
    }
  },
  mounted () {
    this.lineChart = Echarts.init(document.getElementById('money-count-chart'))
    this._getChartData('day', 8)
  },
  methods: {
    _getChartData (type, time) {
      let arr = []
      this.xAxiasData = []
      this.seriesData = []
      this.y1 = []
      this.y2 = []
      this.y3 = []
      this.y4 = []
      this.y5 = []
      this.y6 = []
      this.$post('/Check.do?OrderReport', {
        type: type
      }).then(res => {
        this.dayData = res.data[0].data
        if (type === 'day') {
          let now = new Date()
          let beforeSeven = now.setDate(now.getDate() - time)
          arr = this.dayData.filter(val => {
            let t = new Date(val.time)
            return t.getTime() > beforeSeven
          })
        } else {
          arr = this.dayData
        }
        this.arrSort(arr)
        // 取x轴
        arr.forEach(val => {
          this.xAxiasData.push(val.time)
        })
        this.xAxiasData = [...new Set(this.xAxiasData)]
        this.xAxiasData.forEach(val => {
          this.y1.push(0)
          this.y2.push(0)
          this.y3.push(0)
          this.y4.push(0)
          this.y5.push(0)
          this.y6.push(0)
        })
        // 取series
        arr.forEach(val => {
          if (val.name === '收单出纳1') {
            let index = this.xAxiasData.findIndex(p => p === val.time)
            this.y1[index] = val.count
          }
          if (val.name === '收单出纳2') {
            let index = this.xAxiasData.findIndex(p => p === val.time)
            this.y2[index] = val.count
          }
          if (val.name === '收单出纳3') {
            let index = this.xAxiasData.findIndex(p => p === val.time)
            this.y3[index] = val.count
          }
          if (val.name === '收单出纳4') {
            let index = this.xAxiasData.findIndex(p => p === val.time)
            this.y4[index] = val.count
          }
          if (val.name === '加款出纳') {
            let index = this.xAxiasData.findIndex(p => p === val.time)
            this.y5[index] = val.count
          }
          if (val.name === '加款出纳2') {
            let index = this.xAxiasData.findIndex(p => p === val.time)
            this.y6[index] = val.count
          }
        })
        let getSum = this.xAxiasData.map((val, index) => {
          return this.y1[index] + this.y2[index] + this.y3[index] + this.y4[index] + this.y5[index] + this.y6[index]
        })
        legengData.forEach((val, index) => {
          this.seriesData.push({
            name: val,
            type: 'bar',
            stack: 'sum',
            barWidth: 25,
            data: this['y' + (index + 1)]
          })
        })
        this.seriesData.push(
          {
            name: '总计',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                offset: ['50', '80'],
                show: true,
                position: 'insideBottom',
                formatter: '{c}',
                textStyle: { color: '#000' }
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(128,128,128,0)'
              }
            },
            data: getSum
          }
        )
        let that = this
        this.option = {
          title: {
            text: '订单统计'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: legengData
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: that.xAxiasData
          },
          yAxis: {
            type: 'value'
          },
          toolbox: {
            left: 'right',
            feature: {
              // restore: {},
              saveAsImage: {}
            }
          },
          // dataZoom: [
          //   {
          //     type: 'inside',
          //     show: true,
          //     xAxisIndex: 0,
          //     filter: 'none',
          //     startValue: 5
          //   }
          // ],
          series: that.seriesData
        }
        this.lineChart.setOption(this.option)
      })
    },
    radioChange (val) {
      this._getChartData(val.type, val.day)
    },
    arrSort(arr) {
      arr = arr.sort(function(a, b) {
        let val1 = (new Date(a.tiem)).getTime()
        let val2 = (new Date(b.tiem)).getTime()
        if (val1 > val2) {
          return 1
        } else if (val1 < val2) {
          return -1
        } else {
          return 0
        }
      })
    }
  },
  components: {
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.money-count {
  .top {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    margin-top: -10px;
    .top-item{
      margin-top: 10px;
    }
    .radio{
      margin-left: -30px;
    }
    .btns{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 10px;
      .left-item{
        margin-left: 10px;
        margin-top: 10px;
      }
    }
  }
}
</style>
