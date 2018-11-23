<template>
  <div class="apply-contract component-container media-padding">
    <div class="apply-btn">
      <el-button v-if="permissions.indexOf('4t') > -1" @click.native="addMoneyRecord({'type':'BT'})" type="primary" icon="fa fa-plus"> 添加大搜到款</el-button>
      <el-button v-if="permissions.indexOf('80') > -1" @click.native="addMoneyRecord({'type':'ZTC'})" type="primary" icon="fa fa-plus"> 添加直通车到款</el-button>
      <el-button v-if="permissions.indexOf('89') > -1" @click.native="addMoneyRecord({'type':'KA'})" type="primary" icon="fa fa-plus"> 添加KA到款</el-button>
    </div>
    <div class="apply-search">
      <el-input placeholder="搜索公司名/法人" v-model="cusName" class="apply-item item-width">
        <template slot="prepend">公司名/法人:</template>
      </el-input>
      <el-input placeholder="搜索提交人" v-model="subName" class="apply-item item-width">
        <template slot="prepend">提交人:</template>
      </el-input>
      <div class="apply-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
    </div>

    <el-table stripe border :data="list" style="width: 100%;margin-top:10px;">
      <el-table-column prop="companyname" label="公司名称/法人">
      </el-table-column>
      <el-table-column prop="name" label="提交人">
      </el-table-column>
      <el-table-column prop="" label="到款金额">
        <span slot-scope="scope">{{scope.row.sum | currency1}}</span>
      </el-table-column>
      <el-table-column prop="" label="服务费">
        <span slot-scope="scope">{{scope.row.service | currency1}}</span>
      </el-table-column>
      <el-table-column prop="" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button @click.native="viewMoney(scope.row)" type="success" class="xsbtn">查看</el-button>
          <el-button @click.native="editMoney(scope.row)" type="warning" class="xsbtn">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>
    <router-view></router-view>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
export default {
  data () {
    return {
      cusName: '',
      subName: '',

      list: [],
      url: '/receipt.do?showcompanyreceipt',
      sendParams: {
        status: '300',
        companyname: this.cusName,
        username: this.subName
      }
    }
  },
  computed: {
    permissions () {
      return cookie.getJSON('permissions')
    }
  },
  methods: {
    addMoneyRecord (val) {
      this.$router.push({
        path: `moneyRecord/add/${val.type}`,
        query: { data: val }
      })
    },
    viewMoney (val) {
      this.$router.push({
        path: `moneyRecord/view/${val.id}`,
        query: { data: val }
      })
    },
    editMoney (val, type) {
      this.$router.push({
        path: `moneyRecord/edit/${val.id}`,
        query: { data: val }
      })
    },
    search () {
      this.sendParams = {
        status: '300',
        companyname: this.cusName,
        username: this.subName
      }
    },
    reset () {
      this.cusName = ''
      this.subName = ''
    },
    getList (res) {
      this.list = res.data[0].data
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.query.data === 'fromDetail') {
      this.search()
    }
    next()
  },
  components: {
    Page,
    AutoSelect,
    SelectDepartment
  }
}
</script>

<style lang="less" scoped>
.apply-contract {
  position: relative;
  .apply-btn {
    margin-left: 10px;
  }
  .apply-search {
    display: flex;
    flex-wrap: wrap;
    .apply-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
}
</style>
