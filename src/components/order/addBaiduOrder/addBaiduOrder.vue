<template>
  <div class="addbaidu-order">
    <p>
      <span>订单管理 / 新增百度订单</span>
    </p>
    <div class="order-content">
      <el-form ref="form" :model="form" label-width="180px" size="small">
        <el-form-item label="公司名称" required>
          <el-input v-model="form.cName" :disabled="true" style="width:300px;" placeholder="点击选择按钮选择公司"></el-input>
          <el-button type="primary" @click.native="selCompany">选择</el-button>
        </el-form-item>

        <el-form-item label="到款记录" required>
          <el-select v-model="form.record" placeholder="请选择到款记录" style="width:300px;">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="客户网站信息">
          <el-input v-model="form.pcWeb" style="width:300px;" placeholder="pc端网址"></el-input>
          <el-input v-model="form.phoneWeb" style="width:300px;" placeholder="手机端网址"></el-input>
        </el-form-item>

        <el-form-item label="联系人信息" required>
          <el-row v-for="(item,index) in form.contactList" :key="index" :class="{'mt10px':index!==0}">
            <el-input v-model="item.contact" placeholder="联系人" style="width:145px;">
              <el-select v-model="item.contact" slot="append">
                <el-option label="餐厅名" value="餐厅名"></el-option>
                <el-option label="订单号" value="订单号"></el-option>
                <el-option label="用户电话" value="用户电话"></el-option>
              </el-select>
            </el-input>
            <el-input v-model="item.phoneNumber" style="width:150px;" placeholder="手机号码"></el-input>
            <el-input v-model="item.fixedNumber" style="width:150px;" placeholder="座机号码"></el-input>
            <el-input v-model="item.email" style="width:145px;" placeholder="邮箱"></el-input>
            <el-button :type="index===0?'success':'danger'" size="mini" circle class="ml10px" :icon="index===0?isPlusIcon:isMinusIcon" @click.native="addContact(index)">
            </el-button>
          </el-row>
        </el-form-item>

        <el-form-item label="客户地址" required>
          <el-input v-model="form.address" style="width:300px;" placeholder="客户地址"></el-input>
        </el-form-item>

        <el-form-item label="网建类型" required>
          <el-radio-group v-model="form.wjType">
            <el-radio label="客建双站"></el-radio>
            <el-radio label="自建双站"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="客户类型" required>
          <el-radio-group v-model="form.cusType">
            <el-radio label="新客户"></el-radio>
            <el-radio label="老客户"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否需要发票" required>
          <el-radio-group v-model="form.isInvoice">
            <el-radio label="不需要"></el-radio>
            <el-radio label="暂不需要"></el-radio>
            <el-radio label="需要"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="合同编号" required>
          <el-select v-model="form.record" placeholder="请选择到款记录" style="width:198px;">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
          <el-select v-model="form.record" placeholder="请选择到款记录" style="width:198px;">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
          <el-select v-model="form.record" placeholder="请选择到款记录" style="width:198px;">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商务信息" required>
          <el-input v-model="form.shangWuName" :disabled="true" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="订单详情" required>
          <el-tabs type="border-card" style="max-width:750px;">
            <el-tab-pane label="企业资质">
              <el-card shadow="always" class="card-tips">
                [说明]：根据订单业务类型，上传需要的资质，图片格式为：jpg、png、jpeg，图片大小在3M以下。
              </el-card>
              <el-row style="margin-top:10px;">
                <el-select v-model="form.zizhiName" style="width:80%;">
                  <el-option label="餐厅名" value="1"></el-option>
                  <el-option label="订单号" value="2"></el-option>
                  <el-option label="用户电话" value="3"></el-option>
                </el-select>
                <el-button type="primary">添加资质</el-button>
              </el-row>
              <el-row style="margin-top:10px;">
                <el-table border :data="form.zizhiList" style="width: 100%;min-height:200px;">
                  <el-table-column prop="zizhiType" label="资质类型">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <!-- <el-button type="primary">上传</el-button> -->
                      <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                      </el-upload>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="到款记录">
              123
            </el-tab-pane>
          </el-tabs>
        </el-form-item>

        <el-form-item label="">
          <el-row style="width:750px;text-align:right;">
            <el-button type="warning">仅降E</el-button>
            <el-button type="primary">降E并提单</el-button>
          </el-row>
        </el-form-item>
      </el-form>

      <!-- 选择公司弹窗 -->
      <el-dialog title="选择下单客户" :visible.sync="comDialog.selCompanyDialog" width="650px">
        <el-input placeholder="请输入公司名进行搜索" v-model="comDialog.handleCompanyName">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table :data=comDialog.myCompany class="mt10px">
          <el-table-column property="name" label="客户名称" width="300"></el-table-column>
          <el-table-column property="" label="客户类型" width="100">
            <span slot-scope="scope">{{scope.row.producttype | cusStatus}}</span>
          </el-table-column>
          <el-table-column property="username" label="所属商务" width="100"></el-table-column>
          <el-table-column property="username" label="操作"></el-table-column>
        </el-table>
        <page class="pagination" :url="comDialog.url" :sendparams="comDialog.params"
          @updateList="updateMyCompanyList" :key="key">
        </page>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { serverUrl } from '@/api/config'
import Page from '@/base/page/page'

const ORDER_TYPE = 'BAITUI'
export default {
  data () {
    return {
      form: {
        cName: '',
        record: '',
        pcWeb: '',
        phoneWeb: '',
        contactList: [
          {
            contactId: '',
            contact: '',
            phoneNumber: '',
            fixedNumber: ''
          }
        ],
        email: '',
        address: '',
        wjType: '',
        cusType: '',
        isInvoice: '',
        shangWuName: '',
        zizhiName: '',
        zizhiList: [
          {
            zizhiType: '企业直招'
          }
        ]
      },
      fileList: [],
      isPlusIcon: 'el-icon-plus',
      isMinusIcon: 'el-icon-minus',
      comDialog: {
        selCompanyDialog: false,
        handleCompanyName: '',
        myCompany: [],
        url: serverUrl + '/order.do?Add',
        params: {pid: ORDER_TYPE}
      }
    }
  },
  computed: {
    key () {
      return '' + new Date()
    },
    ...mapGetters([
      'productType'
    ])
  },
  mounted () {
    console.log(this.productType)
    console.log(this.key)
  },
  methods: {
    selCompany () {
      this.comDialog.selCompanyDialog = true
    },
    addContact (index) {
      if (index === 0) {
        this.form.contactList.push({})
      } else {
        this.form.contactList.splice(index, 1)
      }
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    updateMyCompanyList (data) {
      this.comDialog.myCompany = data
    }
  },
  components: {Page}
}
</script>

<style lang="less" scoped>
.order-content {
  background: #fff;
  padding: 20px;
  .card-tips {
    color: red;
    background: wheat;
  }
  .pagination {
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
