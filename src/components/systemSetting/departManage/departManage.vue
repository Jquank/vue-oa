<template>
  <div class="depart-manage component-container media-padding">
    <div class="wrapper">
      <div class="tree-content mr10px">
        <el-tree
          :data="departmentList"
          :props="depProps"
          @node-click="nodeClick"
          :expand-on-click-node="false"
          accordion
          node-key="code"
          ref="tree"
          id="select-user"
          :default-expanded-keys="defaultExpanded"
          style="width:300px;"
        >
          <span
            slot-scope="{ node, data }"
            class="custom-tree-node"
            @mouseenter="handleClick(node)"
            @mouseleave="flod(node)"
          >
            <span class="clicked-hook">{{ node.label }}</span>
            <span class="add-del" :ref="'x'+node.id">
              <template>
                <el-button type="text" size="mini" @click="() => append(data, node)" class="add">添加</el-button>
                <el-button type="text" size="mini" @click="() => edit(data, node)" class="edit">编辑</el-button>
                <el-button
                  v-if="node.key!=='0001'"
                  type="text"
                  size="mini"
                  @click="() => remove(data, node)"
                  class="del"
                >删除</el-button>
              </template>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="transfer">
        <div class="name-container">
          <div class="check-all">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-button @click.native="transfer" type="primary" size="mini" class="ml10px">转移至 <span class="fa fa-random"></span></el-button>
            <select-department @upDeptId="getDeptId" style="display:inline-block;" class="ml10px"></select-department>
          </div>
          <div class="check-name mt10px">
            <div class="line"></div>
            <el-checkbox-group v-model="checkedUsers" @change="handleCheckedUsersChange">
              <el-checkbox v-for="(item,index) in nameList" :key="index" :label="item.id">{{item.true_name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { transTree } from 'common/js/utils'
import storage from 'good-storage'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
const DEPT_URL = '/Search.do?DeptEmployer'
export default {
  data() {
    return {
      departmentList: [],
      depProps: {
        children: 'children',
        label: 'fullname'
      },
      defaultExpanded: ['KD01'],
      nameList: [],

      checkAll: false,
      checkedUsers: [],
      isIndeterminate: false,
      allIdArr: [],
      dept: ''
    }
  },
  created() {
    this._getDeptList()
  },
  methods: {
    transfer() {
      if (!this.checkedUsers.length) {
        this.$message.warning('请勾选要转移的人员！')
        return
      }
      if (!this.dept) {
        this.$message.warning('请选择要转移至的部门！')
        return
      }
      let params = {
        uids: this.checkedUsers.toString(),
        cd: this.dept
      }
      this.$post('/dept.do?setUserDept', params).then(res => {
        if (res.data.success) {
          setTimeout(() => {
            this.$router.go(0)
          }, 1000)
        }
      })
    },
    handleCheckAllChange(val) {
      this.checkedUsers = val ? this.allIdArr : []
    },
    handleCheckedUsersChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.allIdArr.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allIdArr.length
    },
    getDeptId(id) {
      this.dept = id
    },
    append(data, node) {
      let params = {
        cd: data.code,
        name: '新增的部门节点'
      }
      this.$post('/dept.do?addDept', params).then(res => {
        if (res.data.success) {
          this._getDeptList()
        }
      })
    },
    edit(data, node) {
      this.$prompt('', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: data.fullname || ''
      })
        .then(({ value }) => {
          if (!value) {
            this.$message.warning('请输入名称！')
            return
          }
          let params = {
            name: value,
            cd: data.code
          }
          this.$post('/dept.do?renameDept', params).then(res => {
            if (res.data.success) {
              this._getDeptList()
            }
          })
          this.$message({
            type: 'success',
            message: '已修改'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    remove(data, node) {
      this.$get(DEPT_URL, { deptcode: data.code }).then(res => {
        let list = res.data.data
        if (list.length) {
          this.$message.warning('请先转移此节点下的人员，再进行删除！')
          return
        }
        this.$confirm(`确定删除 "${data.fullname}" 吗?`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let params = {
              cd: data.code
            }
            this.$post('/dept.do?removeDept', params).then(res => {
              if (res.data.success) {
                this._getDeptList()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      })
    },
    flod(node) {
      let span = this.$refs['x' + node.id]
      span.style.width = '0'
    },
    handleClick(node) {
      let span = this.$refs['x' + node.id]
      span.style.width = '130px'
      span.style.zIndex = '1000'
    },
    _getDeptList() {
      this.$get('/Search.do?DeptTree').then(res => {
        if (res.data.success) {
          let dept = res.data.data
          this.departmentList = transTree(dept)
          storage.set('deptList', this.departmentList)
        }
      })
    },
    nodeClick(data, node, vm) {
      this.checkedUsers = []
      this.checkAll = false
      this.$get(DEPT_URL, { deptcode: data.code }).then(res => {
        this.nameList = res.data.data
        this.allIdArr = this.nameList.map(val => val.id)
      })
    }
  },
  components: {SelectDepartment}
}
</script>

<style lang="less" scoped>
.depart-manage {
  .wrapper {
    display: flex;
    .tree-content {
      display: -webkit-box;
      max-height: 650px;
      overflow: auto;
      .custom-tree-node {
        display: flex;
        flex: 1;
        align-items: center;
        font-size: 14px;
        .add-del {
          display: inline-block;
          width: 0;
          overflow: hidden;
          font-size: 14px;
          padding-left: 8px;
          z-index: 10000;
          .el-button + .el-button {
            margin-left: 2px;
          }
          .add {
            color: #67c23a;
          }
          .edit {
            color: #e6a23c;
          }
          .del {
            color: #f56c6c;
          }
          .fold-icon {
            font-size: 15px;
            width: 20px;
          }
        }
      }
    }
    .transfer {
      flex: 1;
    }
  }
}
</style>
