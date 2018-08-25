// 带input的部门树
<template>
  <div class="sel-department"  style="width:300px">
    <el-input placeholder="点击选择部门" v-model="department" @focus="showDepartment" id="dept-input">
      <template v-if="prepend" slot="prepend">{{title}}:</template>
    </el-input>
    <el-tree :data="departmentList" :props="depProps" accordion node-key="id" ref="tree" :expand-on-click-node="false"
      id="department" @node-click="handleNodeClick" :default-expanded-keys="defaultExpanded"></el-tree>
  </div>
</template>

<script>
export default {
  props: {
    title: { // prepend 文字
      type: String,
      default: ''
    },
    prepend: { // 是否显示prepend
      type: Boolean,
      default: true
    },
    echoDept: { // 回显部门树
      type: String,
      default: ''
    }
  },
  data () {
    return {
      department: this.echoDept,
      departmentList: [],
      depProps: {
        children: 'children',
        label: 'name'
      },
      defaultExpanded: ['KD01'] // 默认展开
    }
  },
  methods: {
    _getDeptList () {
      this.$post('/Department/DepartmentTreeGet').then(res => {
        if (res.data.status === 1) {
          this.departmentList = res.data.data
        }
      })
    },
    handleNodeClick (data) {
      this.department = data.name
      this.$emit('upDeptId', data.id)
      this.$refs.tree.$el.style.display = 'none'
    },
    showDepartment () {
      this._getDeptList()
      this.$refs.tree.$el.style.display = 'block'
      let paddingWidth = this.title ? 20 : 0
      let width = this.title.length * 13 + 4 + paddingWidth + 'px' // 字体长度+冒号+padding
      this.$refs.tree.$el.style.left = width
      this.$refs.tree.$el.style.width = `calc(100% - ${width})`
    },
    hiddenDepartment (e) { // 此方法用于调用此组件的父组件上（点击事件），或绑定body上
      // let tree = document.getElementById('department')
      // if (tree && e.target.id !== 'dept-input') {
      //   tree.style.display = 'none'
      // }
    }
  }
}
</script>

<style lang="less">
.sel-department {
  position: relative;
  .el-tree {
    display: none;
    position: absolute;
    top:32px;
    // left:51px;
    // width:calc(~"(100% - 52px)");
    width:100%;
    background: rgb(240, 232, 232);
    z-index: 10;
  }
}
</style>
