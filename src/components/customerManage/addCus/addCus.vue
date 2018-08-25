<template>
  <div class="add-user">
    <el-form ref="form" :model="form" label-width="90px">
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户名称 :"  required>
            <el-input @blur="accountNameBlur(form.cusName)" v-model="form.cusName" placeholder="客户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="成立日期 :"  required>
            <el-date-picker v-model="form.buildDate" value-format="yyyy-MM-dd" :disabled="disabled" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户法人 :"  required>
            <el-input v-model="form.cus" :disabled="disabled" placeholder="客户法人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户地址 :"  required>
            <el-input v-model="form.cusAddr" :disabled="disabled" placeholder="客户地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户网址 :"  required>
            <el-input v-model="form.cusWeb" :disabled="disabled" placeholder="客户网址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户来源 :"  required>
            <el-select v-model="form.cusFrom" :disabled="disabled" placeholder="客户来源" style="width:100%;">
              <el-option value="10" label="个人查找"></el-option>
              <el-option value="20" label="个人查找"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="所属行业 :"  required>
            <select-trade v-model="form.trade" style="width:100%"></select-trade>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="所属地区 :"  required>
            <select-area v-model="form.area" style="width:100%"></select-area>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="经营范围 :"  required>
            <el-input v-model="form.businessScope" :disabled="disabled" type="textarea" :rows="3" placeholder="经营范围"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="备注 :">
            <el-input v-model="form.remark" :disabled="disabled" type="textarea" :rows="3" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item,index) in contactList" :key="index" :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="联系人 :"  required>
            <el-input v-model="contactList[index].contact" :disabled="disabled" placeholder="联系人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="联系电话 :"  required>
            <el-input v-model="contactList[index].phone" :disabled="disabled" placeholder="联系电话" class="contact-phone"></el-input>
            <el-button @click.native="addContact(index)" class="circle-btn" :type="index===0?'success':'danger'" size="mini" :icon="index===0?'fa fa-plus':'fa fa-minus'" circle></el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0" class="btns">
        <el-button type="primary" @click="submit" class="btns-child">添加为公共客户</el-button>
        <el-button type="warning" @click="submit" class="btns-child">添加为我的跟踪客户</el-button>
        <div class="btns-child">
          <el-button type="primary" @click="submit">添加并申请保A</el-button>
          <span class="red">(可保A数量10)</span>
        </div>
      </el-form-item>
    </el-form>
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
      contactList: [{
        contact: '',
        phone: ''
      }],
      disabled: true
    }
  },
  methods: {
    accountNameBlur (val) {
      console.log(this.form.cusFrom)
    },
    addContact (index) {
      if (index === 0) {
        this.contactList.push({
          contact: '',
          phone: ''
        })
      } else {
        this.contactList.splice(index, 1)
      }
    },
    submit () {
      if (
        !this.form.cusName ||
        !this.form.buildDate ||
        !this.form.cus ||
        !this.form.cusAddr ||
        !this.form.cusFrom ||
        !this.form.trade ||
        !this.form.area ||
        !this.form.businessScope ||
        !this.contactList[0].contact ||
        !this.contactList[0].phone
      ) {
        this.$message({
          type: 'error',
          message: '请填写必填项！'
        })
        return
      }
      console.log(22)
    }
  },
  components: {
    SelectArea,
    SelectTrade
  }
}
</script>

<style lang="less">
.btns .el-form-item__content{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1000px;
  margin-top: -10px;
  &>.btns-child{
   margin-top: 10px;
  }
}

</style>

<style lang="less" scoped>
.add-user {
  background: #fff;
  padding: 20px;
  .maxwidth{
    max-width: 500px;
  }
  .contact-phone{
    width:calc(~"(100% - 30px)");
  }
  .circle-btn{
    width: 26px;
    height: 26px;
  }
}
</style>
