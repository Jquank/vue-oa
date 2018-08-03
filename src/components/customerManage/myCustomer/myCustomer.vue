<template>
  <div class="my-customer">
    <p>
      <span>客户管理 / 我的客户</span>
    </p>
    <div class="my-main">
      <el-row>
        <!-- 搜索条件之 客户名称 -->
        <el-col :span="5">
          <div style="width:90%">
            <el-input placeholder="请输入客户名称搜索" v-model="cusName">
              <template slot="prepend">客户名称</template>
            </el-input>
          </div>
        </el-col>
        <!-- 搜索条件之 录入人 -->
        <el-col :span="6">
          <div style="width:90%">
            <el-input placeholder="请输入录入人搜索" v-model="inputPerson">
              <template slot="prepend">录入人</template>
            </el-input>
          </div>
        </el-col>
        <!-- 搜索条件之 所属商务 -->
        <el-col :span="6">
          <div style="width:90%">
            <el-input placeholder="请输入所属商务搜索" v-model="shangWu">
              <template slot="prepend">所属商务</template>
            </el-input>
          </div>
        </el-col>
        <!-- 搜索条件之 我的客户类型 -->
        <el-col :span="6">
          <el-select style="width:80%" v-model="cusType" placeholder="请选择客户类型">
            <el-option v-for="item in myCusType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row>
        <!-- 搜索条件之 地区 -->
        <el-col :span="8">
          <area-cascader style="margin-top:10px;" placeholder="请选择地区" type='text' v-model="area" :level='1' :data="pcaa"></area-cascader>
        </el-col>
        <!-- 搜索条件之 行业 -->
        <el-col :span="8">
          <area-cascader style="margin-top:10px;" placeholder="请选择行业" type='text' v-model="trade" :level='0' :data="pca"></area-cascader>
        </el-col>
        <el-col :span="8">
          <div style="margin-top:10px;">
            <el-button type="primary">查询</el-button>
            <el-button type="warning">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 列表 -->
      <el-row class="my-list">
        <el-col :span="24" class="my-list-col">
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
          <div class="loading-container" v-show="!myCusList.length">
            <loading></loading>
          </div>
        </el-col>
      </el-row>
      <page class="pagination" :url="myCusUrl" :sendparams="params" @updateList="updateMyCusList"></page>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from '@/base/loading/loading'
import Page from '@/base/page/page'
// import { $post } from '@/api/http'
import { serverUrl } from '@/api/config'
import { pca, pcaa } from 'area-data'

export default {
  data () {
    return {
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
      pcaa: pcaa,
      pca: pca,
      area: [],
      trade: [],
      cusName: '',
      inputPerson: '',
      shangWu: '',
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
    Loading
  }
}
</script>

<style scoped lang="less">
.my-customer {
  position: relative;
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
  .loading-container {
    z-index: 100;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
