<template>
  <div class="visit-record component-container media-padding">
    <div class="visit-search">
      <el-input v-model="cusName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">客户名称:</template>
      </el-input>
      <auto-select title="出访类型" v-model="visitType" id="visit-status" class="visit-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option label="今日申领客户" value="10"></el-option>
        <el-option label="今日完成客户" value="20"></el-option>
      </auto-select>
      <el-date-picker v-model="visitDate" type="datetimerange" range-separator="至" start-placeholder="出访开始日期" end-placeholder="出访结束日期" class="visit-item" style="width:350px;"></el-date-picker>
      <div class="visit-item">
        <el-button type="primary">查 询</el-button>
        <el-button type="warning">重 置</el-button>
        <el-button type="warning" @click.native="view">查 看</el-button>
      </div>
    </div>

    <!-- 填写出访结果弹窗 -->
    <el-dialog v-el-drag-dialog title="填写出访结果" class="visit-result-dialog" :visible.sync="visitResultDialog">
      <el-form ref="form" :model="form" label-width="105px">
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户名称 :">
              <el-input v-model="form.cusName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="客户意向 :" >
              <el-select v-model="form.cusIntention" style="width:100%;">
                <el-option value="25" label="25%"></el-option>
                <el-option value="50" label="50%"></el-option>
                <el-option value="75" label="75%"></el-option>
                <el-option value="100" label="100%"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="拜访人 :">
              <el-input v-model="form.visitMan" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="陪访人 :">
              <el-input v-model="form.keepMan" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="联系电话 :" >
              <el-input v-model="form.contact" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="联系地址 :" >
              <el-input v-model="form.addr" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="出访时间 :">
              <el-date-picker v-model="form.visitTime" value-format="yyyy-MM-dd" :disabled="disabled" type="date" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="拜访结束时间 :" >
              <el-date-picker v-model="form.overTime" value-format="yyyy-MM-dd" type="date" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="出访类型 :">
              <el-select v-model="form.visitType" :disabled="disabled" style="width:100%;">
                <el-option value="10">111</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="出访结果 :">
              <el-select v-model="form.visitResult" style="width:100%;">
                <el-option value="10" label="继续跟进"></el-option>
                <el-option value="20" label="只签合同"></el-option>
                <el-option value="30" label="收半款"></el-option>
                <el-option value="40" label="收全款"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="24">
            <el-form-item label="出方详情 :" >
              <el-input v-model="form.visitDetail" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:center;">
        <el-button type="primary">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import elDragDialog from '@/directive/el-dragDialog' // eslint-disable-line
export default {
  directives: { elDragDialog },
  data () {
    return {
      cusName: '',
      visitType: '',
      visitDate: '',
      visitResultDialog: false,
      form: {
        cusName: '',
        cusIntention: '',
        visitMan: '',
        keepMan: '',
        contact: '',
        addr: '',
        visitTime: '',
        overTime: '',
        visitType: '',
        visitResult: '',
        visitDetail: ''
      },
      disabled: true
    }
  },
  methods: {
    view () {
      this.visitResultDialog = true
    }
  },
  components: {
    AutoSelect
  }
}
</script>
<style lang="less">
.visit-result-dialog{
    >.el-dialog{
      width:800px;
    }
  }
</style>
<style lang="less" scoped>
.visit-record {
  padding: 20px;
  .visit-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .visit-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
  .maxwidth{
    max-width: 500px;
  }
}
</style>
