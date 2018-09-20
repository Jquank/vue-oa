<template>
  <div class="cycle component-container media-padding">
    <el-table stripe :data="cycleList" style="width: 100%">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="code_desc" label="角色名称">
      </el-table-column>
      <el-table-column prop="" label="时长">
        <span slot-scope="scope">{{scope.row.tb_field_name+''+scope.row.remark}}</span>
      </el-table-column>
      <el-table-column prop="" label="操作"  width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click.native="editCycle(scope.row.tb_field_name,scope.row.id)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import submitBox from 'base/submitBox/submitBox'
export default {
  data () {
    return {
      cycleList: []
    }
  },
  created () {
    this._getCycleList()
  },
  methods: {
    editCycle (name, id) {
      let that = this
      submitBox(that, {
        url: '/System/setTime.do',
        editParams: {
          tb_field_name: name,
          id: id
        },
        title: '编辑时长',
        inputValue: name
      }).then(res => {
        if (res) {
          this._getCycleList()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _getCycleList () {
      this.$post('/System/getTime.do').then(res => {
        if (res.data.success) {
          this.cycleList = res.data.data
        }
      })
    }
  },
  components: {}
}
</script>

<style>
</style>
