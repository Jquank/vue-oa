<template>
  <div>
    <div id="print">

      <div align=center x:publishsource="Excel">

        <table border=0 cellpadding=0 cellspacing=0 width=729 class=xl65981 style='border-collapse:collapse;table-layout:fixed;width:549pt'>
          <col class=xl65981 width=70 style='mso-width-source:userset;mso-width-alt:
 2240;width:53pt'>
          <col class=xl65981 width=82 style='mso-width-source:userset;mso-width-alt:
 2624;width:62pt'>
          <col class=xl65981 width=86 span=2 style='mso-width-source:userset;mso-width-alt:
 2752;width:65pt'>
          <col class=xl65981 width=79 style='mso-width-source:userset;mso-width-alt:
 2528;width:59pt'>
          <col class=xl65981 width=85 style='mso-width-source:userset;mso-width-alt:
 2720;width:64pt'>
          <col class=xl65981 width=73 style='mso-width-source:userset;mso-width-alt:
 2336;width:55pt'>
          <col class=xl65981 width=60 style='mso-width-source:userset;mso-width-alt:
 1920;width:45pt'>
          <col class=xl65981 width=87 style='mso-width-source:userset;mso-width-alt:
 2784;width:65pt'>
          <col class=xl65981 width=21 style='mso-width-source:userset;mso-width-alt:
 672;width:16pt'>
          <tr height=46 style='mso-height-source:userset;height:34.5pt'>
            <td colspan=9 height=46 class=xl91981 width=708 style='height:34.5pt;
  width:533pt'>公司业务内部流程表</td>
            <td class=xl65981 width=21 style='width:16pt'></td>
          </tr>
          <tr height=12 style='mso-height-source:userset;height:9.0pt'>
            <td height=12 class=xl65981 style='height:9.0pt'></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
          </tr>
          <tr height=26 style='mso-height-source:userset;height:19.5pt'>
            <td colspan=9 height=26 class=xl93981 style='height:19.5pt'><span style='mso-spacerun:yes'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>□加急 带*为新客户必填信息<span style='mso-spacerun:yes'>&nbsp;&nbsp;&nbsp;</span>
              填表日期：<span style='mso-spacerun:yes'>{{printData.year1}} </span>年<span style='mso-spacerun:yes'>{{printData.month1}} </span>月<span style='mso-spacerun:yes'>{{printData.day1}} </span>日
              <span style='mso-spacerun:yes'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
            <td class=xl65981></td>
          </tr>
          <tr height=28 style='mso-height-source:userset;height:21.0pt'>
            <td rowspan=7 height=229 class=xl66981 width=70 style='height:171.75pt;border-top:none;width:53pt'>客户基本<br>信息<font class="font6981"><span style='mso-spacerun:yes'><br></span>(</font>
              <font class="font5981">商务人员填写</font>
              <font class="font6981">)</font>
            </td>
            <td class=xl67981 style='border-top:none;border-left:none'>公司名称*</td>
            <td colspan=3 class=xl67981 style='border-left:none'>{{printData.comName}}</td>
            <td class=xl67981 style='border-top:none;border-left:none'>网址*</td>
            <td colspan=3 class=xl68981 style='border-right:.5pt solid black;border-left:none'>{{printData.comWebsite}}</td>
            <td rowspan=22 class=xl82981 width=21 style='width:16pt'></td>
          </tr>
          <tr height=28 style='mso-height-source:userset;height:21.0pt'>
            <td height=28 class=xl67981 style='height:21.0pt;border-top:none;border-left:none'>客户类型*</td>
            <td colspan=3 class=xl67981 style='border-left:none'>
              <input type="checkbox" ref="newCus" v-model="printData.producttype" :value="0"><span style="vertical-align: top">新客户</span><span style='mso-spacerun:yes'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input type="checkbox" ref="oldCus" v-model="printData.producttype" :value="1"><span style="vertical-align: top">老客户</span></td>
            <td class=xl67981 style='border-top:none;border-left:none'>经办人*</td>
            <td class=xl68981 style='border-top:none;border-left:none'>{{printData.webcontact}}</td>
            <td class=xl67981 style='border-top:none'>电话<font class="font6981">*</font>
            </td>
            <td class=xl67981 style='border-top:none;border-left:none'>{{printData.webcontactphone}}</td>
          </tr>
          <tr height=28 style='mso-height-source:userset;height:21.0pt'>
            <td height=28 class=xl66981 width=82 style='height:21.0pt;border-top:none;
  border-left:none;width:62pt'>公司地址*</td>
            <td colspan=3 class=xl67981 style='border-left:none'>{{printData.comAddr}}</td>
            <td class=xl67981 style='border-top:none;border-left:none'>联系人*</td>
            <td class=xl68981 style='border-top:none;border-left:none'>{{printData.comContactName}}</td>
            <td class=xl67981 style='border-top:none'>电话*</td>
            <td class=xl67981 style='border-top:none;border-left:none'>{{printData.comContactTel}}</td>
          </tr>
          <tr height=28 style='mso-height-source:userset;height:21.0pt'>
            <td height=28 class=xl67981 style='height:21.0pt;border-top:none;border-left:
  none'>订单编号*</td>
            <td class=xl67981 style='border-top:none;border-left:none'>{{printData.contactNum1}}</td>
            <td class=xl67981 style='border-top:none;border-left:none'>协议编号*</td>
            <td class=xl67981 style='border-top:none;border-left:none'>{{printData.contactNum3}}</td>
            <td class=xl67981 style='border-top:none;border-left:none'>传真*</td>
            <td colspan=3 class=xl68981 style='border-right:.5pt solid black;border-left:
  none'></td>
          </tr>
          <tr height=43 style='mso-height-source:userset;height:32.25pt'>
            <td height=43 class=xl67981 style='height:32.25pt;border-top:none;border-left: none'>订单金额</td>
            <td colspan=4 class=xl85981 style='border-right:.5pt solid black;border-left:none'>大写<font class="font5981">金额：{{printData.moneycountUpper}}</font>
            </td>
            <td colspan=3 class=xl85981 style='border-right:.5pt solid black;border-left:none'>小写金额：{{printData.moneycount}}</td>
          </tr>
          <tr height=37 style='mso-height-source:userset;height:27.75pt'>
            <td height=37 class=xl67981 style='height:27.75pt;border-top:none;border-left: none'>收据号码*</td>
            <td class=xl69981 style='border-top:none;border-left:none'></td>
            <td class=xl67981 style='border-top:none'>发票申请</td>
            <td class=xl70981 style='border-top:none;border-left:none'><input type="checkbox" ref="noInvoice"><span style="vertical-align: top">无需发票</span> <span style='display:none'><span style='mso-spacerun:yes'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></td>
            <td class=xl65981></td>
            <td colspan=3 class=xl85981 style='border-right:.5pt solid black'><span style='mso-spacerun:yes'>&nbsp;</span>需要发票 ( <input type="checkbox" ref="simpleInvoice"><span style="vertical-align: top">普票</span> <input type="checkbox" ref="onlyInvoice"><span style="vertical-align: top">专票</span> )</td>
          </tr>
          <tr height=37 style='mso-height-source:userset;height:27.75pt'>
            <td height=37 class=xl67981 style='height:27.75pt;border-top:none;border-left:none'>发票开具名称</td>
            <td colspan=3 class=xl67981 style='border-left:none'>{{printData.invoiceTitle}}</td>
            <td class=xl67981 style='border-left:none'>发票邮寄地址</td>
            <td colspan=3 class=xl67981 style='border-left:none'>{{printData.email}}</td>
          </tr>
          <tr height=42 style='mso-height-source:userset;height:31.5pt'>
            <td rowspan=5 height=159 class=xl79981 width=70 style='border-bottom:.5pt solid black; height:119.25pt;border-top:none;width:53pt'>财务<font class="font6981"><span style='mso-spacerun:yes'><br>
                </span></font>
              <font class="font5981">客服</font>
              <font class="font6981"><span style='mso-spacerun:yes'><br>
                </span></font>
              <font class="font5981">填写</font>
            </td>
            <td class=xl67981 style='border-top:none;border-left:none'>实际到帐金额</td>
            <td colspan=3 class=xl88981 style='border-right:.5pt solid black;border-left:none'><span v-for="(receiptRecord,index) in printData.receiptRecord" :key="index">{{receiptRecord}}<br></span></td>
            <td class=xl65981>收款方式</td>
            <td class=xl68981 style='border-top:none'></td>
            <td class=xl66981 width=60 style='border-top:none;width:45pt'>出纳签字确认</td>
            <td class=xl71981 style='border-top:none'>{{printData.chunaName}}</td>
          </tr>
          <tr height=23 style='mso-height-source:userset;height:17.25pt'>
            <td colspan=5 height=23 class=xl68981 style='border-right:.5pt solid black;
  height:17.25pt;border-left:none'>客服填写</td>
            <td colspan=3 class=xl68981 style='border-right:.5pt solid black;border-left:
  none'>财务填写</td>
          </tr>
          <tr height=30 style='mso-height-source:userset;height:22.5pt'>
            <td height=30 class=xl72981 style='height:22.5pt;border-top:none;border-left:
  none'>订单类型</td>
            <td class=xl67981 style='border-top:none;border-left:none'>用户名</td>
            <td colspan=2 class=xl68981 style='border-right:.5pt solid black;border-left:
  none'>预存款</td>
            <td class=xl67981 style='border-top:none;border-left:none'>申请加款时间</td>
            <td class=xl66981 width=73 style='border-top:none;border-left:none;
  width:55pt'>实际加款金额</td>
            <td class=xl71981 style='border-top:none'>加款时间</td>
            <td class=xl67981 style='border-top:none;border-left:none'>财务确认</td>
          </tr>
          <tr height=32 style='mso-height-source:userset;height:24.0pt'>
            <td height=32 class=xl73981 style='height:24.0pt;border-left:none'>□新开户</td>
            <td class=xl67981 style='border-top:none;border-left:none'>{{printData.baiduaccount}}</td>
            <td colspan=2 class=xl68981 style='border-right:.5pt solid black;border-left: none'>{{printData.addMoney}}</td>
            <td class=xl67981 style='border-top:none;border-left:none;white-space: pre-wrap'>{{printData.applyTime | timeFormat}}</td>
            <td class=xl74981 width=73 style='border-top:none;border-left:none;width:55pt'>{{printData.addMoney}}</td>
            <td class=xl74981 width=60 style='border-top:none;width:45pt;white-space: pre-wrap;font-size:10px;'>{{printData.jiakuanTime | timeFormat}}</td>
            <td class=xl67981 style='border-top:none'>{{printData.jiakuanName}}</td>
          </tr>
          <tr height=32 style='mso-height-source:userset;height:24.0pt'>
            <td height=32 class=xl73981 style='height:24.0pt;border-top:none;border-left:
  none'>□其它产品</td>
            <td class=xl67981 style='border-top:none;border-left:none'></td>
            <td colspan=2 class=xl68981 style='border-right:.5pt solid black;border-left:
  none'></td>
            <td class=xl67981 style='border-top:none;border-left:none'></td>
            <td class=xl74981 width=73 style='border-top:none;border-left:none;
  width:55pt'></td>
            <td class=xl74981 width=60 style='border-top:none;width:45pt'></td>
            <td class=xl67981 style='border-top:none'></td>
          </tr>
          <tr height=31 style='mso-height-source:userset;height:23.25pt'>
            <td colspan=9 height=31 class=xl85981 style='border-right:.5pt solid black;
  height:23.25pt'>服务内容<font class="font6981">(</font>
              <font class="font5981">商务人员填写</font>
              <font class="font6981">)</font>
            </td>
          </tr>
          <tr height=54 style='mso-height-source:userset;height:41.1pt'>
            <td height=54 class=xl67981 style='height:41.1pt;border-top:none'>□服务类型</td>
            <td colspan=8 class=xl67981 style='border-left:none'>{{printData.serviceType}}</td>
          </tr>
          <tr height=57 style='mso-height-source:userset;height:42.95pt'>
            <td height=57 class=xl75981 width=70 style='height:42.95pt;border-top:none;
  width:53pt'>□空间大<br>小域名名<br>称</td>
            <td colspan=8 class=xl67981 style='border-left:none'>
              <span v-if="printData.pid == 'WEBSITE'">网站名称：{{printData.webname}}，
                <!--域名信息：{{printData.domain}}，服务商类型：{{printData.domainType}},-->大小：{{printData.size}}MB</span>
            </td>
          </tr>
          <tr height=60 style='mso-height-source:userset;height:45.0pt'>
            <td height=60 class=xl73981 style='height:45.0pt;border-top:none'>□网站建设</td>
            <td colspan=8 class=xl67981 style='border-left:none'><span v-if="printData.pid == 'WEBSITE'">{{printData.serviceType}}</span></td>
          </tr>
          <tr height=61 style='mso-height-source:userset;height:45.75pt'>
            <td height=61 class=xl75981 width=70 style='height:45.75pt;border-top:none;
  width:53pt'>□特殊需<br>要说明事<br>项</td>
            <td colspan=5 class=xl67981 style='border-left:none'>{{printData.userReceiptRemark}}</td>
            <td class=xl70981 style='border-top:none;border-left:none;'>公司领导</td>
            <td colspan=2 class=xl67981 style='border-left:none'></td>
          </tr>
          <tr height=38 style='mso-height-source:userset;height:28.5pt'>
            <td rowspan=2 height=72 class=xl67981 style='height:54.6pt;border-top:none'>部门</td>
            <td rowspan=2 class=xl67981>{{printData.fullname}}</td>
            <td class=xl76981>IS部</td>
            <td class=xl67981 style='border-left:none'>{{printData.orderUname}}</td>
            <td rowspan=2 class=xl67981>部门负责人</td>
            <td rowspan=2 class=xl67981>{{printData.orderUnameUp}}</td>
            <td class=xl77981 style='border-left:none'>合同专管</td>
            <td colspan=2 class=xl68981 style='border-right:.5pt solid black;border-left:
  none'></td>
          </tr>
          <tr height=34 style='mso-height-source:userset;height:26.1pt'>
            <td height=34 class=xl76981 style='height:26.1pt;border-top:none'>OS部</td>
            <td class=xl67981 style='border-top:none;border-left:none'></td>
            <td class=xl77981 style='border-left:none'>收单时间</td>
            <td colspan=2 class=xl67981 style='border-left:none'></td>
          </tr>
          <tr height=38 style='mso-height-source:userset;height:28.5pt'>
            <td colspan=2 height=38 class=xl67981 style='height:28.5pt'>理单员/分机</td>
            <td colspan=2 class=xl67981 style='border-left:none'>{{printData.lidanyuanName}}</td>
            <td class=xl77981 style='border-left:none'>有/无合同</td>
            <td class=xl67981 style='border-top:none;border-left:none'><span v-if="printData.contactNum1">有</span><span v-if="printData.contactNum1 == false">无</span></td>
            <td class=xl65981>降E时间</td>
            <td colspan=2 class=xl68981 style='border-right:.5pt solid black;white-space: pre-wrap'>{{printData.jiangETime | timeFormat}}</td>
          </tr>
          <tr height=33 style='mso-height-source:userset;height:24.75pt'>
            <td height=33 class=xl67981 style='height:24.75pt;border-top:none'>质监部</td>
            <td class=xl67981 style='border-top:none;border-left:none'>{{printData.zhijianName}}</td>
            <td class=xl76981 style='border-top:none'>技术经理</td>
            <td class=xl67981 style='border-top:none;border-left:none'></td>
            <td class=xl67981 style='border-top:none;border-left:none'>客服负责人</td>
            <td class=xl67981 style='border-top:none;border-left:none'></td>
            <td class=xl67981 style='border-left:none'>客服</td>
            <td colspan=2 class=xl67981 style='border-left:none'>{{printData.kefuName}}</td>
          </tr>
          <tr height=36 style='mso-height-source:userset;height:27.0pt'>
            <td height=36 class=xl67981 style='height:27.0pt;border-top:none'>其它客服组</td>
            <td colspan=3 class=xl68981 style='border-right:.5pt solid black;border-left:
  none'></td>
            <td class=xl78981 style='border-top:none;border-left:none'>ID</td>
            <td class=xl67981 style='border-top:none;border-left:none'>{{printData.baiduid}}</td>
            <td class=xl67981 style='border-top:none;border-left:none'>代理账号</td>
            <td colspan=2 class=xl68981 style='border-right:.5pt solid black;border-left:none'>{{printData.proxyid}}</td>
          </tr>
          <tr height=30 style='mso-height-source:userset;height:22.5pt'>
            <td height=30 class=xl65981 style='height:22.5pt'></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
          </tr>
          <tr height=22 style='mso-height-source:userset;height:16.5pt'>
            <td height=22 class=xl65981 style='height:16.5pt'></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
          </tr>
          <tr height=22 style='mso-height-source:userset;height:16.5pt'>
            <td height=22 class=xl65981 style='height:16.5pt'></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
          </tr>
          <tr height=21 style='mso-height-source:userset;height:15.75pt'>
            <td colspan=2 height=21 class=xl84981 style='height:15.75pt'></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
          </tr>
          <tr height=27 style='mso-height-source:userset;height:20.25pt'>
            <td colspan=2 height=27 class=xl84981 style='height:20.25pt'></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
          </tr>
          <tr height=24 style='mso-height-source:userset;height:18.0pt'>
            <td colspan=2 height=24 class=xl84981 style='height:18.0pt'></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
          </tr>
          <tr height=27 style='mso-height-source:userset;height:20.25pt'>
            <td colspan=2 height=27 class=xl84981 style='height:20.25pt'></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
            <td class=xl65981></td>
          </tr>
          <!-- <![if supportMisalignedColumns]>
          <tr height=0 style='display:none'>
            <td width=70 style='width:53pt'></td>
            <td width=82 style='width:62pt'></td>
            <td width=86 style='width:65pt'></td>
            <td width=86 style='width:65pt'></td>
            <td width=79 style='width:59pt'></td>
            <td width=85 style='width:64pt'></td>
            <td width=73 style='width:55pt'></td>
            <td width=60 style='width:45pt'></td>
            <td width=87 style='width:65pt'></td>
            <td width=21 style='width:16pt'></td>
          </tr>
          <![endif]> -->
        </table>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      receiveData: {},
      printData: {}
    }
  },
  created () {
    this.receiveData = this.$route.query
    let params = {
      companylogid: this.receiveData.companylogid,
      pid: this.receiveData.pid,
      cpid: this.receiveData.cpid
    }
    this.$get('/wf.do?workFlowInfo', params).then(res => {
      this.printData = res.data.data
    })
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.printData.producttype === 0) {
          this.$refs.newCus.checked = true
        } else {
          this.$refs.oldCus.checked = true
        }
        if (this.printData.invoiceType === 10) {
          this.$refs.noInvoice.checked = true
        }
        if (this.printData.invoiceType === 30 && (this.printData.ttype === 10 || this.printData.ttype === 11)) {
          this.$refs.simpleInvoice.checked = true
        }
        if (this.printData.invoiceType === 30 && this.$destroyprintData.ttype === 20) {
          this.$refs.onlyInvoice.checked = true
        }
      }, 500)
    })
  },
  components: {}
}
</script>

