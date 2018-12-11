<template>
  <div class="activity component-container media-padding">
    <div>
      <el-button icon="el-icon-plus" type="success" @click.native="add('activity')">新增活动</el-button>
    </div>
    <div class="line"></div>
    <el-table stripe :data="acList" style="width: 100%">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="code_desc" label="活动名称">
      </el-table-column>
      <el-table-column prop="" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" class="xsbtn" @click.native="editName('activity',scope.row.id,scope.row.code_desc)">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt10px">
      <el-button icon="el-icon-plus" type="success" @click.native="add('pro')">新增产品</el-button>
    </div>
    <div class="line"></div>
    <el-table stripe :data="proList" style="width: 100%">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="code_desc" label="产品名称">
      </el-table-column>
      <el-table-column prop="" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" class="xsbtn" @click.native="editName('pro',scope.row.id,scope.row.code_desc)">修改
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
      acList: [],
      proList: []
    }
  },
  created () {
    this._getAcList()
  },
  methods: {
    add (type) {
      let that = this
      submitBox(that, {
        url: type === 'pro' ? '/cd.do?setRenewActivity' : '/cd.do?setRenewActivity',
        editParams: {
          code: type === 'pro' ? 38 : 67,
          name: ''
        },
        title: '编辑部门配额',
        inputValue: ''
      }).then(res => {
        if (res) {
          this._getAcList()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    editName (type, id, name) {
      let that = this
      submitBox(that, {
        url: type === 'pro' ? '/cd.do?setRenewActivity' : '/cd.do?setRenewActivity',
        editParams: {
          name: '',
          id: id
        },
        title: '编辑部门配额',
        inputValue: name
      }).then(res => {
        if (res) {
          this._getAcList()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _getAcList () {
      this.$post('/cd.do?get&code=67').then(res => {
        if (res.data.success) {
          this.acList = res.data.data
        }
      })
      this.$post('/cd.do?get&code=38').then(res => {
        if (res.data.success) {
          this.proList = res.data.data
        }
      })
    }
  },
  components: {}
}
</script>

<style>
</style>
