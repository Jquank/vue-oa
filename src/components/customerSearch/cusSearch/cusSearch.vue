<template>
  <div class="cus-search component-container media-padding">
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
        <el-button type="warning" @click.native="view">查看</el-button>
      </div>
      <div class="search-item countTip">
        <span>当前可保A数量 :
          <span class="red"> {{10}}</span>
        </span>
        <span>当前可跟踪数量 :
          <span class="red"> {{10}}</span>
        </span>
      </div>
    </div>

    <el-dialog title="客户详情" :visible.sync="cusDetailDialog">
      <el-form ref="form" :model="form" label-width="90px">
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户名称 :">
              <el-input v-model="form.cusName" disabled placeholder="客户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="所属行业 :">
              <select-trade v-model="form.trade" :tradeDisable="true" style="width:100%"></select-trade>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户法人 :">
              <el-input v-model="form.cus" disabled placeholder="客户法人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户地址 :">
              <el-input v-model="form.cusAddr" disabled placeholder="客户地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="成立日期 :">
              <el-date-picker v-model="form.buildDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"  style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="所属地区 :">
              <select-area v-model="form.area" :areaDisable="true" style="width:100%"></select-area>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户网址 :">
              <el-input v-model="form.cusWeb" disabled placeholder="客户网址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户来源 :">
              <el-select v-model="form.cusFrom" disabled placeholder="客户来源" style="width:100%;">
                <el-option value="10" label="个人查找"></el-option>
                <el-option value="20" label="个人查找"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in contactList" :key="index" :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="联系人 :">
              <el-input v-model="contactList[index].contact" disabled placeholder="联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="联系电话 :">
              <el-input v-model="contactList[index].phone" disabled placeholder="联系电话" class="contact-phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="24" style="max-width:1000px;">
            <el-form-item label="经营范围 :">
              <el-input v-model="form.businessScope" type="textarea" :rows="3" disabled placeholder="经营范围"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;">
        <el-button type="warning">申请保A</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
export default {
  data () {
    return {
      cusName: '',
      userName: '',
      cusDetailDialog: false,
      form: {
        cusName: '',
        buildDate: '',
        cus: '',
        cusAddr: '',
        cusWeb: '',
        cusFrom: '',
        trade: '',
        area: '',
        businessScope: ''
      },
      contactList: [
        {
          contact: '',
          phone: ''
        }
      ]
    }
  },
  methods: {
    view () {
      this.cusDetailDialog = true
    }
  },
  components: {
    AutoSelect,
    SelectDepartment,
    SelectArea,
    SelectTrade
  }
}
</script>

<style lang="less" scoped>
.cus-search {
  .search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .search-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
    .countTip {
      display: flex;
      align-items: center;
      span + span {
        padding-left: 15px;
      }
    }
  }
}
</style>