<style id="print_Style">
#print {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background: #fff;
}
/* {
  mso-displayed-decimal-separator: '\.';
  mso-displayed-thousand-separator: '\,';
} */
.font5981 {
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
}
.font6981 {
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 'Times New Roman', serif;
  mso-font-charset: 0;
}
.xl65981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl66981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: normal;
}
.xl67981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl68981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: none;
  border-bottom: 0.5pt solid windowtext;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl69981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: general;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: none;
  border-bottom: 0.5pt solid windowtext;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl70981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: general;
  vertical-align: middle;
  border: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl71981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: 0.5pt solid windowtext;
  border-bottom: 0.5pt solid windowtext;
  border-left: none;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl72981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: 0.5pt solid windowtext;
  border-bottom: none;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl73981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: left;
  vertical-align: middle;
  border: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl74981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: none;
  border-bottom: 0.5pt solid windowtext;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: normal;
}
.xl75981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: left;
  vertical-align: middle;
  border: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: normal;
}
.xl76981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: General;
  text-align: center;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: 0.5pt solid windowtext;
  border-bottom: 0.5pt solid windowtext;
  border-left: none;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl77981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: none;
  border-right: 0.5pt solid windowtext;
  border-bottom: 0.5pt solid windowtext;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl78981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 'Times New Roman', serif;
  mso-font-charset: 0;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl79981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: 0.5pt solid windowtext;
  border-bottom: none;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: normal;
}
.xl80981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: none;
  border-right: 0.5pt solid windowtext;
  border-bottom: none;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: normal;
}
.xl81981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: none;
  border-right: 0.5pt solid windowtext;
  border-bottom: 0.5pt solid windowtext;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: normal;
}
.xl82981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: none;
  border-right: none;
  border-bottom: none;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: normal;
}
.xl83981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: none;
  border-bottom: 0.5pt solid windowtext;
  border-left: none;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl84981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: left;
  vertical-align: middle;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl85981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: left;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: none;
  border-bottom: 0.5pt solid windowtext;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl86981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: left;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: none;
  border-bottom: 0.5pt solid windowtext;
  border-left: none;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl87981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: left;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: 0.5pt solid windowtext;
  border-bottom: 0.5pt solid windowtext;
  border-left: none;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl88981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: none;
  border-bottom: none;
  border-left: 0.5pt solid windowtext;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl89981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: none;
  border-bottom: none;
  border-left: none;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl90981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: 0.5pt solid windowtext;
  border-right: 0.5pt solid windowtext;
  border-bottom: none;
  border-left: none;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl91981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 20pt;
  font-weight: 700;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl92981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 20pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
.xl93981 {
  padding-top: 1px;
  padding-right: 1px;
  padding-left: 1px;
  mso-ignore: padding;
  color: windowtext;
  font-size: 10pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-number-format: '\@';
  text-align: center;
  vertical-align: middle;
  border-top: none;
  border-right: none;
  border-bottom: 0.5pt solid windowtext;
  border-left: none;
  mso-background-source: auto;
  mso-pattern: auto;
  white-space: nowrap;
}
ruby {
  ruby-align: left;
}
rt {
  color: windowtext;
  font-size: 9pt;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 宋体;
  mso-generic-font-family: auto;
  mso-font-charset: 134;
  mso-char-type: none;
}
</style>
