<template>
  <div class="cus-list component-container media-padding">
    <div class="allot-search">
      <el-input placeholder="搜索客户名称" v-model="cusName" class="list-item item-width">
        <template slot="prepend">公司名称:</template>
      </el-input>
      <el-input placeholder="搜索百度账号" v-model="bdAccount" class="list-item item-width">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <auto-select v-model="addType" title="加款类型" class="list-item item-width">
        <el-option value="" label="全部"></el-option>
        <el-option value="-1" label="正常加款"></el-option>
        <el-option value="20" label="提前加款"></el-option>
        <el-option value="30" label="返款加款"></el-option>
      </auto-select>
      <auto-select v-model="renewStatus" title="续费状态" class="list-item item-width">
        <el-option value="" label="全部"></el-option>
        <el-option v-for="(item,index) in renewStatusList" :key="index" :value="item.code_val" :label="item.code_desc"></el-option>
      </auto-select>
      <el-button class="list-item" @click.native="search" type="primary">查 询</el-button>
      <el-button class="list-item" @click.native="reset" type="warning">重 置</el-button>
      <div class="import-btn text-right">
        <el-button class="mt10px" type="primary">提前开票</el-button>
      </div>
    </div>

    <el-table stripe border :data="list" class="table-width">
      <el-table-column prop="companyname" label="公司名称" min-width="120">
      </el-table-column>
      <el-table-column prop="baidu_account" label="百度账号">
      </el-table-column>
      <el-table-column prop="" label="到账金额">
        <span slot-scope="scope">{{scope.row.receiptmoney | currency1}}</span>
      </el-table-column>
      <el-table-column prop="" label="提单金额">
        <span slot-scope="scope">{{scope.row.usemoney+scope.row.servicemoney+scope.row.usevoucher | currency1}}</span>
      </el-table-column>
      <el-table-column prop="" label="申请时间">
        <span slot-scope="scope">{{scope.row.inserttime | timeFormat}}</span>
      </el-table-column>
      <el-table-column prop="" label="提单人">
        <span slot-scope="scope">{{scope.row.username+((scope.row.true_name && scope.row.true_name!=scope.row.username)?('('+scope.row.true_name+')'):'')}}</span>
      </el-table-column>
      <el-table-column prop="" label="加款类型">
        <span slot-scope="scope">{{scope.row.addtype==10?'正常加款':scope.row.addtype==20?'提前加款':'返款加款'}}</span>
      </el-table-column>
      <el-table-column prop="" label="状态" width="100">
        <template slot-scope="scope">
          <el-button plain type="warning" class="xsbtn">{{(scope.row.step > 100 && scope.row.checkName) ? scope.row.checkName : scope.row.code_desc}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="90">
        <!-- <template slot-scope="scope"  v-if="scope.row.type!=10&&scope.row.type!=0&&permissions.indexOf('71')>-1"> -->
        <!-- <template slot-scope="scope">
          <el-button @click.native="cusOut(scope.row)" type="primary" class="xsbtn">客户转出</el-button>
        </template> -->
      </el-table-column>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" @updateList="getList"></page>

  </div>
</template>

<script>
import cookie from 'js-cookie'
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import {getByCode} from 'api/getOptions'
export default {
  data () {
    return {
      userId: cookie.get('userId'),
      permissions: cookie.get('permissions'),
      cusName: '',
      bdAccount: '',
      addType: '',
      renewStatus: '',
      renewStatusList: '',

      list: [],
      url: '/Renew.do?renewapplylist',
      sendParams: {
      }
    }
  },
  created () {
    getByCode(54).then(res => {
      this.renewStatusList = res.data.data
    })
  },
  methods: {
    search () {
      this.sendParams = {
        addtype: '',
        step: '',
        baiduAccount: '',
        companyName: ''
      }
    },
    reset () {
      this.cusName = ''
      this.contrbdAaccountatType = ''
    },
    // todo
    cusOut () {},
    getList (res) {
      this.list = res.data[0].data
    }
  },
  components: {
    Page,
    AutoSelect
  }
}
</script>

<style lang="less" scoped>
.cus-list {
  .allot-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .list-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .import-btn{
      flex-grow: 1;
    }
    .item-width {
      width: 280px;
    }
  }
  .btn-input {
    width: calc(~'(100% - 60px)');
  }
}
</style>
