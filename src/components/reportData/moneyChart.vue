<template>
  <div class="visit-record component-container media-padding">

    <div class="visit-search mt-10px">
      <el-input v-model="cusName" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">公司名称:</template>
      </el-input>
      <el-input v-model="bdAccount" class="visit-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">百度账号:</template>
      </el-input>
      <auto-select :key="key_business" :classMark="'key_business'" title="业务类型" v-model="businessType" class="visit-item item-width">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="(item,index) in businessList" :key="index" :label="item.code_desc" :value="item.code_val"></el-option>
      </auto-select>
    </div>

    <div class="visit-search">
      <el-date-picker v-model="tallyDate" format="yyyy/MM/dd HH:mm" value-format="yyyy/MM/dd HH:mm" :unlink-panels="true" type="datetimerange" range-separator="至" start-placeholder="记账日期" end-placeholder="记账日期" class="visit-item" style="width:300px;"></el-date-picker>
      <div class="visit-item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
      <div class="visit-item export">
        <el-button @click.native="editChart({})" type="primary">新增</el-button>
        <el-button @click.native="exportExcell" type="warning">导 出</el-button>
      </div>
    </div>

    <el-table id="money-chart-table" :span-method="arraySpanMethod" stripe border :data="invoiceList" class="table-width" max-height="550">
      <el-table-column prop="billtime" label="记账日期" fixed width="90">
        <span slot-scope="scope">{{scope.row.billtime | timeFormat1}}</span>
      </el-table-column>
      <el-table-column prop="fullname" label="部门" fixed width="100">
      </el-table-column>
      <el-table-column prop="username" label="提单员" fixed width="80">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span><span>{{scope.row.bindName?('('+scope.row.bindName+')'): ((scope.row.true_name && scope.row.true_name!=scope.row.username)?('('+scope.row.true_name+')'):'')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="typename" label="类型" fixed width="120">
        <span slot-scope="scope">{{(scope.row.typename+''+(scope.row.addtype||'')) || ''}}</span>
      </el-table-column>
      <el-table-column prop="companyname" label="公司名称" fixed min-width="120">
      </el-table-column>
      <el-table-column prop="baiducount" label="用户名" fixed width="100">
        <span slot-scope="scope">{{scope.row.addtype != '新开' ? scope.row.baiducount : ''}}</span>
      </el-table-column>

      <el-table-column label="现金" align="center">
        <el-table-column prop="XJ" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.XJ | currency}}</span>
            <span else>{{scope.row.XJ_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="XJTIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.XJTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="糯米现金" align="center">
        <el-table-column prop="NMXJ" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.NMXJ | currency}}</span>
            <span else>{{scope.row.NMXJ_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="NMXJTIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.NMXJTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="招行" align="center">
        <el-table-column prop="ZH" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.ZH | currency}}</span>
            <span else>{{scope.row.ZH_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ZHTIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.ZHTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="糯米招行" align="center">
        <el-table-column prop="NMZH" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.NMZH | currency}}</span>
            <span else>{{scope.row.NMZH_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="NMZHTIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.NMZHTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="银联" align="center">
        <el-table-column prop="YL" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.YL | currency}}</span>
            <span else>{{scope.row.YL_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="YLTIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.YLTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="糯米银联" align="center">
        <el-table-column prop="NMYL" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.NMYL | currency}}</span>
            <span else>{{scope.row.NMYL_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="NMYLTIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.NMYLTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="黄华中行" align="center">
        <el-table-column prop="HHZH" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.HHZH | currency}}</span>
            <span else>{{scope.row.HHZH_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="HHZHTIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.HHZHTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="中行1" align="center">
        <el-table-column prop="ZH1" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.ZH1 | currency}}</span>
            <span else>{{scope.row.ZH1_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ZH1TIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.ZH1TIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="阳光快付" align="center">
        <el-table-column prop="YGKF" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.YGKF | currency}}</span>
            <span else>{{scope.row.YGKF_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="YGKFTIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.YGKFTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="糯米快付" align="center">
        <el-table-column prop="NMKF" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.NMKF | currency}}</span>
            <span else>{{scope.row.NMKF_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="NMKFTIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.NMKFTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <el-table-column label="工行" align="center">
        <el-table-column prop="GH" label="金额" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.GH | currency}}</span>
            <span else>{{scope.row.GH_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="GHTIME" label="时间" width="90" align="center">
          <span slot-scope="scope">{{scope.row.GHTIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column>
      <!-- <el-table-column label="百度币">
        <el-table-column prop="BDBI" label="金额" width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.mark">{{scope.row.BDBI | currency}}</span>
            <span else>{{scope.row.BDBI_count | currency1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="BDBITIME" label="时间" width="90">
          <span slot-scope="scope">{{scope.row.BDBITIME | timeFormat1}}</span>
        </el-table-column>
      </el-table-column> -->
      <el-table-column prop="sum" label="合计" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.sum | currency}}</span>
          <span else>{{scope.row.sum_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="profit" label="毛利" width="100">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.profit | currency}}</span>
          <span else>{{scope.row.profit_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addmoney" label="实际加款" width="120">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{(scope.row.addTime && 500>scope.row.type) ? scope.row.addmoney : '' | currency}}</span>
          <span else>{{scope.row.addmoney_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="加款时间" width="90">
        <span slot-scope="scope">{{scope.row.addTime | timeFormat1}}</span>
      </el-table-column>
      <el-table-column prop="serviceyear" label="服务费年限" width="85">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.type >= 500 ? scope.row.serviceyear : ''}}</span>
          <span else>{{scope.row.serviceyear_count}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activity" label="活动类型" width="70">
      </el-table-column>
      <el-table-column prop="xjq" label="现金券" width="90">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.xjq | currency}}</span>
          <span else>{{scope.row.xjq_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="voucher" label="代金券" width="90">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.voucher | currency}}</span>
          <span else>{{scope.row.voucher_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="voucher111" label="代金券使用时间" width="70">
      </el-table-column>
      <el-table-column prop="kefadept" label="部门" width="100">
        <template slot-scope="scope">
           <span v-if="scope.row.addtype==='续费'&&(scope.row.kefadept || '').indexOf('客发')>-1">{{ scope.row.kefadept}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="kefaName" label="商务续费" width="80">
        <template slot-scope="scope">
           <span v-if="scope.row.addtype==='续费'&&(scope.row.kefadept || '').indexOf('客发')>-1">{{ scope.row.kefaName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="catName" label="行业类型" width="90">
      </el-table-column>
      <el-table-column prop="oldbillTime" label="新开提单时间" width="110">
        <span slot-scope="scope">{{scope.row.oldbillTime | timeFormat1}}</span>
      </el-table-column>
      <el-table-column prop="web" label="网站完成" width="70">
      </el-table-column>
      <el-table-column prop="invoice_type" label="开发票" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.invoice_type==-10?'不需要':''}}</span>
          <span>{{scope.row.invoice_type==-1?'暂不需要':''}}</span>
          <span>{{scope.row.invoice_type==0?'需要':''}}</span>
          <span>{{scope.row.invoice_type==10?'已开':''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="refund" label="退款" width="90">
        <template slot-scope="scope">
          <span v-if="!scope.row.mark">{{scope.row.refund | currency}}</span>
          <span else>{{scope.row.refund_count | currency1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180">
      </el-table-column>
      <el-table-column prop="" label="操作" width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.$index!==invoiceList.length-1" @click.native="editChart(scope.row)" type="warning" class="xsbtn">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="invoiceUrl" :sendParams="invoiceParams" @updateList="updateInvoiceList"></page>

    <!-- 新增，编辑弹窗 -->
    <el-dialog :title="'新增'" :visible.sync="editDialog" width="900px">
      <el-form ref="echo" :model="echo" :label-width="labelWidth">
        <el-row :gutter="10">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="记账日期 :">
              <el-date-picker v-model="echo.billtime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="部门 :">
              <el-input v-model="echo.fullname" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="提单员 :">
              <el-input v-model="echo.username" disabled class="input-btn"></el-input>
              <el-button @click.native="selUser" type="primary" class="xsbtn">选择</el-button>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="类型 :">
              <el-col :md="12">
                <el-select v-model="echo.type">
                  <el-option v-for="item in productList" :key="item.code_val" :value="item.code_val" :label="item.code_desc"></el-option>
                </el-select>
              </el-col>
              <el-col :md="12">
                <el-select v-model="echo.addtype">
                  <el-option value="新开" label="新开"></el-option>
                  <el-option value="续费" label="续费"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="公司名称 :">
              <el-input v-model="echo.companyname" class="input-btn"></el-input>
              <el-button @click.native="selCompanyDialog=true" type="primary" class="xsbtn">选择</el-button>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="用户名 :">
              <el-input v-model="echo.baiducount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="合计 :">
              <el-input v-model="echo.sum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="毛利 :">
              <el-input v-model="echo.profit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="应收账款 :">
              <el-input v-model="echo.arrears"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="实际加款 :">
              <el-input v-model="echo.addmoney"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="加款时间 :">
              <el-date-picker v-model="echo.addTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="服务费年限 :">
              <el-input v-model="echo.serviceyear"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="活动类型 :">
              <el-input v-model="echo.activity1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="现金券 :">
              <el-input v-model="echo.xjq2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="代金券 :">
              <el-input v-model="echo.voucher2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="代金券使用时间 :">
              <el-date-picker v-model="echo.aaa" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="12" class="maxwidth">
            <el-form-item label="退款 :">
              <el-input v-model="echo.refund"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" class="maxwidth">
            <el-form-item label="备注 :">
              <el-input v-model="echo.remark" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" class="maxwidth">
            <el-form-item label="金额明细 :">
              <el-table :data="moneyDetailList" border stripe style="width: 100%">
                <el-table-column prop="code_desc" label="银行类型"></el-table-column>
                <el-table-column prop="split_amount" label="金额">
                  <span slot-scope="scope">{{scope.row.split_amount | currency}}</span>
                </el-table-column>
                <el-table-column prop="tm" label="时间" min-width="135">
                  <span slot-scope="scope">{{scope.row.tm}}</span>
                </el-table-column>
                <el-table-column prop="tm" label="操作" width="80" align="center">
                  <template slot="header" slot-scope="scope">
                    <el-button @click.native="addMoneyDetailDialog=true" icon="fa fa-plus" type="success" class="xsbtn"> 添加</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button @click.native="removeMoneyDetail(scope.$index)" icon="fa fa-minus" type="danger" class="xsbtn"> 移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <div class="text-center">
              <el-button @click.native="subEditChart" type="primary">提 交</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 添加弹窗 -->
    <el-dialog :title="'添加金额明细'" :visible.sync="addMoneyDetailDialog" width="400px">
      <el-form label-width="80px">
        <el-form-item label="银行类型 :">
          <el-select v-model="add_code_desc" value-key="code_val" style="width:100%">
            <el-option v-for="item in bankList" :key="item.code_desc" :value="item" :label="item.code_desc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额 :">
          <el-input v-model="add_money"></el-input>
        </el-form-item>
        <el-form-item label="时间 :">
          <el-date-picker v-model="add_time" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" style="width:100%"></el-date-picker>
        </el-form-item>
        <div class="text-center">
          <el-button @click.native="confirmAdd" type="success" size="mini">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 选择人员弹窗 -->
    <el-dialog :modal-append-to-body="false" title="选择人员" :visible.sync="selUserDialog" width="550px">
      <select-user @userId="getUserId" @closeDialog="selUserDialog=false"></select-user>
    </el-dialog>

    <!-- 选择公司弹窗 -->
    <el-dialog :modal-append-to-body="false" title="选择公司" :visible.sync="selCompanyDialog" width="900px">
      <el-input @click.native.prevent="searchCompany($event)" @keydown.enter.native="searchCompany('enter')" v-model="comForm.companyName" style="margin-top:10px;" placeholder="搜索客服">
        <span slot="append" class="search-service">搜索客服</span>
      </el-input>
      <el-table id="cus-out-table" :data="comList" class="table-width">
        <el-table-column prop="companyname" label="客户名称" min-width="160">
        </el-table-column>
        <el-table-column prop="" label="客户类型" width="80">
          <span slot-scope="scope">{{scope.row.producttype | cusState('cusType')}}</span>
        </el-table-column>
        <el-table-column prop="companyname" label="公司状态">
          <span slot-scope="scope">{{scope.row.ctype | cusState('cusStatus')}}</span>
        </el-table-column>
        <el-table-column prop="" label="业务状态">
          <span slot-scope="scope">{{scope.row.cltype + '' + scope.row.cltype | businessStatus}}</span>
        </el-table-column>
        <el-table-column prop="kefa" label="所属商务">
        </el-table-column>
        <el-table-column prop="kefu" label="所属客服">
        </el-table-column>
        <el-table-column prop="baidu_account" label="百度账号" min-width="100">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="confirmSelCompany(scope.row)" type="success" class="xsbtn">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :simpleLayout="'total, prev, next, jumper'" class="page" :url="comUrl" :sendParams="comParams" @updateList="getComList"></page>
    </el-dialog>
  </div>
</template>

<script>
import AutoSelect from 'base/autoSelect/autoSelect'
import Page from 'base/page/page'
import {getByCode} from 'api/getOptions'
import {timeFormat} from 'common/js/filters'
import SelectUser from 'base/selectUser/selectUser'
import {appMark} from 'common/js/utils'
export default {
  data () {
    return {
      labelWidth: '130px',
      invoiceList: [],
      invoiceUrl: '/wf.do?moneydetail',
      invoiceParams: {},

      cusName: '',
      bdAccount: '',
      businessList: [],
      key_business: '',
      businessType: '',
      tallyDate: [],

      editDialog: false,
      echo: {},
      selUserDialog: false,
      productList: [],
      bankList: [],
      moneyDetailList: [],
      addMoneyDetailDialog: false,
      add_code_desc: '',
      add_money: 0,
      add_time: '',

      selCompanyDialog: false,
      comForm: {
        companyName: ''
      },
      comList: [],
      comUrl: '/Search.do?ByBaiduAccount',
      comParams: {}
    }
  },
  created () {
    if (appMark()) {
      this.labelWidth = '50px'
    }
  },
  mounted () {
    this._getBusinessList()
  },
  methods: {
    subEditChart () {
      let params = {}
      Object.keys(this.echo).forEach(val => {
        params[val] = this.echo[val]
      })
      params.bankReceive = this.moneyDetailList
      console.log(params)
      this.$post('/wf.do?receiveCWSet', params).then(res => {
        if (res.data.success) {
          this.editDialog = false
          this.search()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    editChart (data) {
      this.echo = data
      this.echo.billtime = timeFormat(data.billtime)
      this.echo.addTime = timeFormat(data.addTime)
      getByCode(52).then(res => {
        this.productList = res.data.data
      })
      getByCode(42).then(res => {
        this.bankList = res.data.data
        this.moneyDetailList = this.bankList.map(val => {
          return {
            tm: data[val.remark + 'TIME'],
            code_desc: val.code_desc,
            split_amount: data[val.remark],
            type: val.code_val
          }
        })
        this.moneyDetailList = this.moneyDetailList.filter(val => !!val.split_amount)
      })
      this.editDialog = true
    },
    confirmAdd () {
      let obj = {
        tm: this.add_time,
        code_desc: this.add_code_desc.code_desc,
        split_amount: this.add_money,
        type: this.add_code_desc.code_val
      }
      this.moneyDetailList = this.moneyDetailList.filter(val => val.code_desc !== obj.code_desc)
      this.moneyDetailList.push(obj)
      this.addMoneyDetailDialog = false
    },
    removeMoneyDetail (index) {
      this.moneyDetailList.splice(index, 1)
    },
    selUser () {
      this.selUserDialog = true
    },
    getUserId (id, name) {
      this.echo.username = name
      this.echo.uid = id
    },
    getComList (res) {
      this.comList = res.data[0].data
    },
    searchCompany (e) {
      if (e === 'enter' || e.target.nodeName !== 'INPUT') {
        this.comParams = {
          'companyname': this.comForm.companyName
        }
      }
    },
    confirmSelCompany (data) {
      this.echo.companyname = data.companyname
      this.echo.cid = data.cpid
      this.selCompanyDialog = false
    },
    search () {
      this.invoiceParams = {
        code_val: this.businessType,
        starttime: this.tallyDate[0],
        endtime: this.tallyDate[1],
        companyname: this.cusName,
        baidu_account: this.bdAccount
      }
    },
    reset () {
      this.cusName = ''
      this.bdAccount = ''
      this.tallyDate = []
      this.businessType = ''
      this.key_business = new Date() + ''
    },
    _getBusinessList () {
      getByCode(52).then(res => {
        if (res.data.success) {
          this.businessList = res.data.data
        }
      })
    },
    exportExcell () {
      this.$export('/wf.do?exportexcel', this.invoiceParams)
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (row.mark === 'lastRow') {
        if (columnIndex === 0) {
          return [1, 6]
        } else if (columnIndex > 0 && columnIndex < 6) {
          return [0, 0]
        }
      }
    },
    updateInvoiceList (res) {
      this.invoiceList = res.data[0].data
      let total = res.data[2].data
      total.mark = 'lastRow' // 标志最后一行
      total.billtime = '合 计'
      this.invoiceList.push(total)
    }
  },
  components: {
    AutoSelect,
    Page,
    SelectUser
  }
}
</script>
<style lang="less">
.money-chart-table{
  .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border-right: 1px solid rgb(155, 152, 152);
  }
  .el-table td,
  .el-table th, .el-table th.is-leaf {
    border-bottom: 1px solid rgb(155, 152, 152);
  }
}
</style>
<style lang="less" scoped>
.visit-record {
  .visit-search {
    display: flex;
    flex-wrap: wrap;
    // margin-top: -10px;
    .visit-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
  }
  // .maxwidth {
  //   max-width: 500px;
  // }
  .export{
     flex-grow: 1;
    text-align: right;
    padding-right: 30px;
  }
  .input-btn{
    width: calc(~"(100% - 46px)");
  }
}
</style>
