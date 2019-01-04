<template>
  <div>
    <el-tree :data="departmentList" :props="depProps" accordion node-key="code" ref="tree" id="department" :show-checkbox="true" :default-expanded-keys="defaultChecked" :default-checked-keys="defaultChecked"></el-tree>
    <div class="confirm-tree">
      <el-button @click.native="confirm" type="primary" size="mini">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { transTree } from 'common/js/utils'
import storage from 'good-storage'
export default {
  props: {
    defaultChecked: { // 默认勾选
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      departmentList: [],
      depProps: {
        children: 'children',
        label: 'fullname'
      }
    }
  },
  created () {
    let deptList = storage.get('deptList')
    if (deptList) {
      this.departmentList = deptList
    } else {
      this._getDeptList()
    }
  },
  methods: {
    confirm () {
      let hash = {}
      let arr = []
      let checkedNodes = this.$refs.tree.getCheckedNodes()
      checkedNodes.forEach(val => {
        hash[val.code] = val
      })
      checkedNodes.forEach(item => {
        let parentcode = item.parentcode
        let hashVP = hash[parentcode]
        if (!hashVP) {
          arr.push(item.code)
        }
      })
      this.$emit('subParams', arr)
    },
    _getDeptList () {
      this.$get('/Search.do?DeptTree').then(res => {
        if (res.data.success) {
          let dept = res.data.data
          this.departmentList = transTree(dept)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.confirm-tree{
  padding-top: 5px;
  text-align: center;
}
</style>
