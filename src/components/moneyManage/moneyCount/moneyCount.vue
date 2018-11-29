<template>
  <div @click="hiddenDepartment" class="money-count component-container media-padding">
    <div class="top">
      <div class="btns top-item">
        <select-department :key="key_dept" @upDeptId="getDeptId" :title="'部门'" class="left-item"></select-department>
        <div class="left-item">
          <el-button @click.native.prevent="search" type="primary" size="mini">查 询</el-button>
        <el-button @click.native.prevent="reset" type="warning" size="mini">重 置</el-button>
        </div>
      </div>
      <div class="top-item radio">
        <el-radio-group v-model="radio" @change="radioChange">
          <el-radio-button :label="{day:7,type:'day'}">近7天</el-radio-button>
          <el-radio-button :label="{day:30,type:'day'}">近30天</el-radio-button>
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
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')
// require('echarts/lib/component/dataZoom')
require('echarts/lib/component/legend')
export default {
  data () {
    return {
      width: '1000px',
      height: '600px',
      radio: {day: 7, type: 'day'},
      dept: '',
      key_dept: '',
      dayData: [],
      xAxiasData: [],
      yAxiasData: [],
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
    this._getChartData('day', 7)
  },
  methods: {
    _getChartData (type, time, dept) {
      this.$post('/receipt.do?countbankreceipt', {
        type: type,
        dept: dept
      }).then(res => {
        this.dayData = res.data[0].data
        let arr = this.dayData.slice(this.dayData.length - (type === 'day' ? time : this.dayData.length))
        this.xAxiasData = []
        this.yAxiasData = []
        arr.forEach(val => {
          this.xAxiasData.push(val.time)
          this.yAxiasData.push(val.count)
        })
        console.log(this.xAxiasData)
        let that = this
        this.option = {
          title: {
            text: '到款数量'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: that.xAxiasData
          },
          yAxis: {
            type: 'value'
          },
          toolbox: {
            left: 'center',
            feature: {
              restore: {},
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
          series: [
            {
              data: that.yAxiasData,
              type: 'line',
              areaStyle: {}
            }
          ]
        }
        this.lineChart.setOption(this.option)
      })
    },
    radioChange (val) {
      this._getChartData(val.type, val.day, this.dept)
    },
    search () {
      this._getChartData(this.radio.type, this.radio.day, this.dept)
    },
    reset () {
      this.dept = ''
      this.key_dept = new Date() + ''
    },
    hiddenDepartment (e) {
      let tree = document.getElementById('department')
      if (tree && e.target.id !== 'dept-input') {
        tree.style.display = 'none'
      }
    },
    getDeptId (id) {
      this.dept = id
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
