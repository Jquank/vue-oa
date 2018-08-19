// 带input的部门树
<template>
  <div class="sel-department"  style="width:300px">
    <el-input placeholder="点击选择部门" v-model="department" @focus="showDepartment">
      <template slot="prepend">{{title}}:</template>
    </el-input>
    <el-tree :data="departmentList" :props="depProps" accordion node-key="id" ref="tree" @node-click="nodeClick"
      :expand-on-click-node="false" id="department"
      :default-expanded-keys="defaultExpanded"></el-tree>
  </div>
</template>

<script>
import storage from 'good-storage'
export default {
  props: {
    title: {
      type: String,
      default: '部门'
    }
  },
  data () {
    return {
      department: '',
      departmentList: [],
      depProps: {
        children: 'children',
        label: 'fullname'
      },
      defaultExpanded: [],
      departmentCode: ''
    }
  },
  mounted () {
    this.departmentList = storage.get('department')
    this.defaultExpanded.push(this.departmentList[0].id)
  },
  methods: {
    nodeClick (data) {
      this.department = data.fullname
      this.departmentCode = data.code
      this.$emit('departmentCode', this.this.departmentCode)
      this.$refs.tree.$el.style.display = 'none'
    },
    showDepartment () {
      this.$refs.tree.$el.style.display = 'block'
    },
    hiddenDepartment (e) { // 此方法用于调用此组件的父组件上（点击事件），或绑定body上
      let tree = document.getElementById('department')
      if (tree && e.target.nodeName !== 'INPUT') {
        tree.style.display = 'none'
      }
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
    left:71px;
    width:calc(~"(100% - 72px)");
  }
}
</style>
