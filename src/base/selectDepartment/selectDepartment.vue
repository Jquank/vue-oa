// 带input的部门树
<template>
  <div class="sel-department"  style="width:300px">
    <el-input placeholder="点击选择部门" v-model="department" @focus="showDepartment">
      <template slot="prepend">{{title}}:</template>
    </el-input>
    <el-tree :data="departmentList" :props="depProps" accordion node-key="id" ref="tree" :expand-on-click-node="false"
      id="department" @node-click="handleNodeClick"
      :default-expanded-keys="defaultExpanded"></el-tree>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '部门'
    },
    prepend: {
      type: Boolean,
      default: true
    },
    departmentid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      department: '',
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
      this.$post('/Department/DepartmentTreeGet').then(res => {
        if (res.data.status === 1) {
          this.departmentList = res.data.data
        }
      })
    },
    handleNodeClick (data) {
      console.log(data)
      this.department = data.name
      this.$emit('upDeptId', data.id)
      this.$refs.tree.$el.style.display = 'none'
    },
    showDepartment () {
      this.$refs.tree.$el.style.display = 'block'
    },
    hiddenDepartment (e) { // 此方法用于调用此组件的父组件上（点击事件），或绑定body上
      // let tree = document.getElementById('department')
      // if (tree && e.target.nodeName !== 'INPUT') {
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
    left:51px;
    width:calc(~"(100% - 52px)");
    background: #fff;
    z-index: 10;
  }
}
</style>
