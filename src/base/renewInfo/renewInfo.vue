
// 续费详情
<template>
  <div class="renew-info">
    <div class="renew-title">
      <el-button type="primary">续费信息</el-button>
    </div>
    <el-table :data="renewData" :span-method="arraySpanMethod" :show-header="false" border style="width: 100%">
      <el-table-column prop="name1" label="1" width="180">
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
          name2: '续费类型',
          addtype: '',
          name3: '活动类型',
          proType: '',
          name4: '续费次数',
          addCount: ''
        }
      ]
    }
  },
  methods: {
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        if (columnIndex === 5) {
          return [1, 3]
        } else if (columnIndex === (6 || 7)) {
          return [0, 0]
        }
      }
      if (rowIndex === 2) {
        if (columnIndex === 1) {
          return [1, 7]
        } else if (columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6 || columnIndex === 7) {
          return [0, 0]
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
  .renew-title{
    .el-button{
      border-radius: 2px;
      border-top-right-radius: 10px;
    }
  }
</style>
