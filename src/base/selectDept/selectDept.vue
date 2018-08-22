// 部门树
<template>
    <el-tree :data="departmentList" :props="depProps" accordion node-key="id" ref="tree" :expand-on-click-node="true" show-checkbox @check-change="handleCheckChange" id="department" :default-expanded-keys="defaultExpanded"></el-tree>
</template>

<script>
import { $post } from 'api/http'
export default {
  data () {
    return {
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
