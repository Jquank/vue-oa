<template>
  <div class="add-user component-container media-padding">
    <el-form ref="form" :model="form" :label-position="labelPosition" :rules="rules" label-width="90px">
      <el-row>
        <el-col :md="24">
          <el-form-item label="产品类型 :">
            <el-radio-group v-model="form.proType">
              <el-radio v-for="pro in products"  :label="pro.id" :key="pro.id">{{pro.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户名称 :" prop="cusName">
            <el-input @blur="accountNameBlur" v-model="form.cusName" placeholder="客户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="成立日期 :" prop="buildDate">
            <el-date-picker v-model="form.buildDate" value-format="yyyy/MM/dd" :disabled="disabled" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户法人 :" prop="cus">
            <el-input v-model="form.cus" :disabled="disabled" placeholder="客户法人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="客户地址 :" prop="cusAddr">
            <el-input v-model="form.cusAddr" :disabled="disabled" placeholder="客户地址"></el-input>
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
          <el-form-item label="客户来源 :" prop="cusFrom">
            <el-select v-model="form.cusFrom" :disabled="disabled" placeholder="客户来源" style="width:100%;">
              <el-option v-for="(item,index) in cusFromList" :key="index" :value="item.id" :label="item.code_desc"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="所属行业 :" prop="trade">
            <select-trade v-model="form.trade" style="width:100%"></select-trade>
          </el-form-item>
        </el-col>
        <el-col :md="12" class="maxwidth">
          <el-form-item label="所属地区 :" prop="area">
            <select-area v-model="form.area" style="width:100%"></select-area>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" class="maxwidth">
          <el-form-item label="经营范围 :" prop="businessScope">
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
        <el-button type="primary" @click.native="submit(0)" :disabled="subDisable" class="btns-child">添加为公共客户</el-button>
        <el-button type="warning" @click.native="submit(10)" :disabled="subDisable" class="btns-child">添加为我的跟踪客户</el-button>
        <div class="btns-child">
          <el-button type="success" @click.native="submit(20)" :disabled="subDisable">添加并申请保A</el-button>
          <span class="red">(可保A数量：{{availableBaoA}})</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import {appMark} from 'common/js/utils'
export default {
  data () {
    return {
      labelPosition: 'right',
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
        remark: '',
        proType: 'DS'
      },
      contactList: [{
        contact: '',
        name: ''
      }],
      cusFromList: [],
      disabled: true,
      availableBaoA: 0,
      availableFollow: 0,
      subDisable: false,
      products: [{}],

      rules: {
        cusName: [],
        buildDate: [],
        cus: [],
        cusAddr: [],
        cusWeb: [],
        cusFrom: [],
        trade: [],
        area: [],
        businessScope: []
      }
    }
  },
  created () {
    if (appMark()) {
      this.labelPosition = 'top'
    }
    for (let key in this.rules) {
      if (key === 'cusFrom' || key === 'trade' || key === 'area') {
        this.rules[key].push({required: true, message: '请选择必选项', trigger: 'change'})
      } else {
        this.rules[key].push({required: true, message: '请输入必填项内容', trigger: 'blur'})
      }
    }
    this._getProducts()
  },
  mounted () {
    this._getNum()
  },
  methods: {
    _getProducts () {
      this.$get('/Product.do?proget', {parentid: '0'}).then(res => {
        if (res.data.success) {
          this.products = res.data.data
        }
      })
    },
    // 获取当前人的保a和跟踪可用数量
    _getNum () {
      this.$get('/Product.do?GetNumberById', { id: cookie.get('userId') }).then(res => {
        this.availableBaoA = res.data[0].data || 0
        this.availableFollow = res.data[1].data || 0
      })
    },
    // 校验公司名
    accountNameBlur () {
      if (!this.form.cusName) {
        this.$message({
          type: 'error',
          message: '请填写正确的公司名'
        })
        return
      }
      this.$post('/Company.do?compget', {companyname: this.form.cusName}).then(res => {
        // dsj //eslint-disable-line
        if (!res.data[0].data.length) {
          this.disabled = false
          this.cusFromList = res.data[1].data
        } else {
          this.$message({
            type: 'error',
            message: '该公司已被录入'
          })
        }
      })
    },
    // 加号
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
      if (type === 10 && this.availableFollow <= 0) {
        this.$message({
          type: 'error',
          message: '您已达到跟踪上限'
        })
        return
      }
      if (type === 20 && this.availableBaoA <= 0) {
        this.$message({
          type: 'error',
          message: '您已达到保A上限'
        })
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.contactList.forEach(val => {
            val.contact = val.contact.replace(/\D*/g, '')
            if (!val.contact || !val.name) {
              this.$message({
                type: 'error',
                message: '请填写联系人信息！'
              })
              throw new Error('ignore')
            }
          })
          this.form.cusName = this.form.cusName.replace(/\(/g, '（').replace(/\)/g, '）')
          let params = {
            type: type,
            name: this.form.cusName,
            establishment: this.form.buildDate,
            legal_person: this.form.cus,
            address: this.form.cusAddr,
            website: this.form.cusWeb,
            fm: this.form.cusFrom,
            area: this.form.area[2],
            cat: this.form.trade[1],
            business_scope: this.form.businessScope,
            remark: this.form.remark,
            contact: this.contactList,
            imgurl: '',
            pid: this.form.proType
          }
          this.$post('/Company.do?compset', params).then(res => {
            if (res.data[0].success) {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$router.push('/indexPage/myCus')
            } else {
              this.$message({
                type: 'error',
                message: '添加失败'
              })
            }
          })
        } else {
          return false
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
.add-user .btns .el-form-item__content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1000px;
  margin-top: -10px;
  & > .btns-child {
    margin-top: 10px;
  }
  .el-button+.el-button{
    margin-left: 0;
  }
}
</style>

<style lang="less" scoped>
.add-user {
  .maxwidth {
    max-width: 500px;
  }
  .contact-phone {
    width: calc(~'(100% - 35px)');
  }
  .circle-btn {
    width: 26px;
    height: 26px;
  }
}
</style>
