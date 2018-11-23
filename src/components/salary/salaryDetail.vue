<template>
  <div class="salary-detail child-component-container media-padding">
    <div class="title">
      <el-button class="title-btn" type="primary">工资详情</el-button>
      <el-button @click.native="backRouter" class="back" type="warning">返回</el-button>
    </div>
    <div class="line"></div>
    <el-table :span-method="arraySpanMethod" :row-class-name="rowClass" :cell-class-name="cellClass" size="mini" :data="tableData" border :show-header="false">
      <el-table-column prop="name1"></el-table-column>
      <el-table-column prop="value1" width="130"></el-table-column>
      <el-table-column prop="name2"></el-table-column>
      <el-table-column prop="value2" width="130"></el-table-column>
      <el-table-column prop="name3"></el-table-column>
      <el-table-column prop="value3" width="130"></el-table-column>
      <el-table-column prop="name4"></el-table-column>
      <el-table-column prop="value4" width="130"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      salary: {},
      renew: {},
      tableData: []
    }
  },
  created () {
    console.log(this.$route.query.data)
    this.receiveData = this.$route.query.data
    if (!this.receiveData.name) {
      this.$router.go(-1)
    }
    this._getSalaryDetail(this.receiveData.SFZ, this.receiveData.month)
  },
  methods: {
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (row.name1 === '备注:' || row.name1 === '特殊备注:') {
        return [1, 8]
      }
    },
    cellClass ({row, column, rowIndex, columnIndex}) {
      if (columnIndex % 2 === 0) {
        return 'font-title'
      }
    },
    rowClass ({row, rowIndex}) {
      console.log(row)
      if (row.value1 === undefined) {
        return 'row-background'
      }
    },
    _getSalaryDetail (sfz, month) {
      let params = {
        SFZ: sfz,
        month: month
      }
      this.$post('/salary.do?searchbysfz', params).then(res => {
        this.salary = res.data[0].data[0]
        this.renew = res.data[1].data
        this.tableData = [
          {name1: '个人信息'},
          {name1: '姓名:', value1: this.salary.name, name2: '月份:', value2: this.salary.month, name3: '级别:', value3: this.salary.EX_XL, name4: '审核状态:', value4: this.salary.status === 0 ? '空' : this.salary.status === 20 ? '审核中' : '确认中'},
          {name1: '招行卡号:', value1: this.salary.EX_ZHYHK, name2: '中行卡号:', value2: this.salary.EX_ZGYHYHK},

          {name1: '续费明细'},
          {name1: this.renew[0].code_desc + ':', value1: this.salary.EX_ZQXF, name2: this.renew[1].code_desc + ':', value2: this.salary.EX_ZJXF, name3: this.renew[2].code_desc + ':', value3: this.salary.EX_JNXXLXF},
          {name1: this.renew[3].code_desc + ':', value1: this.salary.EX_JNXF, name2: this.renew[4].code_desc + ':', value2: this.salary.EX_ZTCXF},

          {name1: '薪资项目'},
          {name1: '基本工资:', value1: this.salary.EX_JBGZ, name2: '岗位工资:', value2: this.salary.EX_GWGZ, name3: '月度绩效:', value3: this.salary.EX_YDJX, name4: '季度绩效:', value4: this.salary.EX_JDJX},
          {name1: '全勤奖:', value1: this.salary.EX_QQJ, name2: '午餐补贴:', value2: this.salary.EX_WCBT, name3: '交通补贴:', value3: this.salary.EX_JTBT, name4: '通讯补贴:', value4: this.salary.EX_TXBT},
          {name1: '公积金补贴:', value1: this.salary.EX_GJJBT, name2: '加班补贴:', value2: this.salary.EX_JBBT, name3: '转正津贴:', value3: this.salary.EX_ZZJT, name4: '认证津贴:', value4: this.salary.EX_RZJT},
          {name1: '技术年资:', value1: this.salary.EX_JSNZ, name2: '季度额外激励:', value2: this.salary.EX_JDEWJL, name3: '季度补差额:', value3: this.salary.EX_JDBCE, name4: '技术津贴:', value4: this.salary.EX_JSJT},
          {name1: '职业化及企业文化建设奖金:', value1: this.salary.EX_WHJSJ, name2: '工龄工资:', value2: this.salary.EX_GLGZ, name3: '差旅补贴:', value3: this.salary.EX_CLBT, name4: '停车补贴:', value4: this.salary.EX_TCBT},
          {name1: '讲师课酬:', value1: this.salary.EX_JSKC, name2: '其它调整:', value2: this.salary.EX_QTTZ, name3: '前月拆分:', value3: this.salary.EX_QYCF, name4: '电脑补贴:', value4: this.salary.EX_DLBT},
          {name1: '考勤扣款:', value1: this.salary.EX_KQKK, name2: '其它扣款:', value2: this.salary.EX_QTKK},

          {name1: '业绩提成'},
          {name1: '续费提成:', value1: this.salary.EX_XFTC, name2: '预存款提成:', value2: this.salary.EX_YCKTC, name3: '年服务费提成:', value3: this.salary.EX_NFWFTC, name4: '网站提成:', value4: this.salary.EX_WZTC},
          {name1: '直通车提成:', value1: this.salary.EX_ZTCTC, name2: '多产品提成:', value2: this.salary.EX_DCPTC, name3: '信息流提成:', value3: this.salary.EX_XXLTC, name4: '其他产品提成:', value4: this.salary.EX_QTTC},
          {name1: '极捷号提成:', value1: this.salary.EX_JJHTC},

          {name1: '其它非现金福利'},
          {name1: '公司缴纳社保:', value1: this.salary.EX_GSSB, name2: '公司缴纳公积金:', value2: this.salary.EX_GSGJJ},

          {name1: '代扣项目'},
          {name1: '个人缴纳社保:', value1: this.salary.EX_GRSB, name2: '个人缴纳公积金:', value2: this.salary.EX_GRGJJ, name3: '税优产品:', value3: this.salary.EX_SY, name4: '个人所得税:', value4: this.salary.EX_GRSDS},

          {name1: '应发工资:', value1: this.salary.EX_YFGZ, name2: '实发工资:', value2: this.salary.EX_SFGZ},

          {name1: '备注:', value1: this.salary.remark},
          {name1: '特殊备注:', value1: this.salary.specialremark}

        ]
      })
    },
    backRouter () {
      this.$router.go(-1)
    }
  },
  components: {}
}
</script>

<style lang="less">
.el-table tr.row-background{
    background: rgb(192, 203, 238);
  }
.el-table td.font-title{
    font-weight: 600;
  }
</style>

<style lang="less" scoped>
.salary-detail {
  .title {
    display: flex;
    justify-content: space-between;
    .title-btn {
      border-top-right-radius: 15px;
    }
  }

}
</style>
