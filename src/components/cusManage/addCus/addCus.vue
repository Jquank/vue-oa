<template>
  <div class="add-user component-container media-padding">
    <el-form ref="form" :model="form" label-width="90px">
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户名称 :" required>
            <el-input @blur="accountNameBlur(form.cusName)" v-model="form.cusName" placeholder="客户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="成立日期 :" required>
            <el-date-picker v-model="form.buildDate" value-format="yyyy-MM-dd" :disabled="disabled" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户法人 :" required>
            <el-input v-model="form.cus" :disabled="disabled" placeholder="客户法人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户地址 :" required>
            <el-input v-model="form.cusAddr" :disabled="disabled" placeholder="客户地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户网址 :" required>
            <el-input v-model="form.cusWeb" :disabled="disabled" placeholder="客户网址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户来源 :" required>
            <el-select v-model="form.cusFrom" :disabled="disabled" placeholder="客户来源" style="width:100%;">
              <el-option v-for="(item,index) in cusFromList" :key="index" :value="item.code_val" :label="item.code_desc"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="所属行业 :" required>
            <select-trade v-model="form.trade" style="width:100%"></select-trade>
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
          <el-form-item label="经营范围 :" required>
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
          <el-form-item label="联系人 :" required>
            <el-input v-model="contactList[index].name" :disabled="disabled" placeholder="联系人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="联系电话 :" required>
            <el-input v-model="contactList[index].contact" :disabled="disabled" placeholder="联系电话" class="contact-phone"></el-input>
            <el-button @click.native="addContact(index)" class="circle-btn" :type="index===0?'success':'danger'" size="mini" :icon="index===0?'fa fa-plus':'fa fa-minus'" circle></el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0" class="btns">
        <el-button type="primary" @click.native="submit(0)" class="btns-child">添加为公共客户</el-button>
        <el-button type="warning" @click.native="submit(10)" class="btns-child">添加为我的跟踪客户</el-button>
        <div class="btns-child">
          <el-button type="primary" @click.native="submit(20)">添加并申请保A</el-button>
          <span class="red">(可保A数量：10)</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import { getCode } from 'api/getOptions'
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
        name: ''
      }],
      cusFromList: [],
      disabled: true
    }
  },
  mounted () {
    this._getCusFrom()
  },
  methods: {
    _getCusFrom () {
      getCode(27).then(res => {
        if (res.data.status === 1) {
          this.cusFromList = res.data.data
        }
      })
    },
    accountNameBlur (val) {
      if (!val) {
        this.$message({
          type: 'error',
          message: '名称重复'
        })
        return
      }
      this.$post('/Company/CompanyIsRepeat', {name: val}).then(res => {
        if (res.data.status === 1) {
          this.disabled = false
        } else {
          this.$message({
            type: 'error',
            message: '名称重复'
          })
        }
      })
    },
    addContact (index) {
      if (index === 0) {
        this.contactList.push({
          contact: '',
          name: ''
        })
      } else {
        this.contactList.splice(index, 1)
      }
    },
    submit (type) {
      if (
        !this.form.cusName ||
        !this.form.buildDate ||
        !this.form.cus ||
        !this.form.cusAddr ||
        !this.form.cusWeb ||
        !this.form.cusFrom ||
        !this.form.trade ||
        !this.form.area ||
        !this.form.businessScope
      ) {
        this.$message({
          type: 'error',
          message: '请填写必填项！'
        })
      }
      this.contactList.forEach(val => {
        val.contact = val.contact.replace(/\D*/g, '')
        if (!val.contact || !val.name) {
          this.$message({
            type: 'error',
            message: '请填写必填项！'
          })
          throw new Error('ignore')
        }
      })
      this.form.cusName = this.form.cusName.replace(/\(/g, '（').replace(/\)/g, '）')
      let params = {

        type: type,
        name: this.form.cusName,
        establishment_date: this.form.buildDate,
        legal_person: this.form.cus,
        address: this.form.cusAddr,
        website: this.form.cusWeb,
        fm: this.form.cusFrom,
        area_id: this.form.area[2],
        cat: this.form.trade[1],
        business_scope: this.form.businessScope,
        remark: this.form.remark,
        jsonContacts: JSON.stringify(this.contactList)
      }
      console.log(params)
      this.$post('/Company/CompanySet', params).then(res => {
        if (res.data.status === 1) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.$router.push('/indexPage/myCustomer')
        }
      })
    }
  },
  components: {
    SelectArea,
    SelectTrade
  }
}
</script>

<style lang="less">
.btns .el-form-item__content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1000px;
  margin-top: -10px;
  & > .btns-child {
    margin-top: 10px;
  }
}
</style>

<style lang="less" scoped>
.add-user {
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
}
</style>
