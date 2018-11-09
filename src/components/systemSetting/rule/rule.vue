<template>
  <div class="rule component-container media-padding">
    <div style="padding-left: 300px;">
      <el-popover
      :offset="10"
      placement="bottom"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button slot="reference">click 激活</el-button>
    </el-popover>
    </div>

    <el-table :data="tableData2" style="width: 100%">
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="" label="权限名称">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding-bottom:5px;">
      <el-button @click.native="addRule" size="mini" type="primary" icon="fa fa-plus"> 新 增</el-button>
      <el-button @click.native="backWard" size="mini" type="primary" icon="fa fa-step-backward"> 返回上一级</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="权限名称"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleCheckNext(scope.row.id)">查看下级权限</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.id,scope.row.name,scope.row.pid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="ccc">
      <el-slider  class="bb"
      v-model="value9"
      show-stops
      :max="10">
    </el-slider>
      <el-slider  class="aa"
      v-model="value8"
      show-stops
      :max="10">
    </el-slider>
     <el-slider
      v-model="value7"
      :step="10"
      show-stops>
    </el-slider>
    </div>
  </div>
</template>

<script>
import submitBox from 'base/submitBox/submitBox'
export default {
  data () {
    return {
      value7: 5,
      value8: 50,
      value9: 100,
      tableData: [],
      lastPid: '',
      tableData2: [
        {
          name: 'tom', age: 18
        },
        {
          name: 'jack', age: 30
        }
      ]
    }
  },
  watch: {
    tableData2: {
      handler: function () {
        console.log(123)
      },
      deep: true
    }
  },
  created () {
    this._getRuleList()
  },
  methods: {
    _getRuleList (pid, url = '/Permission.do?get') {
      let params = {
        permission: pid
      }
      this.$post(url, pid ? params : {}).then(res => {
        if (res.data.success) {
          this.tableData = res.data.data
          this.lastPid = res.data.data[0].pid
        }
      })
    },
    handleCheckNext (pid) {
      this.lastPid = pid
      this._getRuleList(pid)
    },
    handleEdit (id, preName, pid) {
      let that = this
      // 编辑弹窗
      submitBox(that, {
        url: '/Permission.do?update',
        editParams: {
          name: '',
          id: id
        },
        title: '编辑权限名称',
        inputValue: preName
      }).then(res => {
        if (res) {
          this._getRuleList(this.lastPid)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addRule (pid) {
      let that = this
      submitBox(that, {
        url: '/Permission.do?set',
        editParams: {
          name: '',
          permission: ''
        },
        title: '新增权限名称',
        inputValue: ''
      }).then(res => {
        if (res) {
          this._getRuleList(this.lastPid)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    backWard () {
      this._getRuleList(this.lastPid, '/Permission.do?back')
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.ccc{
  .bb{
    position: relative;
    top: 76px;
    left: 0;
  }
  .aa{
      position: relative;
      top: 38px;
      left: 0;
    }
}
</style>
