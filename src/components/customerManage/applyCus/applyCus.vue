<template>
  <div class="apply-cus">
    <div>
      <div class="apply top">
        <select-area v-model="area" class="apply-item item-width"></select-area>
        <select-trade v-model="trade" class="apply-item item-width"></select-trade>
        <el-input v-model="applyCount" class="apply-item item-width">
          <template slot="prepend">数量:</template>
        </el-input>
        <el-button type="primary" class="apply-item">申 领</el-button>
      </div>
      <div class="cut-line"></div>
      <div class="apply">
        <el-input v-model="cusName" class="apply-item item-width">
          <template slot="prepend">客户名称:</template>
        </el-input>
        <auto-select :title="'状态'" v-model="applyCusStatus" class="apply-item item-width">
          <el-option label="全部" value=""></el-option>
          <el-option label="未完成客户" value="10"></el-option>
          <el-option label="今日完成客户" value="20"></el-option>
        </auto-select>
        <div class="apply-item">
          <el-button type="primary">查 询</el-button>
          <el-button type="warning">重 置</el-button>
        </div>
      </div>
      <!-- 列表 -->
      <el-table stripe border max-height="800" :data="applyList" style="width: 100%;margin-top:10px;">
        <el-table-column prop="companyname" label="客户名称">
        </el-table-column>
        <el-table-column prop="companytype" label="客户类型" width="70">
          <span slot-scope="scope">
          </span>
        </el-table-column>
        <el-table-column prop="producttype" label="申领商务" width="70">
        </el-table-column>
        <el-table-column prop="areaname" label="所属部门">
        </el-table-column>
        <el-table-column prop="" label="最后跟进时间" width="120">
          <span slot-scope="scope">
          </span>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="viewDetail" type="success" size="mini">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click.native="viewCusDetail">查看</el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import AutoSelect from 'base/autoSelect/autoSelect'
export default {
  data () {
    return {
      area: [],
      trade: [],
      applyCount: '',
      cusName: '',
      applyCusStatus: '',
      applyList: []
    }
  },
  methods: {
    viewCusDetail () {
      this.$router.push({
        path: `applyCus/12345`
      })
    }
  },
  components: {
    SelectArea,
    SelectTrade,
    AutoSelect
  }
}
</script>

<style lang="less" scoped>
.apply-cus {
  background: #fff;
  padding: 20px;
  .top {
    margin-top: -10px;
  }
  .apply {
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
  .cut-line {
    margin-top: 10px;
    border-top: 1px solid rgb(218, 214, 214);
  }
}
</style>
