<template>
  <el-dialog title="人员选择" :visible.sync="show" id="user-select" width="620px">
    <el-tree :data="departmentList" :props="depProps" accordion node-key="id" ref="tree"
      @node-click="nodeClick" :default-expanded-keys="defaultExpanded"></el-tree>
    <el-row class="name" :gutter="10">
      <el-input placeholder="搜索姓名" v-model="name" @keydown.enter.native="searchName">
         <el-button @click="searchName" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-col @click.native="clickName(index,item.name)" :sm="6" :class="'x'+index"
        v-for="(item,index) in nameList" :key="index">{{item.true_name}}</el-col>
      <div class="btn-save">
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </el-row>

  </el-dialog>
</template>

<script>
import storage from 'good-storage'
import { serverUrl } from 'api/config'
import { $get } from 'api/http'
import { removeClass, toggleClass } from 'common/js/dom'
const DEPT_URL = serverUrl + '/Search.do?DeptEmployer'
const SEARCH_URL = serverUrl + '/Search.do?ByUserName'
export default {
  props: {
    isShow: {
      type: Number,
      default: 0
    }
  },
  watch: {
    isShow (newVal) {
      this.show = !!newVal
    }
  },
  data () {
    return {
      show: false,
      departmentList: [],
      depProps: {
        children: 'children',
        label: 'fullname'
      },
      nameList: [],
      defaultExpanded: [],
      name: ''
    }
  },
  created () {
    this.departmentList = storage.get('department')
    this.defaultExpanded.push(this.departmentList[0].id)
  },
  methods: {
    nodeClick (data) {
      let div = document.getElementsByClassName('bgcolor')[0]
      if (div) {
        removeClass(div, 'bgcolor')
      }
      $get(DEPT_URL, { deptcode: data.code }).then(res => {
        console.log(res.data.data)
        this.nameList = res.data.data
      })
    },
    searchName () {
      $get(SEARCH_URL, {name: this.name}).then(res => {
        this.nameList = res.data.data
      })
    },
    clickName (index) {
      let div = document.getElementsByClassName('x' + index)[0]
      toggleClass(div, 'bgcolor')
    },
    save () {

    }
  },
  components: {}
}
</script>

<style lang="less">
#user-select {
  .el-dialog__body {
    display: flex;
    justify-content: space-around;
  }
  .name{
    width: 250px;
    min-height: 150px;
    .el-col{
      margin-top:10px;
      cursor: pointer;
    }
    .btn-save{
      clear: both;
      padding-top: 10px;
      text-align: right;
    }
    .bgcolor{
      background-color: skyblue
    }
  }
}
</style>
