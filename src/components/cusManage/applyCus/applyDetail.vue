<template>
  <div class="apply-detail child-component-container media-padding">
    <div class="detail-main">
      <div class="cus-info">
        <div class="title">
          <el-button class="title-btn" type="primary">客户信息</el-button>
          <el-button @click.native="$router.go(-1)" class="back" type="warning">返回</el-button>
        </div>
        <div class="line" style="max-width:980px;"></div>
        <el-form ref="form" :model="form" label-width="90px">
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户名称 :">
                <el-input v-model="detailInfo.name" readonly placeholder="客户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="所属行业 :" required>
                <select-trade :echoTrade="form.trade" v-model="form.trade" style="width:100%"></select-trade>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户法人 :">
                <el-input v-model="detailInfo.legal_person" placeholder="客户法人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户地址 :">
                <el-input v-model="detailInfo.address" placeholder="客户地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="成立日期 :">
                <el-date-picker v-model="detailInfo.establishment_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="所属地区 :" required>
                <select-area :echoArea="form.area" v-model="form.area" style="width:100%"></select-area>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户网址 :">
                <el-input v-model="detailInfo.website" placeholder="客户网址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="客户来源 :">
                <el-select v-model="detailInfo.fm" placeholder="客户来源" style="width:100%;">
                  <el-option v-for="(item,index) in fmList" :key="index" :value="item.id" :label="item.code_desc"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="(item,index) in contactList" :key="index" :gutter="20">
            <el-col :md="12" class="maxwidth">
              <el-form-item label="联系人 :" required>
                <el-input v-model="contactList[index].name" placeholder="联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" class="maxwidth">
              <el-form-item label="联系电话 :" required>
                <el-input v-model="contactList[index].contact" placeholder="联系电话" class="contact-phone"></el-input>
                <el-button @click.native="addContact(index)" class="circle-btn" :type="index===0?'success':'danger'" size="mini" :icon="index===0?'fa fa-plus':'fa fa-minus'" circle></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" class="maxwidth">
              <el-form-item label="客户类型 :">
                <el-select v-model="detailInfo.producttype" style="width:100%;">
                  <el-option v-for="(item,index) in cusTypeList" :key="index" :value="item.code_val" :label="item.code_desc"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24" style="max-width:1000px;">
              <el-form-item label="经营范围 :" required>
                <el-input v-model="detailInfo.business_scope" type="textarea" :rows="4" placeholder="经营范围"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <div class="follow-record">
        <div class="title">
          <el-button class="title-btn" type="primary">跟进记录</el-button>
        </div>
        <!-- <div class="line" style="max-width:980px;"></div> -->
        <el-table border :data="followRecordData" style="max-width: 980px;">
          <el-table-column prop="" label="跟进日期" min-width="180">
            <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
          </el-table-column>
          <el-table-column prop="remark" label="跟进备注">
          </el-table-column>
          <el-table-column prop="username" label="跟进人" min-width="100">
          </el-table-column>
        </el-table>
      </div>
      <div class="remark mt10px">
        <span>备注：</span>
        <el-row>
          <el-col :md="24" style="max-width: 980px;">
            <el-input type="textarea" :rows="3" v-model="remark"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="btns mt10px">
        <el-button type="success" @click.native="applyResult(20,200)" :disabled="btnDisabled">跟进</el-button>
        <el-button type="primary" @click.native="applyResult(10,0)" :disabled="btnDisabled">转跟踪</el-button>
        <el-button type="warning" @click.native="applyResult(-10,0)" :disabled="btnDisabled">暂不联系</el-button>
        <el-button type="danger" @click.native="applyResult(-100,0)" :disabled="btnDisabled">永久放弃</el-button>
        <el-button type="info" @click.native="applyResult(-1,0)" :disabled="btnDisabled">空号/错号</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import { getByCode } from 'api/getOptions'
