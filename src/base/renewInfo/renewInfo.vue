
// 续费详情
<template>
  <div class="renew-info">
    <el-table :data="renewData" :span-method="arraySpanMethod" :header-cell-class-name="headerStyle" :cell-style="cellStyle" border style="width: 100%">
      <el-table-column prop="name1" label="续费信息" width="100">
      </el-table-column>
      <el-table-column prop="companyname" label="2">
      </el-table-column>
      <el-table-column prop="name2" label="3">
      </el-table-column>
      <el-table-column prop="addtype" label="4">
      </el-table-column>
      <el-table-column prop="name3" label="5">
      </el-table-column>
      <el-table-column prop="proType" label="6">
      </el-table-column>
      <el-table-column prop="name4" label="7">
      </el-table-column>
      <el-table-column prop="addCount" label="8">
      </el-table-column>
    </el-table>
    <hr/>
    <el-table :data="renewData" :span-method="arraySpanMethod" :header-cell-class-name="headerStyle2" :cell-style="cellStyle"  border style="width: 100%">
      <el-table-column prop="name1" label="实际到款" width="100">
      </el-table-column>
      <el-table-column prop="companyname" label="2">
      </el-table-column>
      <el-table-column prop="name2" label="代金券">
      </el-table-column>
      <el-table-column prop="addtype" label="4">
      </el-table-column>
      <el-table-column prop="name3" label="现金券">
      </el-table-column>
      <el-table-column prop="proType" label="6">
      </el-table-column>
      <el-table-column prop="name4" label="申请加款">
      </el-table-column>
      <el-table-column prop="addCount" label="8">
      </el-table-column>
    </el-table>
    <hr/>
    <el-table :data="renewData" :header-cell-class-name="headerStyle" :cell-style="cellStyle" border style="width: 100%">
      <el-table-column prop="name1" label="续费信息" width="100">
      </el-table-column>
      <el-table-column prop="companyname" label="2">
      </el-table-column>
      <el-table-column prop="name2" label="3">
      </el-table-column>
      <el-table-column prop="addtype" label="4">
      </el-table-column>
      <el-table-column prop="name3" label="5">
      </el-table-column>
      <el-table-column prop="proType" label="6">
      </el-table-column>
      <el-table-column prop="name4" label="7">
      </el-table-column>
      <el-table-column prop="addCount" label="8">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      companyname: '开发机构的时刻开始的',
      renewData: [
        {
          name1: '客户名称',
          companyname: '',
          name2: '续费类型',
          addtype: '',
          name3: '活动类型',
          proType: '',
          name4: '续费次数',
          addCount: ''
        },
        {
          name1: '百度账号',
          companyname: '',
          name2: '百度ID',
          addtype: '',
          name3: '代理账号',
          proType: '',
          name4: '续费次数',
          addCount: ''
        },
        {
          name1: '服务费月份',
          companyname: '0',
          name2: '假期加款',
          addtype: '否',
          name3: '活动类型',
          proType: '',
          name4: '续费次数',
          addCount: ''
        }
      ]
    }
  },
  methods: {
    headerStyle ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 0) {
        return 'renewHeaderClass'
      } else {
        return 'renewTitleClass'
      }
    },
    headerStyle2 ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex % 2 === 1) {
        return 'renewHeaderClass'
      } else {
        return 'moneyTitleClass'
      }
    },
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'border-top: 1px solid #ebeef5'
      }
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        if (columnIndex === 5) {
          return [1, 3]
        } else if (columnIndex === (6 || 7)) {
          return [0, 0]
        }
      }
      if (rowIndex === 2) {
        if (columnIndex === 3) {
          return [1, 5]
        } else if (
          columnIndex === 4 ||
          columnIndex === 5 ||
          columnIndex === 6 ||
          columnIndex === 7
        ) {
          return [0, 0]
        }
      }
    }
  },
  components: {}
}
</script>

<style>
  .renewHeaderClass{
    opacity: 0;
  }
  .renewTitleClass{
    background: #409EFF !important;
    color: #fff;
    border-radius: 3px;
    border-top-right-radius: 15px;
  }
  .moneyTitleClass{
    background: #E6A23C !important;
    color: #fff;
    border-radius: 3px;
    border-top-right-radius: 15px;
  }
</style>

<style lang="less" scoped>
</style>
