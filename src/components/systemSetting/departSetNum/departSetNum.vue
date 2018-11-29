<template>
  <div class="setnum component-container media-padding">
    <div class="setnum-search">
      <el-input v-model="params.deptname" placeholder="搜索部门名称" class="search-item item-width">
        <template slot="prepend">部门名称:</template>
      </el-input>
      <div class="btns search-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>
    <el-table stripe :data="cycleList" style="width: 100%">
      <el-table-column prop="fullname" label="部门名称">
      </el-table-column>
      <el-table-column prop="" label="已使用保a数量 / 总保A配额">
        <span slot-scope="scope">{{scope.row.dept_true_a+' / '+scope.row.dept_max_a}}</span>
      </el-table-column>
      <el-table-column prop="" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" class="xsbtn" @click.native="editCycle(scope.row.id,scope.row.dept_max_a)">编辑
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
      deptName: '',
      cycleList: [],
      params: {
        deptname: ''
      }
    }
  },
  created () {
    this._getCycleList()
  },
  methods: {
    search () {
      this._getCycleList(this.params)
    },
    reset () {
      this.params.deptname = ''
    },
    editCycle (id, num) { // 此处post请求不生效
      let that = this
      submitBox(that, {
        url: '/System/setDeptQuota.do',
        editParams: {
          number: '',
          id: id
        },
        title: '编辑部门配额',
        inputValue: num
      })
        .then(res => {
          if (res) {
            this._getCycleList(this.params)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _getCycleList (params = {}) {
      this.$get('/System/getDeptQuota.do', params).then(res => {
        if (res.data.success) {
          this.cycleList = res.data.data
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.setnum {
  .setnum-search {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    margin-top: -10px;
    .search-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 280px;
    }
  }
}
</style>
