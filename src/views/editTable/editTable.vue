<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="" label="地址">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">
            <el-input v-model="scope.row.address"></el-input>
          </div>
          <span v-else>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <div slot-scope="scope">
          <el-button @click.native="edit(scope.row)" type="primary" size="mini" icon="el-icon-edit"></el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        isEdit: true
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        isEdit: true
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        isEdit: true
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        isEdit: true
      }]
    }
  },
  methods: {
    edit (index) {
      console.log(index)
    }
  },
  components: {}
}
</script>

<style>
</style>
