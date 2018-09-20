<template>
  <div>
    <el-tree
      :data="roleData"
      :props="roleProps"
      show-checkbox accordion :check-strictly="true"
      node-key="id" ref="tree"
      :default-checked-keys="defaultChecked"
      @check-change="checkChange">
    </el-tree>
    <div style="width:90%;text-align:right;margin-top:10px;">
      <el-button type="primary"  @click.native="savePermission">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultChecked: {
      type: Array,
      default: function () {
        return []
      }
    },
    editId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      roleData: [],
      roleProps: {
        children: 'children',
        label: 'name'
      },
      savePermissonParams: {
        'id': this.editId,
        'new': '',
        'old': ''
      }
    }
  },
  created () {
    this._getAllRolePermission()
  },
  methods: {
    // 保存按钮
    savePermission () {
      this.$post('/Roles.do?update', this.savePermissonParams).then(res => {
        if (res.data.success) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$emit('closeDialog', false)
        }
      }).catch(err => { console.log(err) })
    },
    // 选中或移除选中的回调
    checkChange (handleObj, isChecked, hasChild) {
      let newCheckedArr = this.$refs.tree.getCheckedKeys()// 所有被选中的id
      // 算出选中前后的交集
      let preChk = new Set(this.defaultChecked)
      let allChk = new Set(newCheckedArr)
      let removed = [...preChk].filter(val => !allChk.has(val))
      let newAdd = [...allChk].filter(val => !preChk.has(val))
      this.savePermissonParams.old = removed.toString()
      this.savePermissonParams.new = newAdd.toString()
    },
    _getAllRolePermission () {
      this.$post('/Permission.do?all').then(res => {
        if (res.data.success) {
          let allData = res.data.data
          this.roleData = this._transTree(allData)
        }
      })
    },
    _transTree (arr) {
      let r = []
      let hash = {}
      arr.forEach((val, key) => {
        hash[val.id] = val
      })
      for (let i = 0; i < arr.length; i++) {
        let oneData = arr[i]
        let pid = oneData.pid
        let hashVP = hash[pid]
        if (hashVP) {
          !hashVP['children'] && (hashVP['children'] = [])
          hashVP['children'].push(oneData)
        } else {
          r.push(oneData)
        }
      }
      return r
    }
  },
  components: {

  }
}
</script>

<style>

</style>
