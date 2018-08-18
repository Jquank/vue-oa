<template>
  <el-dialog title="编辑部门" :visible.sync="isShow" width="350px">
      <el-tree :data="departmentList" :props="depProps" accordion node-key="id" ref="tree" :expand-on-click-node="true" show-checkbox @check-change="handleCheckChange" id="department" :default-expanded-keys="defaultExpanded"></el-tree>
  </el-dialog>
</template>

<script>
import { $post } from 'api/http'
export default {
  watch: {
    showDeptTree (newVal) {
      this.isShow = !!newVal // 此处从父组件传一个随机数即可
    }
  },
  props: {
    showDeptTree: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isShow: false,
      departmentList: [],
      depProps: {
        children: 'children',
        label: 'name'
      },
      defaultExpanded: ['KD01']
    }
  },
  mounted () {
    this._getDeptList()
  },
  methods: {
    _getDeptList () {
      $post('/Department/DepartmentTreeGet').then(res => {
        if (res.data.status === 1) {
          this.departmentList = res.data.data
        }
      })
    },
    handleCheckChange (data) {}
  }
}
</script>

<style lang="less">
</style>
