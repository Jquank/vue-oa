<template>
  <div class="my-customer">
    <div class="my-main">
      <div class="cus-status">
        <el-radio-group v-model="statusRadio">
          <el-radio-button label="10">保A客户</el-radio-button>
          <el-radio-button label="20">录入客户</el-radio-button>
          <el-radio-button label="30">跟踪客户</el-radio-button>
          <el-radio-button label="40">签约客户</el-radio-button>
        </el-radio-group>
      </div>
      <div class="search-cus">
        <el-input placeholder="搜索客户名称" v-model="cusName" class="cus-item item-width">
          <template slot="prepend">客户名称:</template>
        </el-input>
        <select-area v-model="area" class="cus-item item-width"></select-area>
        <select-trade v-model="trade" class="cus-item item-width"></select-trade>
        <el-input placeholder="搜索录入人" v-model="inputPerson" class="cus-item item-width">
          <template slot="prepend">录入人:</template>
        </el-input>
        <el-input placeholder="搜索所属商务" v-model="shangWu" class="cus-item item-width">
          <template slot="prepend">所属商务:</template>
        </el-input>
        <auto-select title="客户状态" v-model="cusStatus" class="cus-item item-width">
          <el-option label="全部" value=""></el-option>
          <el-option label="今日申领客户" value="10"></el-option>
          <el-option label="今日完成客户" value="20"></el-option>
        </auto-select>
        <div class="cus-item">
          <el-button type="primary">查 询</el-button>
          <el-button type="warning">重 置</el-button>
        </div>
      </div>

      <!-- 列表 -->
      <el-table stripe border max-height="800" :data="myCusList" style="width: 100%">
        <el-table-column fixed prop="companyname" label="客户名称">
        </el-table-column>
        <el-table-column prop="companytype" label="公司状态" width="70">
          <span :class="scope.row.companytype===-10?'redfont':''" slot-scope="scope">
            {{scope.row.companytype | comType}}
          </span>
        </el-table-column>
        <el-table-column prop="producttype" label="客户类型" width="70">
          <span slot-scope="scope">
            {{scope.row.producttype | cusStatus}} {{scope.row.producttype===0?scope.row.productnumber+1:''}}
          </span>
        </el-table-column>
        <el-table-column prop="areaname" label="地区">
        </el-table-column>
        <el-table-column prop="catname" label="行业">
        </el-table-column>
        <el-table-column prop="productname" label="业务类型" width="70">
        </el-table-column>
        <el-table-column prop="" label="业务状态" width="120">
          <span :class="scope.row.companylogstatus===10?'redfont':''" slot-scope="scope">
            {{scope.row.companylogtype+""+scope.row.companylogstatus | businessStatus}}
          </span>
        </el-table-column>
        <el-table-column prop="entername" label="录入人" width="80">
        </el-table-column>
        <el-table-column prop="username" label="所属商务" width="80">
        </el-table-column>
        <el-table-column prop="" label="最后跟进时间">
          <span :class="scope.row.tip?'redfont':''" slot-scope="scope">
            {{scope.row.visittime | timeFormat}}
          </span>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="viewDetail(myCusList[scope.$index])" type="success" size="mini">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="pagination" :url="myCusUrl" :sendparams="params" @updateList="updateMyCusList"></page>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Page from '@/base/page/page'
import { serverUrl } from '@/api/config'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import AutoSelect from 'base/autoSelect/autoSelect'
export default {
  data () {
    return {
      statusRadio: '10',
      cusName: '',
      area: [],
      trade: [],
      inputPerson: '',
      shangWu: '',
      cusStatus: '',
      params: {
        logStatus: 100,
        myKind: 30
      },
      myCusUrl: serverUrl + '/Company.do?myCustomer',
      pageCount: 0,
      cusType: '',
      myCusType: [
        { value: '选项1', label: '我的录入客户', status: 10 },
        { value: '选项2', label: '我的跟踪客户', status: 20 },
        { value: '选项3', label: '我的保A客户', status: 30 },
        { value: '选项4', label: '我的签约客户', status: 40 }
      ],
      myCusList: []
    }
  },
  created () {},
  methods: {
    // 查看按钮
    viewDetail (data) {
      this.$router.push({
        path: `myCustomer/${data.id}`,
        query: { data: data }
      })
    },
    updateMyCusList (data) {
      console.log(data)
      this.myCusList = data.data[0].data
    }
  },
  components: {
    Page,
    SelectArea,
    SelectTrade,
    AutoSelect
  }
}
</script>

<style scoped lang="less">
.my-customer {
  .my-main {
    background: #fff;
    padding: 20px;
  }
  .redfont {
    color: red;
  }
  .pagination {
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .my-list {
    margin-top: 15px;
    .my-list-col {
      position: relative;
    }
  }
  .cus-status{
    padding-left: 10px;
  }
  .search-cus {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .cus-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
}
</style>
