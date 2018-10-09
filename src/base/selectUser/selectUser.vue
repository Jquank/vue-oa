<template>
  <div class="select-user">
    <el-tree :data="departmentList" :props="depProps" @node-click="nodeClick" accordion node-key="code" ref="tree" id="department" :default-expanded-keys="defaultExpanded" style="width:250px;"></el-tree>
    <el-row class="name">
      <el-input v-if="showSearch" placeholder="搜索姓名" v-model="name" @keydown.enter.native="searchName">
        <el-button @click="searchName" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="name-container">
        <div @click="clickName(index,item.id,item.name)" class="name-item" :class="'x'+index" v-for="(item,index) in nameList" :key="index">
          {{item.true_name}}
        </div>
      </div>
      <div class="btn-save">
        <el-button @click.native="save" type="primary">保存</el-button>
      </div>
    </el-row>
  </div>

</template>

<script>
import { transTree } from 'common/js/utils'
import { removeClass, toggleClass } from 'common/js/dom'
const DEPT_URL = '/Search.do?DeptEmployer'
const SEARCH_URL = '/Search.do?ByUserName'
export default {
  props: {
    showSaveBtn: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      departmentList: [],
      depProps: {
        children: 'children',
        label: 'fullname'
      },
      defaultExpanded: ['KD01'],
      nameList: [],
      name: '',
      userId: '',
      selectedName: ''
    }
  },
  created () {
    this._getDeptList()
  },
  methods: {
    _getDeptList () {
      this.$get('/Search.do?DeptTree').then(res => {
        if (res.data.success) {
          let dept = res.data.data
          this.departmentList = transTree(dept)
        }
      })
    },
    nodeClick (data) {
      this.userId = ''
      let div = document.getElementsByClassName('bgcolor')[0]
      if (div) {
        removeClass(div, 'bgcolor')
      }
      this.$get(DEPT_URL, { deptcode: data.code }).then(res => {
        this.nameList = res.data.data
      })
    },
    searchName () {
      this.userId = ''

      this.$get(SEARCH_URL, { name: this.name }).then(res => {
        this.nameList = res.data.data
        let div = document.getElementsByClassName('bgcolor')[0]
        if (div) {
          removeClass(div, 'bgcolor')
        }
      })
    },
    clickName (index, id, name) {
      this.userId = id
      this.selectedName = name
      let div = document.getElementsByClassName('x' + index)[0]
      toggleClass(div, 'bgcolor')
    },
    save () {
      this.$emit('userId', this.userId, this.selectedName)
      if (!this.userId) {
        this.$message({
          type: 'warning',
          message: '请点击选择人员'
        })
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
.select-user{
  display: flex;
  justify-content: space-between;
  .name {
    width: 250px;
    min-height: 150px;
    .name-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .name-item {
        margin-top: 10px;
        padding-right: 10px;
        cursor: pointer;
      }
    }
    .btn-save {
      clear: both;
      padding-top: 20px;
      text-align: right;
    }
    .bgcolor {
      background-color: skyblue;
    }
  }
}
</style>
