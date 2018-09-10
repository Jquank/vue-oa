<template>
  <div class="my-customer component-container media-padding">
    <div>
      <div class="cus-status">
        <el-radio-group v-model="myKind" class="cus-status-radio">
          <el-radio-button label="10">保A客户</el-radio-button>
          <el-radio-button label="20">录入客户</el-radio-button>
          <el-radio-button label="30">跟踪客户</el-radio-button>
          <el-radio-button label="40">签约客户</el-radio-button>
        </el-radio-group>
        <div class="throw-order">
          <el-button @click.native="throwOrder" type="warning">保A甩单</el-button>
        </div>
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
        <auto-select :title="'客户状态'" v-model="cusStatus" id="mycus-auto-select" class="cus-item item-width">
          <el-option label="全部" value=""></el-option>
          <el-option label="今日申领客户" value="10"></el-option>
          <el-option label="今日完成客户" value="20"></el-option>
        </auto-select>
        <div class="cus-item">
          <el-button @click.native="search" type="primary">查 询</el-button>
          <el-button type="warning">重 置</el-button>
        </div>
      </div>

      <!-- 列表 -->
      <el-table @selection-change="handleSelectionChange" stripe border :data="myCusList" style="width: 100%">
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <el-table-column prop="companyname" label="客户名称">
        </el-table-column>
        <el-table-column prop="companytype" label="公司状态" width="70">
          <span :class="scope.row.companytype===-10?'red':''" slot-scope="scope">
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
          <span :class="scope.row.companylogstatus===10?'red':''" slot-scope="scope">
            {{scope.row.companylogtype+""+scope.row.companylogstatus | businessStatus}}
          </span>
        </el-table-column>
        <el-table-column prop="entername" label="录入人" width="80">
        </el-table-column>
        <el-table-column prop="username" label="所属商务" width="80">
        </el-table-column>
        <el-table-column prop="" label="最后跟进时间" width="140">
          <span :class="scope.row.tip?'red':''" slot-scope="scope">
            {{scope.row.visittime | timeFormat}}
          </span>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button @click.native.prevent="viewDetail(scope.row)" type="success" size="mini">查看</el-button>
            <el-button @click.native.prevent="follow(scope.row)" type="warning" size="mini">跟进</el-button>
            <el-button @click.native.prevent="visit(scope.row)" type="primary" size="mini">出访</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page class="pagination" :url="myCusUrl" :sendParams="params" @updateList="updateMyCusList"></page>
    </div>
    <router-view></router-view>

    <!-- 跟进弹窗 -->
    <el-dialog title="填写出访记录" :visible.sync="followDialog" width="30%">
      <el-input v-model="followRecord" type="textarea" :rows="3"></el-input>
      <div class="follow-btns">
        <el-button @click.native="followDialog = false" type="warning">取 消</el-button>
        <el-button @click.native="subFollowRecord" type="success">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 出访弹窗 -->
    <el-dialog title="填写出访记录" :visible.sync="visitDialog" width="700px">
      <el-form ref="form" :model="form" label-width="90px">
          <el-row :gutter="20">
            <el-col :md="12">
              <el-form-item label="客户名称 :">
                <el-input v-model="form.cusName" disabled placeholder="客户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="客户意向 :">
                <el-select v-model="form.cusIntention" placeholder="客户来源" style="width:100%;">
                  <el-option value="10" label="个人查找"></el-option>
                  <el-option value="20" label="个人查找"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12">
              <el-form-item label="拜访人 :">
                <el-input v-model="form.visitMan" placeholder="客户法人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="陪访人 :">
                <el-input v-model="form.keepMan" disabled placeholder="客户地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12">
              <el-form-item label="联系电话 :">
                <el-input v-model="form.phone" placeholder="客户网址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="联系地址 :">
                <el-select v-model="form.addr" placeholder="客户来源" style="width:100%;">
                  <el-option value="10" label="个人查找"></el-option>
                  <el-option value="20" label="个人查找"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" >
              <el-form-item label="出访时间 :">
                <el-input v-model="form.visitTime" placeholder="客户网址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="出访类型 :">
                <el-select v-model="form.visitType" placeholder="客户来源" style="width:100%;">
                  <el-option value="10" label="个人查找"></el-option>
                  <el-option value="20" label="个人查找"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btns mt10px" style="text-align:center;">
            <el-button type="primary">提交</el-button>
          </div>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Page from '@/base/page/page'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import AutoSelect from 'base/autoSelect/autoSelect'
export default {
  data () {
    return {
      refresh: true,
      myKind: '10',
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
      myCusUrl: '/Company.do?myCustomer&tk=' + this.$tk,
      pageCount: 0,
      cusType: '',
      myCusType: [
        { value: '选项1', label: '我的录入客户', status: 10 },
        { value: '选项2', label: '我的跟踪客户', status: 20 },
        { value: '选项3', label: '我的保A客户', status: 30 },
        { value: '选项4', label: '我的签约客户', status: 40 }
      ],
      myCusList: [],
      multipleSelection: [],
      followDialog: false,
      followRecord: '',
      visitDialog: false,
      form: {
        cusName: '',
        cusIntention: '',
        visitMan: '',
        keepMan: '',
        phone: '',
        addr: '',
        visitTime: '',
        visitType: ''
      }
    }
  },
  mounted () {},
  methods: {
    search () {
      this.params = Object.assign({}, this.params, {
        myKind: this.myKind,
        companyName: this.cusName,
        areaId: this.area,
        catId: this.trade,
        businessname: this.shangWu,
        entername: this.inputPerson,
        logStatus: this.cusStatus
      })
    },
    // 甩单按钮
    throwOrder () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请勾选客户！'
        })
        return
      }
      console.log(this.multipleSelection)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 查看按钮
    viewDetail (data) {
      this.$router.push({
        path: `myCus/${data.id}`,
        query: { data: data }
      })
    },
    // 跟进按钮
    follow () {
      this.followDialog = true
    },
    // 跟进提交
    subFollowRecord () {
      this.followDialog = false
      console.log(this.followRecord)
    },
    // 出访按钮
    visit () {
      this.visitDialog = true
    },
    updateMyCusList (data) {
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

<style lang="less">
/* 自定义auto-select的padding */
#mycus-auto-select {
  .auto-select-padding(86px);
}
</style>

<style scoped lang="less">
.my-customer {
  position: relative;
  .cus-status {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 500px;
    margin-top: -10px;
    .cus-status-radio {
      margin-top: 10px;
    }
    .throw-order {
      margin-top: 10px;
    }
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
  .cus-status {
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
  .follow-btns{
    margin-top: 10px;
    text-align: right;
  }
}
</style>
