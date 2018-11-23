<template>
  <div class="view-detail child-component-container media-padding">
    <div class="detail-content">
      <el-tabs type="border-card" @tab-click="tab">
        <!-- 订单基本信息 -->
        <el-tab-pane v-if="pid==='BAITUI'" label="百度订单基本信息">
          <el-row class="text-right mb10px" v-if="permissions.indexOf('6z')>-1">
            <el-button type="warning" @click.native="changeInfo" class="xsbtn">修改基本信息</el-button>
          </el-row>
          <el-table :data="baituiBasicInfo" border class="table-width">
            <el-table-column prop="type" label="信息分类" :width="tableFirstColumWidth">
            </el-table-column>
            <el-table-column prop="" label="详细信息">
              <div slot-scope="scope">
                <div v-if="scope.$index===0">
                  <div class="row-container">
                    <div>
                      <b>公司名称：</b>
                      <span>{{moneyRecord.companyname}}</span>
                    </div>
                    <div>
                      <b>PC网址：</b>
                      <a :href="(orderInfo.pcwebsite.indexOf('http')>-1?'':'http://')+orderInfo.pcwebsite" target="_blank">{{orderInfo.pcwebsite}}</a>
                    </div>
                    <div>
                      <b>手机网址：</b>
                      <a :href="(orderInfo.mobilewebsite.indexOf('http')>-1?'':'http://')+orderInfo.mobilewebsite" target="_blank">{{orderInfo.mobilewebsite}}</a>
                    </div>
                  </div>
                  <div v-for="(c,index) in contactInfoList" :key="index" class="mt10px row-container">
                    <div>
                      <b>联系人{{index?index:''}}：姓名{{index?index:''}}：</b>
                      <span>{{c.contactname}}</span>
                    </div>
                    <div>
                      <b>手机{{index?index:''}}：</b>
                      <span>{{c.contactnumber}}</span>
                    </div>
                    <div>
                      <b>座机{{index?index:''}}：</b>
                      <span>{{c.telphone}}</span>
                    </div>
                    <div>
                      <b>邮箱{{index?index:''}}：</b>
                      <span>{{c.mailnumber}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>客户类型：</b>
                      <span>{{contactInfoList[0].producttype | cusStatus}}{{contactInfoList[0].productnumber}}</span>
                    </div>
                    <div>
                      <b>对公账号：</b>
                      <span>{{orderInfo.receiveaccount}}</span>
                    </div>
                    <div>
                      <b>开户行：</b>
                      <span>{{orderInfo.receivebank}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>公司地址：</b>
                      <span>{{orderInfo.companyaddress}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===1">
                  <div class="row-container">
                    <div>
                      <b>网建类型：</b>
                      <span>{{productInfo[0].websitetype | wjType}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===2">
                  <div class="row-container">
                    <div>
                      <b>百度订单金额：</b>
                      <span>{{orderInfo.amount_real | currency1}}</span>
                    </div>
                    <div>
                      <b>客户类型：</b>
                      <span>{{orderInfo.custom_type ? "老客户" : "新客户"}}</span>
                    </div>
                  </div>
                  <!-- 老合同 -->
                  <div v-if="orderInfo.ordernumber.indexOf('BJHT')==-1" class="mt10px row-container">
                    <div>
                      <b>百度推广服务订单编号：</b>
                      <span>{{orderInfo.ordernumber}}</span>
                    </div>
                    <div>
                      <b> 百度推广首消授权书：</b>
                      <span>{{orderInfo.order2number ? orderInfo.order2number : "无首消授权书"}}</span>
                    </div>
                    <div>
                      <b> 百度推广专业服务协议：</b>
                      <span>{{orderInfo.order3number}}</span>
                    </div>
                  </div>
                  <!-- 新合同 -->
                  <div v-if="orderInfo.ordernumber.indexOf('BJHT')>-1" class="mt10px row-container">
                    <div>
                      <b>百度推广服务合同：</b>
                      <span>{{orderInfo.ordernumber}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===3">
                  <div class="row-container">
                    <div>
                      <b>姓名：</b>
                      <span>{{originUser.name}}</span>
                    </div>
                    <div>
                      <b>部门：</b>
                      <span>{{originUser.fullname}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>Hi号：</b>
                      <span>{{originUser.hi}}</span>
                    </div>
                    <div>
                      <b> 手机号：</b>
                      <span>{{originUser.mobile}}</span>
                    </div>
                    <div>
                      <b> 下单日期：</b>
                      <span>{{orderInfo.insert_time | timeFormat}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane v-if="pid==='ZTC2'" label="直通车订单基本信息">
          <el-row class="text-right mb10px">
            <el-button type="warning" @click.native="changeInfo" class="xsbtn">修改基本信息</el-button>
          </el-row>
          <el-table :data="ztcBasicInfo" border class="table-width">
            <el-table-column prop="type" label="信息分类" :width="tableFirstColumWidth">
            </el-table-column>
            <el-table-column prop="type" label="详细信息">
              <div slot-scope="scope">
                <div v-if="scope.$index===0">
                  <div class="row-container">
                    <div>
                      <b>公司名称：</b>
                      <span>{{moneyRecord.companyname}}</span>
                    </div>
                  </div>
                  <div v-for="(c,index) in contactInfoList" :key="index" class="mt10px row-container">
                    <div>
                      <b>联系人{{index?index:''}}：姓名{{index?index:''}}：</b>
                      <span>{{c.contactname}}</span>
                    </div>
                    <div>
                      <b>电话{{index?index:''}}：</b>
                      <span>{{c.contactnumber}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>公司地址：</b>
                      <span>{{orderInfo.companyaddress}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>门店类型：</b>
                      <span>{{orderInfo.store_type?'单门店':'多门店'}}</span>
                    </div>
                    <div>
                      <b>收款账号：</b>
                      <span>{{orderInfo.receiveaccount}}</span>
                    </div>
                    <div>
                      <b>收款账号开户行：</b>
                      <span>{{orderInfo.receivebank}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===1">
                  <div class="row-container">
                    <div>
                      <b>验证方式：</b>
                      <span>{{orderInfo.check_type == 10? '对公账号':'人脸识别'}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===2">
                  <div class="row-container">
                    <div>
                      <b>直通车订单金额：</b>
                      <span>{{orderInfo.amount_real | currency1}}</span>
                    </div>
                    <div>
                      <b>客户类型：</b>
                      <span>{{orderInfo.custom_type ? "老客户" : "新客户"}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>百度糯米网络服务合同：</b>
                      <span>{{orderInfo.ordernumber}}</span>
                    </div>
                    <div>
                      <b>百度本地直通车服务合同：</b>
                      <span>{{orderInfo.order2number}}</span>
                    </div>
                    <div>
                      <b> 百度本地直通车授权书：</b>
                      <span>{{orderInfo.order3number}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===3">
                  <div class="row-container">
                    <div>
                      <b>姓名：</b>
                      <span>{{originUser.name}}</span>
                    </div>
                    <div>
                      <b>部门：</b>
                      <span>{{originUser.fullname}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>Hi号：</b>
                      <span>{{originUser.hi}}</span>
                    </div>
                    <div>
                      <b> 手机号：</b>
                      <span>{{originUser.mobile}}</span>
                    </div>
                    <div>
                      <b> 下单日期：</b>
                      <span>{{orderInfo.insert_time | timeFormat}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane v-if="pid==='WEBSITE'" label="网建订单基本信息">
          <el-table :data="wjBasicInfo" border style="width: 100%">
            <el-table-column prop="type" label="信息分类" :width="tableFirstColumWidth">
            </el-table-column>
            <el-table-column prop="" label="详细信息">
              <div slot-scope="scope">
                <div v-if="scope.$index===0">
                  <div class="row-container">
                    <div>
                      <b>公司名称：</b>
                      <span>{{moneyRecord.companyname}}</span>
                    </div>
                    <div>
                      <b>PC网址：</b>
                      <span>{{orderInfo.pcwebsite}}</span>
                    </div>
                    <div>
                      <b>手机网址：</b>
                      <span>{{orderInfo.mobilewebsite}}</span>
                    </div>
                  </div>
                  <div v-for="(c,index) in contactInfoList" :key="index" class="mt10px row-container">
                    <div>
                      <b>联系人{{index?index:''}}：姓名{{index?index:''}}：</b>
                      <span>{{c.contactname}}</span>
                    </div>
                    <div>
                      <b>手机{{index?index:''}}：</b>
                      <span>{{c.contactnumber}}</span>
                    </div>
                    <div>
                      <b>座机{{index?index:''}}：</b>
                      <span>{{c.telphone}}</span>
                    </div>
                    <div>
                      <b>邮箱{{index?index:''}}：</b>
                      <span>{{c.mailnumber}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>公司地址：</b>
                      <span>{{orderInfo.companyaddress}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>客户类型：</b>
                      <span>{{contactInfoList[0].producttype | cusState('cusType')}}{{contactInfoList[0].productnumber}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===1">
                  <div class="row-container">
                    <div>
                      <b>PC站订单金额：</b>
                      <span>{{productInfo[0].pcmoney | currency1}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>手机站订单金额：</b>
                      <span>{{productInfo[0].appmoney | currency1}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>网建合同编号：</b>
                      <span>{{orderInfo.ordernumber}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===2">
                  <div class="row-container">
                    <div>
                      <b>姓名：</b>
                      <span>{{originUser.name}}</span>
                    </div>
                    <div>
                      <b>部门：</b>
                      <span>{{originUser.fullname}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>Hi号：</b>
                      <span>{{originUser.hi}}</span>
                    </div>
                    <div>
                      <b> 手机号：</b>
                      <span>{{originUser.mobile}}</span>
                    </div>
                    <div>
                      <b> 下单日期：</b>
                      <span>{{orderInfo.insert_time | timeFormat}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane v-if="pid_ka==='KA'" label="大客订单基本信息">
          <el-row class="text-right mb10px" v-if="permissions.indexOf('6z')>-1">
            <el-button type="warning" @click.native="changeInfo" class="xsbtn">修改基本信息</el-button>
          </el-row>
          <el-table :data="kaBasicInfo" border class="table-width">
            <el-table-column prop="type" label="信息分类" :width="tableFirstColumWidth">
            </el-table-column>
            <el-table-column prop="" label="详细信息">
              <div slot-scope="scope">
                <div v-if="scope.$index===0">
                  <div class="row-container">
                    <div>
                      <b>公司名称：</b>
                      <span>{{moneyRecord.companyname}}</span>
                    </div>
                    <div>
                      <b>PC网址：</b>
                      <a :href="(orderInfo.pcwebsite.indexOf('http')>-1?'':'http://')+orderInfo.pcwebsite" target="_blank">{{orderInfo.pcwebsite}}</a>
                    </div>
                    <div>
                      <b>手机网址：</b>
                      <a :href="(orderInfo.mobilewebsite.indexOf('http')>-1?'':'http://')+orderInfo.mobilewebsite" target="_blank">{{orderInfo.mobilewebsite}}</a>
                    </div>
                  </div>
                  <div v-for="(c,index) in contactInfoList" :key="index" class="mt10px row-container">
                    <div>
                      <b>联系人{{index?index:''}}：姓名{{index?index:''}}：</b>
                      <span>{{c.contactname}}</span>
                    </div>
                    <div>
                      <b>手机{{index?index:''}}：</b>
                      <span>{{c.contactnumber}}</span>
                    </div>
                    <div>
                      <b>座机{{index?index:''}}：</b>
                      <span>{{c.telphone}}</span>
                    </div>
                    <div>
                      <b>邮箱{{index?index:''}}：</b>
                      <span>{{c.mailnumber}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>客户类型：</b>
                      <span>{{contactInfoList[0].producttype | cusStatus}}{{contactInfoList[0].productnumber}}</span>
                    </div>
                    <div>
                      <b>对公账号：</b>
                      <span>{{orderInfo.receiveaccount}}</span>
                    </div>
                    <div>
                      <b>开户行：</b>
                      <span>{{orderInfo.receivebank}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>公司地址：</b>
                      <span>{{orderInfo.companyaddress}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===1">
                  <div class="row-container">
                    <div>
                      <b>大客订单金额：</b>
                      <span>{{orderInfo.amount_real | currency1}}</span>
                    </div>
                    <div>
                      <b>客户类型：</b>
                      <span>{{orderInfo.custom_type ? "老客户" : "新客户"}}</span>
                    </div>
                    <div>
                      <b>合同：</b>
                      <span>{{orderInfo.remark}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===2">
                  <div class="row-container">
                    <div>
                      <b>姓名：</b>
                      <span>{{originUser.name}}</span>
                    </div>
                    <div>
                      <b>部门：</b>
                      <span>{{originUser.fullname}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div>
                      <b>Hi号：</b>
                      <span>{{originUser.hi}}</span>
                    </div>
                    <div>
                      <b> 手机号：</b>
                      <span>{{originUser.mobile}}</span>
                    </div>
                    <div>
                      <b> 下单日期：</b>
                      <span>{{orderInfo.insert_time | timeFormat}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 企业资质 -->
        <el-tab-pane v-if="pid_ka!=='KA'" label="企业资质">
          <div class="text-right" v-if="permissions.indexOf('5c') > -1">
            <el-button @click.native="editQualify" type="warning" class="xsbtn">修改资质</el-button>
          </div>
          <show-qualify v-if="showQualify.length" :showQualify="showQualify"></show-qualify>
        </el-tab-pane>
        <!-- 信息 -->
        <el-tab-pane v-if="pid==='BAITUI'" label="百度推广信息">
          <el-table :data="baituiExtendInfo" border class="table-width">
            <el-table-column prop="type" label="信息分类" :width="tableFirstColumWidth">
            </el-table-column>
            <el-table-column prop="data" label="详细信息">
              <div slot-scope="scope">
                <div v-if="scope.$index===0">
                  <div>
                    <div>
                      <b>百度订单金额：</b>
                      <span>{{orderInfo.amount_real | currency1}}</span>
                    </div>
                    <div>
                      <b>客户类型：</b>
                      <span>{{orderInfo.custom_type?"老客户":"新客户"}}</span>
                    </div>
                    <div>
                      <b>服务费：</b>
                      <span>{{moneyRecord.service | currency1}}</span>
                    </div>
                    <div>
                      <b>到账方式：</b>
                      <span>{{orderInfo.receivekind==10?"私对公":"公对公"}}</span>
                    </div>
                  </div>
                  <div>
                    <div v-for="(item,index) in moneyInfo" :key="index">
                      <template v-if="item.type < 100 && item.type!=8">
                        <b>{{item.type | productType}}：</b>
                        <span>{{item.value | currency1}}</span>
                      </template>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div v-show="orderInfo.dscd">
                      <b>大搜冲单金额：</b>
                      <span>{{orderInfo.dscd | currency1}}</span>
                    </div>
                    <div v-show="orderInfo.xxlcd">
                      <b>信息流冲单金额：</b>
                      <span>{{orderInfo.xxlcd | currency1}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===1">
                  <div>
                    <div>
                      <b>大搜续费代金券：</b>
                      <span>{{moneyRecord.dsvoucher | currency1}}</span>
                    </div>
                    <div>
                      <b>信息流续费代金券：</b>
                      <span>{{moneyRecord.xxlvoucher | currency1}}</span>
                    </div>
                    <div>
                      <b>信息流现金券：</b>
                      <span>{{moneyRecord.xxlxjq | currency1}}</span>
                    </div>
                    <div>
                      <b>大搜现金券：</b>
                      <span>{{moneyRecord.dsxjq | currency1}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===2">
                  <div>
                    <div>
                      <b>特殊说明：</b>
                      <span>{{moneyRecord.remark || ""}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane v-if="pid==='ZTC2'" label="直通车信息">
          <el-table :data="ztcExtendInfo" border class="table-width">
            <el-table-column prop="type" label="信息分类" :width="tableFirstColumWidth">
            </el-table-column>
            <el-table-column prop="data" label="详细信息">
              <div slot-scope="scope">
                <div v-if="scope.$index===0">
                  <div class="row-container">
                    <div>
                      <b>直通车订单金额：</b>
                      <span>{{orderInfo.amount_real | currency1}}</span>
                    </div>
                    <div>
                      <b>客户类型：</b>
                      <span>{{orderInfo.custom_type?"老客户":"新客户"}}</span>
                    </div>
                    <div>
                      <b>服务费：</b>
                      <span>{{moneyRecord.service | currency1}}</span>
                    </div>
                    <div>
                      <b>到账方式：</b>
                      <span>{{orderInfo.receivekind==10?"私对公":"公对公"}}</span>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div v-for="(item,index) in moneyInfo" :key="index">
                      <template v-if="item.type < 100 && item.type!=8">
                        <b>{{item.type | productType18}}：</b>
                        <span>{{item.value | currency1}}</span>
                      </template>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div v-show="orderInfo.dscd">
                      <b>大搜冲单金额：</b>
                      <span>{{orderInfo.dscd | currency1}}</span>
                    </div>
                    <div v-show="orderInfo.xxlcd">
                      <b>信息流冲单金额：</b>
                      <span>{{orderInfo.xxlcd | currency1}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===1">
                  <div class="row-container">
                    <div>
                      <b>直通车续费代金券：</b>
                      <span>{{moneyRecord.ztcvoucher | currency1}}</span>
                    </div>
                    <div>
                      <b>直通车现金券：</b>
                      <span>{{moneyRecord.ztcxjq | currency1}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===2">
                  <div class="row-container">
                    <div>
                      <b>特殊说明：</b>
                      <span>{{moneyRecord.remark || ""}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane v-if="pid==='WEBSITE'" label="PC/WAP信息">
          <el-table :data="wjExtendInfo" border class="table-width">
            <el-table-column prop="type" label="信息分类" :width="tableFirstColumWidth">
            </el-table-column>
            <el-table-column prop="data" label="详细信息">
              <div slot-scope="scope">
                <div v-if="scope.$index===0">
                  <div class="row-container">
                    <div style="width:250px">
                      <div>
                        <b>公司名称：</b>
                        <span>{{moneyRecord.companyname}}</span>
                      </div>
                      <div>
                        <b>网站类型：</b>
                        <span>{{productInfo[0].websitetype | wjType('siteType')}}</span>
                      </div>
                      <div>
                        <b>网站名称：</b>
                        <span>{{productInfo[0].webname}}</span>
                      </div>
                      <div>
                        <b>手机站订单金额：</b>
                        <span>{{productInfo[0].appmoney | currency1}}</span>
                      </div>
                      <div>
                        <b>PC站订单金额：</b>
                        <span>{{productInfo[0].pcmoney | currency1}}</span>
                      </div>
                      <div>
                        <b>客户网站负责人：</b>
                        <span>{{productInfo[0].webcontact}}/{{productInfo[0].webcontactphone}}/{{productInfo[0].webcontactemail}}/{{productInfo[0].webfixphone}}</span>
                      </div>
                    </div>
                    <div>
                      <div v-if="productInfo[0].websitetype != 30">
                    <b>网站栏目：</b>
                    <div v-for="(item,index) in JSON.parse(productInfo[0].column)" :key="index">
                      <b>{{item.webcolumn_name}}</b>&nbsp;&nbsp;
                      <span>{{item.webcolumn_type}}</span>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===1">
                  <div class="row-container">
                    <div style="width:250px;">
                      <div v-if="productInfo[0].websitetype != 10">
                      <b>网站站模板编号：</b>
                      <span>{{productInfo[0].modelnumber}}</span>
                    </div>
                    <div v-if="productInfo[0].websitetype == 10">
                      <b>参考网站：</b>
                      <span>{{productInfo[0].modelnumber}}</span>
                    </div>
                    <div>
                      <b>域名服务商：</b>
                      <span>{{productInfo[0].domainfacilitator | facilitatorType}}</span>
                    </div>
                    <div>
                      <b>域名：</b>
                      <span>{{productInfo[0].domain}}</span>
                    </div>
                    <div>
                      <b>空间服务商：</b>
                      <span>{{productInfo[0].spacefacilitator | facilitatorType}}
                        {{'/'+ productInfo[0].area ==0?'国内':productInfo[0].area ==10?'海外':''}}</span>
                    </div>
                    <div>
                      <b>空间信息：</b>
                      <span>{{productInfo[0].domainfacilitator != 0?'新开':'非新开'}}</span>
                    </div>
                    <div>
                      <b>空间大小：</b>
                      <span>{{productInfo[0].size}}M</span>
                    </div>
                    <div v-if="productInfo[0].websitetype != 30">
                      <b>网站颜色功能（备注）：</b>
                      <span>{{productInfo[0].remark}}</span>
                    </div>
                    </div>
                    <div>
                      <template v-if="permissions.indexOf('5u') > -1">
                      <div>
                        <b>域名信息：</b>
                        <span>{{orderInfo.newdomaininfo}}</span>
                      </div>
                      <div>
                        <b>空间信息：</b>
                        <span v-html="orderInfo.newzoneinfo"></span>
                      </div>
                    </template>
                    </div>
                  </div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane v-if="pid_ka==='KA'" label="大客推广信息">
          <el-table :data="kaExtendInfo" border class="table-width">
            <el-table-column prop="type" label="信息分类" :width="tableFirstColumWidth">
            </el-table-column>
            <el-table-column prop="data" label="详细信息">
              <div slot-scope="scope">
                <div v-if="scope.$index===0">
                  <div>
                    <div>
                      <b>大客订单金额：</b>
                      <span>{{orderInfo.amount_real | currency1}}</span>
                    </div>
                    <div>
                      <b>客户类型：</b>
                      <span>{{orderInfo.custom_type?"老客户":"新客户"}}</span>
                    </div>
                    <div>
                      <b>服务费：</b>
                      <span>{{moneyRecord.service | currency1}}</span>
                    </div>
                    <div>
                      <b>到账方式：</b>
                      <span>{{orderInfo.receivekind==10?"私对公":""}}</span>
                      <span>{{orderInfo.receivekind==0?"公对公":""}}</span>
                    </div>
                  </div>
                  <div>
                    <div v-for="(item,index) in moneyInfo" :key="index">
                      <template v-if="item.type < 100 && item.type!=8">
                        <b>{{item.type | productType}}：</b>
                        <span>{{item.value | currency1}}</span>
                      </template>
                    </div>
                  </div>
                  <div class="mt10px row-container">
                    <div v-show="orderInfo.dscd">
                      <b>大搜冲单金额：</b>
                      <span>{{orderInfo.dscd | currency1}}</span>
                    </div>
                    <div v-show="orderInfo.xxlcd">
                      <b>信息流冲单金额：</b>
                      <span>{{orderInfo.xxlcd | currency1}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="scope.$index===1">
                  <div>
                  </div>
                </div>
                <div v-if="scope.$index===2">
                  <div>
                    <div>
                      <b>特殊说明：</b>
                      <span>{{moneyRecord.remark || ""}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 审核记录 -->
        <el-tab-pane label="审核记录">
          <el-steps :active="isChecked" space="14%" finish-status="success">
            <el-step v-for="step in stepList.slice(0,8)" :key="step.id" :title="step.name" style="margin-top:15px">
              <span v-if="step.status>0" slot="description">{{step.opt_time | timeFormat}}</span>
            </el-step>
          </el-steps>
          <el-steps :active="isNextChecked" space="12.5%" finish-status="success">
            <el-step v-for="(step,index) in stepList.slice(8)" :key="step.id" :title="step.name" style="margin-top:15px">
              <span slot="icon">{{9+index}}</span>
              <span v-if="step.status>0" slot="description">{{step.opt_time | timeFormat}}</span>
            </el-step>
          </el-steps>
          <el-table :data="checkRecord" stripe class="table-width">
            <el-table-column prop="" label="时间" width="160">
              <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
            </el-table-column>
            <el-table-column prop="username" label="操作人" width="100">
            </el-table-column>
            <el-table-column prop="remark" label="审核内容">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 订单处理 -->
        <el-tab-pane v-if="sn!==10" label="订单处理">
          <!-- 理单员审核(质检经理) -->
          <order-keeper v-if="sn===20 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="理单员审核"></order-keeper>
          <!-- 综合部初审 -->
          <init-finance v-if="sn===100 && moneyInfo.length" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="综合部初审"></init-finance>
          <!-- 质检外审 -->
          <out-quality v-if="sn===200 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="质检外审"></out-quality>
          <!-- 质检内审派单 -->
          <in-quality-order v-if="sn===210 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="质检内审派单"></in-quality-order>
          <!-- 质检内审 -->
          <in-quality v-if="sn===220 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="质检内审派单"></in-quality>
          <!-- 网建外审 -->
          <in-quality v-if="sn===230 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="网建外审"></in-quality>
          <!-- 网开空域 -->
          <web-space v-if="sn===240 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="网建外审"></web-space>
          <!-- 质检申请加款 -->
          <quality-add-money v-if="sn===260 && templateInfo.cpid && pid === 'BAITUI'" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="质检申请加款"></quality-add-money>
          <!-- 理单员申请加款 -->
          <quality-add-money v-if="sn===260 && templateInfo.cpid && pid_ka === 'KA'" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="理单员申请加款"></quality-add-money>
          <!-- 网建经理派单 -->
          <web-order v-if="sn===260 && templateInfo.cpid && pid === 'WEBSITE'" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="网建经理派单"></web-order>
          <!-- 网站制作 -->
          <web-make v-if="sn===280 && templateInfo.cpid && pid === 'WEBSITE'" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="网站制作"></web-make>
          <!-- 网建内审 -->
          <web-make v-if="sn===300 && templateInfo.cpid && pid === 'WEBSITE'" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="网建内审、网站提出"></web-make>
          <!-- 质检经理审核 -->
          <quality-manager v-if="sn===300 && templateInfo.cpid && pid !== 'WEBSITE'" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="质检经理审核"></quality-manager>
          <!-- 综合部复审 -->
          <second-finance v-if="sn===305 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="综合部复审"></second-finance>
          <!-- 账户加款(已移动到续费加款列表，暂时没用) -->
          <finance-add-money v-if="sn===310 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="账户加款"></finance-add-money>
          <!-- 质检开户(加款完成) -->
          <quality-open-account v-if="sn===320 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="质检开户(加款完成)"></quality-open-account>
          <!-- 质检一部 -->
          <quality-one v-if="sn===330 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="质检一部"></quality-one>
          <!-- 客服提单 -->
          <service-order v-if="sn===400 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="客服提单"></service-order>
          <!-- 客服派单 -->
          <service-dispatch v-if="sn===410 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="客服派单"></service-dispatch>
          <!-- 提单完成 -->
          <order-done v-if="sn===420 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="提单完成"></order-done>
          <!-- 新客内审 -->
          <new-cus-check v-if="sn===430 && templateInfo.cpid" :moneyInfo="moneyInfo" :moneyRecord="moneyRecord" :orderFlowDatas="orderFlowDatas" :orderInfo="orderInfo" :templateInfo="templateInfo" :originUser="originUser" :sn="sn" :invoiceInfo="invoiceInfo" :pid="pid" title="新客内审"></new-cus-check>
        </el-tab-pane>
        <!-- 日志 -->
        <el-tab-pane :label="logLabel">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button type="text" size="medium">填写日志：</el-button>
              <el-input v-model="logMark" type="textarea" :rows="3"></el-input>
              <el-button @click.native="subLog" class="mt10px" type="success">提交</el-button>
            </div>
            <el-table :data="log" stripe class="table-width">
              <el-table-column prop="" label="时间" width="160">
                <span slot-scope="scope">{{scope.row.insert_time | timeFormat}}</span>
              </el-table-column>
              <el-table-column prop="name" label="提交人" width="100">
              </el-table-column>
              <el-table-column prop="remark" label="日志内容">
              </el-table-column>
            </el-table>
            <page class="page" :url="logUrl" :sendParams="logParams" @updateList="updateLogList"></page>
          </el-card>
        </el-tab-pane>
        <!-- 记业绩 -->
        <el-tab-pane label="记业绩" v-if="permissions.indexOf('4d') > -1">
          <el-form ref="form" :model="pfForm" :label-width="pfLabelWidth">
            <el-row :gutter="20">
              <el-col :md="12" class="maxwidth">
                <el-form-item label="新开业绩时间 :">
                  <el-date-picker v-model="pfForm.newPFdate" value-format="yyyy/MM/dd HH:mm" type="date" placeholder="选择入职日期" style="width:100%"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :md="12" class="maxwidth">
                <el-form-item label="上线业绩时间 :">
                  <el-date-picker v-model="pfForm.onlinePFdate" value-format="yyyy/MM/dd HH:mm" type="date" style="width:100%"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="12" class="maxwidth">
                <el-form-item label="新开记业绩 :">
                  <el-input v-model="pfForm.openAchievement"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12" class="maxwidth">
                <el-form-item label="管理层新开记业绩 :">
                  <el-input v-model="pfForm.m_openAchievement"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="12" class="maxwidth">
                <el-form-item label="上线记业绩 :">
                  <el-input v-model="pfForm.onlineAchievement"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12" class="maxwidth">
                <el-form-item label="管理层上线记业绩 :">
                  <el-input v-model="pfForm.m_onlineAchievement"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div>
              <el-button @click.native="addPFTime" type="primary">保存</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 修改订单信息弹窗 -->
    <el-dialog title="修改订单基本信息" width="800px" :visible.sync="changeInfoDialog" :modal-append-to-body="false">
      <el-form :model="form">
        <el-row :gutter="20">
          <el-col :sm="12">
            <el-form-item label="公司名称" :label-width="formLabelWidth" required>
              <el-input v-model="form.cName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="公司地址" :label-width="formLabelWidth" required>
              <el-input v-model="form.addr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="12">
            <el-form-item label="对公账号" :label-width="formLabelWidth">
              <el-input v-model="form.accountNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="开户行" :label-width="formLabelWidth">
              <el-input v-model="form.bType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="12">
            <el-form-item label="PC网址" :label-width="formLabelWidth">
              <el-input v-model="form.pcWeb"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="手机网址" :label-width="formLabelWidth">
              <el-input v-model="form.phoneWeb"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-for="(c,index) in form.contactList" :key="index">
          <el-col :sm="12">
            <el-form-item :label-width="formLabelWidth" required>
              <span slot="label">
                <el-button @click="addContact(index)" :type="index?'danger':'success'" circle size="mini" :icon="index?minusIcon:addIcon"></el-button>
                <span>联系人{{index?index:''}}</span>
              </span>
              <el-input v-model="c.contactname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item :label-width="formLabelWidth" required>
              <span slot="label">手机号{{index?index:''}}</span>
              <el-input v-model="c.contactnumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item :label-width="formLabelWidth">
              <span slot="label">座机{{index?index:''}}</span>
              <el-input v-model="c.telphone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item :label-width="formLabelWidth" required>
              <span slot="label">邮箱{{index?index:''}}</span>
              <el-input v-model="c.mailnumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="12">
            <el-form-item label="客户类型" :label-width="formLabelWidth">
              <el-input v-model="form.cusType" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="subBaseInfo">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cusStatus } from 'common/js/filters'
import ShowQualify from 'base/showQualify/showQualify'
import OrderKeeper from 'checkSteps/orderKeeper'
import InitFinance from 'checkSteps/initFinance'
import InQualityOrder from 'checkSteps/inQualityOrder'
import InQuality from 'checkSteps/inQuality'
import OutQuality from 'checkSteps/outQuality'
import QualityAddMoney from 'checkSteps/qualityAddMoney'
import QualityManager from 'checkSteps/qualityManager'
import SecondFinance from 'checkSteps/secondFinance'
import FinanceAddMoney from 'checkSteps/financeAddMoney'
import QualityOpenAccount from 'checkSteps/qualityOpenAccount'
import ServiceOrder from 'checkSteps/serviceOrder'
import ServiceDispatch from 'checkSteps/serviceDispatch'
import QualityOne from 'checkSteps/qualityOne'
import OrderDone from 'checkSteps/orderDone'
import NewCusCheck from 'checkSteps/newCusCheck'
import WebSpace from 'checkSteps/webSpace'
import WebOrder from 'checkSteps/webOrder'
import WebMake from 'checkSteps/webMake'
import Page from 'base/page/page'
import cookie from 'js-cookie'
export default {
  data () {
    return {
      permissions: cookie.getJSON('permissions'),
      receiveData: {},
      tableFirstColumWidth: '100',
      stepList: [],
      isChecked: 0,
      isNextChecked: -1,
      checkRecord: [],
      baituiBasicInfo: [
        { type: '客户基本信息' },
        { type: '网建信息' },
        { type: '订单/金额' },
        { type: '商务信息' }
      ],
      kaBasicInfo: [
        { type: '客户基本信息' },
        { type: '订单/金额' },
        { type: '商务信息' }
      ],
      baituiExtendInfo: [
        { type: '百度订单信息' },
        { type: '促销活动' },
        { type: '特殊说明' }
      ],
      kaExtendInfo: [
        { type: '大客订单信息' },
        { type: '促销活动' },
        { type: '特殊说明' }
      ],
      ztcBasicInfo: [
        { type: '客户基本信息' },
        { type: '信誉验证' },
        { type: '订单/金额' },
        { type: '商务信息' }
      ],
      ztcExtendInfo: [
        { type: '直通车订单信息' },
        { type: '促销活动' },
        { type: '特殊说明' }
      ],
      wjBasicInfo: [
        { type: '客户基本信息' },
        { type: '订单/金额' },
        { type: '商务信息' }
      ],
      wjExtendInfo: [{ type: '网建基本信息' }, { type: '网站制作信息' }],
      contactInfoList: [{ name: '', producttype: '', productnumber: '' }],
      orderInfo: {},
      productInfo: [{ websitetype: -1 }],
      originUser: {},
      changeInfoDialog: false,
      form: {
        cName: '',
        addr: '',
        accountNum: '',
        bType: '',
        pcWeb: '',
        phoneWeb: '',
        contactList: [
          {
            contactname: '',
            contactnumber: '',
            telphone: '',
            mailnumber: ''
          }
        ],
        cusType: ''
      },
      formLabelWidth: '120px',
      addIcon: 'fa fa-plus',
      minusIcon: 'fa fa-minus',
      subParams: {},
      pid: 'BAITUI',
      pid_ka: '',
      showQualify: [],
      cusAttrList: [],
      sn: 10,
      moneyInfo: [],
      moneyRecord: {},
      orderFlowDatas: [],
      invoiceInfo: {},
      templateInfo: {},
      logLabel: '日志',
      logMark: '',
      log: [], // 日志table
      logUrl: '/wf.do?logrecord',
      logParams: {},
      pfForm: {
        // 记业绩
        newPFdate: '',
        onlinePFdate: '',
        openAchievement: '',
        m_openAchievement: '',
        onlineAchievement: '',
        m_onlineAchievement: ''
      },
      pfLabelWidth: '130'
    }
  },
  created () {
    this.receiveData = this.$route.query.data
    if (!this.receiveData.cpid) {
      this.$router.go(-1)
      return
    }
    this.pid = this.receiveData.pid
    if (this.pid === 'GD' || this.pid === 'PZ' || this.pid === 'KP') {
      this.pid_ka = 'KA'
    }
    let viewWidth = document.documentElement.clientWidth
    if (viewWidth < 768) {
      this.tableFirstColumWidth = '50'
    }
    this.sn = this.receiveData.sn
    this._getBasicInfo()
  },
  mounted () {
    this._getRecord()
  },
  methods: {
    tab (val) {
      if (val.label === this.logLabel) {
        this.logParams = {
          cpid: this.templateInfo.cpid
        }
      }
    },
    // 修改基本信息按钮
    changeInfo () {
      let messUrl = '/Company.do?getCompanyByCpid'
      let messParams = {
        cpid: this.receiveData.cpid
      }
      this.$post(messUrl, messParams).then(res => {
        let mess = res.data[0].data
        this.form.contactList = mess.orderContact
        this.form.cName = mess.name || null
        this.form.addr = mess.companyaddress || null
        this.form.pcWeb = mess.pcwebsite || null
        this.form.phoneWeb = mess.mobilewebsite || null
        this.form.accountNum = mess.receiveaccount || null
        this.form.bType = mess.receivebank || null
        this.form.cusType = cusStatus(mess.producttype)
        this.subParams = {
          cid: mess.cid,
          oid: mess.oid,
          logid: mess.logid,
          cpid: this.receiveData.cpid,
          oldOrderContact: JSON.parse(JSON.stringify(mess.orderContact)),
          producttype: mess.producttype
        }
      })
      this.changeInfoDialog = true
    },
    // 提交修改
    subBaseInfo () {
      let subUrl = '/Company.do?setCompanyOrder'
      let subParams = {
        name: this.form.cName,
        companyaddress: this.form.addr,
        orderContact: this.form.contactList,
        pcwebsite: this.form.pcWeb,
        mobilewebsite: this.form.phoneWeb,
        receiveaccount: this.form.accountNum,
        receivebank: this.form.bType
      }
      subParams = Object.assign({}, this.subParams, subParams)
      this.form.contactList.every(val => {
        if (
          !this.form.addr ||
          !val.contactname ||
          !val.contactnumber ||
          !val.mailnumber
        ) {
          this.$message.error('请完善必填项！')
          throw new Error('ignore')
        }
      })
      this.$post(subUrl, subParams).then(res => {
        if (res.data[0].success === true) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this._getBasicInfo()
        } else {
          this.$message.error('修改失败')
        }
      })
      this.changeInfoDialog = false
    },
    // 修改资质
    // todo
    editQualify () {},
    // 日志
    updateLogList (res) {
      this.log = res.data[0].data
    },
    subLog () {
      if (!this.logMark) {
        this.$message({
          type: 'warning',
          message: '请填写日志内容！'
        })
        return
      }
      let params = {
        cpid: this.templateInfo.cpid,
        remark: this.logMark,
        type: 0
      }
      this.$post('/wf.do?log', params).then(res => {
        this.$message({
          type: 'success',
          message: '提交日志成功'
        })
        this.logMark = ''
        this.logParams = {
          cpid: this.templateInfo.cpid
        }
      })
    },
    // 记业绩
    addPFTime () {
      let params = {
        orderid: this.receiveData.orderid,
        opentime: this.pfForm.newPFdate,
        onlinetime: this.pfForm.onlinePFdate,
        onlineAchievement: this.pfForm.onlineAchievement,
        openAchievement: this.pfForm.openAchievement,
        // m_opentime: this.pfForm.m_newPFdate,
        // m_onlinetime: this.pfForm.m_onlinePFdate,
        m_onlineAchievement: this.pfForm.m_onlineAchievement,
        m_openAchievement: this.pfForm.m_openAchievement
      }
      this.$post('/wf.do?ordertime', params).then(res => {
        if (res.data[0].success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      })
    },
    // 点击添加联系人
    addContact (index) {
      if (index === 0) {
        this.form.contactList.push({
          contactname: '',
          contactnumber: '',
          mailnumber: '',
          telphone: ''
        })
      } else {
        this.form.contactList.splice(index, 1)
      }
    },
    // 获取订单基本信息
    _getBasicInfo () {
      let baseUrl = '/wf.do?ndget'
      let baseParams = {
        sn: this.receiveData.sn,
        cpid: this.receiveData.cpid,
        uid: this.receiveData.uid,
        orderid: this.receiveData.orderid,
        pid: this.receiveData.pid
      }
      this.$post(baseUrl, baseParams).then(res => {
        if (res.data.success === true) {
          this.templateInfo = res.data.data[0][0]
          this.contactInfoList = res.data.data[7]
          this.orderInfo = res.data.data[1]
          this.orderInfo.applytime = ''
          this.productInfo = res.data.data[4]
          this.originUser = res.data.data[3]
          this.cusAttrList = res.data.data[5]
          this.showQualify = res.data.data[5]
          this.moneyInfo = res.data.data[12]
          this.moneyRecord = res.data.data[8][0]
          this.orderFlowDatas = res.data.data[13]
          this.invoiceInfo = res.data.data[11]
        }
      })
    },
    // 获取审核记录信息
    _getRecord () {
      let lastIndex = 0
      let progressUrl = '/wf/order.do?Schedule'
      let progressParam = {
        cpid: this.receiveData.cpid
      }
      this.$get(progressUrl, progressParam).then(res => {
        if (res.data[0].success === true) {
          this.stepList = res.data[0].data
          this.checkRecord = res.data[1].data
          this.stepList.forEach((val, index) => {
            if (val.status === 100) {
              lastIndex = index
            }
          })
          this.isChecked = lastIndex
          if (this.isChecked > 7) {
            this.isNextChecked = this.isChecked - 8
          }
        }
      })
    }
  },
  components: {
    ShowQualify,
    OrderKeeper,
    InitFinance,
    InQualityOrder,
    InQuality,
    OutQuality,
    QualityAddMoney,
    QualityManager,
    SecondFinance,
    FinanceAddMoney,
    QualityOpenAccount,
    ServiceOrder,
    ServiceDispatch,
    QualityOne,
    OrderDone,
    NewCusCheck,
    WebSpace,
    WebOrder,
    WebMake,
    Page
  }
}
</script>

<style lang="less" scoped>
.view-detail {
  .detail-content {
    .row-container {
      display: flex;
      flex-wrap: wrap;
      & > div {
        margin-right: 20px;
      }
    }
  }
}
</style>
