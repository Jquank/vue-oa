<template>
  <div class="cus-search component-container media-padding">
    <div class="multi-import">
      <el-button type="primary" icon="fa fa-cloud-download"> 批量导入</el-button>
      <span class="red">(ps:excell表头为“百度用户名”、“转入客服编号”、“SF系统”)</span>
    </div>
    <div class="search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="search-item item-width">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <el-input placeholder="搜索用户名" v-model="userName" class="search-item item-width">
        <template slot="prepend">用户名:</template>
      </el-input>
      <div class="search-item">
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
      </div>
    </div>
    <div class="out-btn">
      <el-button type="success" @click.native="cusOut">转 出</el-button>
    </div>

    <!-- 转出弹窗 -->
    <el-dialog title="选择客服" :visible.sync="selCusServiceDialog" width="500px">
      <el-input v-model="accountSF" placeholder="请填写SF账号(必填)">
        <span slot="prepend">SF账号</span>
      </el-input>
      <el-input @click.native="searchService($event,serviceName)" v-model="serviceName" style="margin-top:10px;" placeholder="搜索客服">
        <span slot="append" class="search-service">搜索客服</span>
      </el-input>
      <el-table :data="serviceData" highlight-current-row style="width:100%;margin-top:10px;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="" label="转出客服">
        </el-table-column>
      </el-table>
      <!-- <page></page> -->
    </el-dialog>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import Page from 'base/page/page'
export default {
  data () {
    return {
      cusName: '',
      userName: '',
      selCusServiceDialog: false,
      accountSF: '',
      serviceName: '',
      serviceData: []

    }
  },
  methods: {
    cusOut () {
      this.selCusServiceDialog = true
    },
    searchService (e, name) {
      if (e.target.nodeName !== 'INPUT') {
        console.log(name)
      }
    }
  },
  components: {
    AutoSelect,
    SelectDepartment,
    Page
  }
}
</script>

<style lang="less" scoped>
.marginleft10px{
  margin-left: 10px;
}
.cus-search {
  .multi-import{
    .marginleft10px
  }
  .search {
    display: flex;
    flex-wrap: wrap;
    .search-item {
     .marginleft10px;
      margin-top: 10px;
    }
    .item-width {
      width: 280px;
    }
  }
  .out-btn{
    .marginleft10px;
    margin-top: 10px;
  }

  .search-service{
    display: inline-block;
    width:100%;
    height:100%;
    cursor: pointer;
  }
}
</style>