const userId = cookie.get('userId')
export default {
  data () {
    return {
      detailInfo: {},
      form: {
        trade: [],
        area: []
      },
      fmList: [],
      cusTypeList: [],
      contactList: [
        {
          contact: '',
          phone: ''
        }
      ],
      followRecordData: [],
      remark: '',
      maxFollow: 0,
      btnDisabled: false
    }
  },
  created () {
    this.receiveData = this.$route.query.data
    console.log(this.receiveData)
    if (!this.receiveData.applyid) {
      this.$router.go(-1)
      return
    }
    this._getDetail()
  },
  mounted () {
    this._getFllowRecord()
    getByCode(27).then(res => {
      this.fmList = res.data.data
    })
    getByCode(10).then(res => {
      this.cusTypeList = res.data.data
    })
  },
  methods: {
    applyResult (applytype, cat) {
      let params = {
        cid: this.receiveData.companyid,
        companylogid: this.receiveData.companylogid,
        applytype: applytype,
        remark: this.remark,
        applyid: this.receiveData.applyid,
        cat: cat,
        pid: this.detailInfo.cpid
      }
      if (applytype === 20 && !this.remark) {
        this.$message({
          type: 'warning',
          message: '请填写跟进备注'
        })
        return
      }
      this.$post('/Apply.do?limit', params).then(res => {
        if (applytype === 10) {
          this.turnFollow()
        }
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.btnDisabled = true
          // this.$router.go(0)
        }
      })
    },
    turnFollow () { // 转跟踪
      this._isMaxFollow().then(res => {
        console.log(res)
        if (!res) {
          this.$get('/Company.do?CanChangeToB', {
            companyid: this.receiveData.companyid,
            companylogid: this.receiveData.companylogid
          }).then(res => {
            if (res.data[0].data) {
              this.$confirm('请确认是否转跟踪?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
                .then(() => {
                  this.$post('/Company.do?ChangeToB', {
                    companyid: this.receiveData.companyid,
                    companylogid: this.receiveData.companylogid
                  }).then(res => {
                    if (res.data[0].data) {
                      this.$message({
                        type: 'success',
                        message: '跟踪成功！'
                      })
                    }
                  })
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  })
                })
            } else {
              this.$message({
                type: 'error',
                message: '您已跟踪过该客户！'
              })
            }
          })
        }
      })
    },
    // 判断是否达到跟踪上限(跟踪上限已取消)
    _isMaxFollow () {
      return new Promise(resolve => {
        this.$get('/Product.do?GetNumberById', { id: userId }).then(res => {
          try {
            this.maxFollow = res.data[1].data
          } catch (error) {
            this.maxFollow = 0
          }
          if (this.maxFollow <= 0) {
            this.$message({
              type: 'error',
              message: '您已达到跟踪上限！'
            })
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },
    _getDetail () {
      this.$post('/CustomerCheck.do?customlist', {
        cid: this.receiveData.companyid,
        companylogid: this.receiveData.companylogid
      }).then(res => {
        this.detailInfo = res.data[0].data[0]
        this.form.trade = [this.detailInfo.cid, this.detailInfo.bid]
        this.form.area = [
          this.detailInfo.province,
          this.detailInfo.city,
          this.detailInfo.county
        ]
        this.contactList = res.data[1].data
        console.log(this.form.area)
      })
    },
    _getFllowRecord () {
      let params = {
        cid: this.receiveData.companyid,
        cat: 200,
        companylogid: this.receiveData.companylogid
      }
      this.$post('/follow.do?up', params).then(res => {
        if (res.data.success) {
          this.followRecordData = res.data.data
        }
      })
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
    }
  },
  components: { SelectArea, SelectTrade }
}
</script>

<style lang="less" scoped>
.apply-detail {
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
  .title {
    display: flex;
    justify-content: space-between;
    max-width: 980px;
    .title-btn {
      border-top-right-radius: 15px;
    }
  }
}
</style>
