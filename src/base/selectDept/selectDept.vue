// 部门树
<template>
    <el-tree :data="departmentList" :props="depProps" accordion node-key="id" ref="tree" :expand-on-click-node="true" :show-checkbox="true" @check="handleCheck" id="department" :default-expanded-keys="defaultExpanded"></el-tree>
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
          let dept = res.data.data
          this.departmentList = dept
        }
      })
    },
    handleCheck (data, val) {
      let idsArr = []
      let node = this.$refs.tree.getCheckedNodes(false, false) // 所有打钩的节点
      let treeNode = this._transTree(node) // node转化为树结构
      console.log(treeNode)
      treeNode.forEach(val => {
        idsArr.push(val.id)
      })
      console.log(idsArr)
      setTimeout(() => {
        this.$emit('sendDeptCodes', idsArr)
      }, 100)
    },
    clearChildren (arr) {
      arr.forEach(val => {
        if (val.children) {
          val.children.length = 0
        }
      })
    },
    _transTree (arr) {
      this.clearChildren(arr)
      let r = []
      let hash = {}
      arr.forEach((val, key) => {
        hash[val.code] = val
      })
      for (let i = 0; i < arr.length; i++) {
        let oneData = arr[i]
        let parentcode = oneData.code.substr(0, oneData.code.length - 5)
        let hashVP = hash[parentcode]
        if (hashVP) {
          hashVP.children.push(oneData)
        } else {
          r.push(oneData)
        }
      }
      return r
    }
  }
}
</script>

<style lang="less">
</style>
