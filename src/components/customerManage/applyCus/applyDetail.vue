<template>
  <div class="apply-detail">
    <div class="detail-main">
      <div class="cus-info">
        <div class="title">
          <el-button class="title-btn" type="primary">客户信息</el-button>
          <el-button class="back" type="warning">返回</el-button>
        </div>
        <div class="line" style="max-width:980px;"></div>
        <el-form ref="form" :model="form" label-width="90px">
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户名称 :">
                <el-input @blur="accountNameBlur(form.cusName)" v-model="form.cusName" placeholder="客户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="所属行业 :" required>
                <select-trade v-model="form.trade" style="width:100%"></select-trade>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户法人 :">
                <el-input v-model="form.cus" :disabled="disabled" placeholder="客户法人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户地址 :">
                <el-input v-model="form.cusAddr" :disabled="disabled" placeholder="客户地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="成立日期 :">
                <el-date-picker v-model="form.buildDate" value-format="yyyy-MM-dd" :disabled="disabled" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="所属地区 :" required>
                <select-area v-model="form.area" style="width:100%"></select-area>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户网址 :">
                <el-input v-model="form.cusWeb" :disabled="disabled" placeholder="客户网址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户来源 :">
                <el-select v-model="form.cusFrom" :disabled="disabled" placeholder="客户来源" style="width:100%;">
                  <el-option value="10" label="个人查找"></el-option>
                  <el-option value="20" label="个人查找"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="(item,index) in contactList" :key="index" :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="联系人 :" required>
                <el-input v-model="contactList[index].contact" :disabled="disabled" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="联系电话 :" required>
                <el-input v-model="contactList[index].phone" :disabled="disabled" placeholder="联系电话" class="contact-phone"></el-input>
                <el-button @click.native="addContact(index)" class="circle-btn" :type="index===0?'success':'danger'" size="mini" :icon="index===0?'fa fa-plus':'fa fa-minus'" circle></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户类型 :">
                <el-select v-model="form.remark" style="width:100%;">
                  <el-option>123</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="经营范围 :" required>
                <el-input v-model="form.businessScope" :disabled="disabled" type="textarea" :rows="2" placeholder="经营范围"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <div class="follow-record">
        <div class="title">
          <el-button class="title-btn" type="primary">跟进记录</el-button>
        </div>
        <div class="line" style="max-width:980px;"></div>
        <el-table :data="followRecordData" style="max-width: 980px;">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </div>
      <div class="remark mt10px">
        <span>备注：</span>
        <el-row>
          <el-col :md="24" style="max-width: 980px;">
            <el-input type="textarea" :rows="3"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="btns mt10px">
        <el-button type="success" @click.native="aaa">跟进</el-button>
        <el-button type="success" @click.native="aaa">转跟踪</el-button>
        <el-button type="success" @click.native="aaa">暂不联系</el-button>
        <el-button type="success" @click.native="aaa">永久放弃</el-button>
        <el-button type="success" @click.native="aaa">空号/错号</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
export default {
  data () {
    return {
      form: {
        cusName: '',
        buildDate: '',
        cus: '',
        cusAddr: '',
        cusWeb: '',
        cusFrom: '',
        trade: '',
        area: '',
        businessScope: '',
        remark: ''
      },
      contactList: [
        {
          contact: '',
          phone: ''
        }
      ],
      disabled: false,
      followRecordData: []
    }
  },
  methods: {
    addContact (index) {
      if (index === 0) {
        this.contactList.push({
          contact: '',
          phone: ''
        })
      } else {
        this.contactList.splice(index, 1)
      }
    }
  },
  components: { SelectArea, SelectTrade }
}
</script>

<style lang="less" scoped>
.apply-detail {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 50px;
  left: 180px;
  z-index: 200;
  padding: 5px 10px;
  .maxwidth {
    max-width: 500px;
  }
  .contact-phone {
    width: calc(~'(100% - 30px)');
  }
  .circle-btn {
    width: 26px;
    height: 26px;
  }
  .title{
    display: flex;
    justify-content: space-between;
    max-width: 980px;
    .title-btn{
      border-top-right-radius: 15px;
    }

  }
}
</style>
