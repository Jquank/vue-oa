// 带input的部门树
<template>
  <div class="sel-department">
    <el-input placeholder="点击选择部门" v-model="department" @focus="showDepartment" id="dept-input">
      <template v-if="prepend" slot="prepend">{{title}}:</template>
    </el-input>
    <el-tree :data="departmentList" :props="depProps" accordion node-key="code" ref="tree" :expand-on-click-node="false"
      id="department" @node-click="handleNodeClick" :default-expanded-keys="defaultExpanded"></el-tree>
  </div>
</template>

<script>
import { transTree } from 'common/js/utils'
import storage from 'good-storage'
export default {
  props: {
    title: { // prepend 文字
      type: String,
      default: '部门'
    },
    prepend: { // 是否显示prepend
      type: Boolean,
      default: true
    },
    echoDept: { // 回显部门树
      type: String,
      default: ''
    },
    resetDept: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      department: this.echoDept,
      departmentList: [],
      depProps: {
        children: 'children',
        label: 'fullname'
      },
      defaultExpanded: ['KD01'] // 默认展开
    }
  },
  watch: {
    resetDept() {
      if (this.resetDept) {
        this.department = ''
      }
    }
  },
  methods: {
    _getDeptList () {
      this.$post('/Search.do?DeptTree').then(res => {
        if (res.data.success) {
          let dept = res.data.data
          this.departmentList = transTree(dept)
          storage.set('deptList', this.departmentList)
        }
      })
    },
    handleNodeClick (data) {
      this.department = data.fullname
      this.$emit('upDeptId', data.code)
      this.defaultExpanded = [data.code]
      this.$refs.tree.$el.style.display = 'none'
    },
    showDepartment () {
      let deptList = storage.get('deptList')
      if (deptList) {
        this.departmentList = deptList
      } else {
        this._getDeptList()
      }
      this.$refs.tree.$el.style.display = 'block'
      // let paddingWidth = this.title ? 20 : 0
      // let width = this.title.length * 13 + 4 + paddingWidth + 'px' // 字体长度+冒号+padding
      // this.$refs.tree.$el.style.left = width
      // this.$refs.tree.$el.style.width = `calc(100% - ${width})`
    }

    // hiddenDepartment (e) { // 此方法已绑定至el-main上
    //   let tree = document.getElementById('department')
    //   if (tree && e.target.id !== 'dept-input') {
    //     tree.style.display = 'none'
    //   }
    // }
  }
}
</script>

<style lang="less">
.sel-department {
  width: 250px;
  position: relative;
  .el-tree {
    display: none;
    position: absolute;
    top:32px;
    // left:51px;
    // width:calc(~"(100% - 52px)");
    width:100%;
    max-height: 350px;
    overflow: auto;
    background: #F6F7FB;
    z-index: 10;
  }
}
</style>
