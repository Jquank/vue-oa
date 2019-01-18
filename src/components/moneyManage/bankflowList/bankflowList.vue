<template>
  <div class="bank-flow component-container media-padding">
    <div class="top">
      <div class="status">
        <!-- 分配状态按钮 -->
        <el-radio-group @change="changeStatus" class="status-item" style="width:303px;" v-model="selStatus">
          <template v-for="item in statusList">
            <el-radio-button
              :key="item.per"
              :label="item.val"
              v-if="item.per.length<2||permissions.indexOf(item.per)>-1"
            >{{item.text}}</el-radio-button>
          </template>
        </el-radio-group>
        <!-- 银行类型 -->
        <auto-select :key="key_bank" :title="'银行类型'" class="status-item" v-model="selBank" @change="search()">
          <el-option label="全部" value></el-option>
          <el-option :key="index" :label="item.code_desc" :value="item.id" v-for="(item,index) in bankList"></el-option>
        </auto-select>
        <!-- 发票状态 -->
        <auto-select
          :defaultValue="invoiceStatus"
          :key="key_invoice"
          :title="'发票状态'"
          class="status-item"
          v-model="invoiceStatus"
        >
          <el-option label="全部" value="100"></el-option>
          <el-option label="已开发票" value="10"></el-option>
          <el-option label="需要" value="0"></el-option>
          <el-option label="暂不需要" value="-1"></el-option>
          <el-option label="不需要" value="-10"></el-option>
        </auto-select>
      </div>
      <div class="btns">
        <up-file
          :isHiddenFileList="true"
          :title="'导入流水'"
          :upIcon="'fa fa-cloud-download'"
          :uploadUrl="'/receipt.do?importBS'"
          class="btns-item"
          v-if="permissions.indexOf('4u') > -1"
        ></up-file>
        <el-button
          @click.native="exportFlow"
          class="btns-item"
          icon="fa fa-cloud-upload"
          type="warning"
          v-if="permissions.indexOf('6j') > -1"
        >导出流水</el-button>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="search">
      <el-input class="search-item" v-model="payCompany">
        <template slot="prepend">付款公司:</template>
      </el-input>
      <el-input class="search-item" v-model="payAccount">
        <template slot="prepend">付款名:</template>
      </el-input>
      <el-input class="search-item" v-model="companyName">
        <template slot="prepend">使用公司:</template>
      </el-input>
      <el-input class="search-item" v-model="useUser">
        <template slot="prepend">使用用户:</template>
      </el-input>
      <el-input class="search-item" v-model="useName">
        <template slot="prepend">使用人:</template>
      </el-input>
      <el-input class="search-item" v-model="remarkSearch">
        <template slot="prepend">摘要|备注:</template>
      </el-input>
      <el-input class="search-item" v-model="bdAccount">
        <template slot="prepend">百度币百度账户:</template>
      </el-input>
      <el-input class="search-item" v-model="reserveInfo">
        <template slot="prepend">预留信息:</template>
      </el-input>
      <el-input class="search-item" v-model="ckNum">
        <template slot="prepend">参考号:</template>
      </el-input>
      <el-date-picker
        :unlink-panels="true"
        class="search-item"
        end-placeholder="交易结束日期"
        format="yyyy-MM-dd HH:mm"
        range-separator="至"
        start-placeholder="交易开始日期"
        type="datetimerange"
        v-model="businessDate"
        value-format="yyyy-MM-dd HH:mm"
      ></el-date-picker>
      <el-date-picker
        :unlink-panels="true"
        class="search-item"
        end-placeholder="提单结束日期"
        format="yyyy-MM-dd HH:mm"
        range-separator="至"
        start-placeholder="提单开始日期"
        type="datetimerange"
        v-model="orderDate"
        value-format="yyyy-MM-dd HH:mm"
      ></el-date-picker>
      <div class="search-item">
        <el-button @click.native.prevent="search" type="primary">查 询</el-button>
        <el-button @click.native.prevent="reset" type="warning">重 置</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table
      size="mini"
      :data="bankFlowList"
      border
      class="table-width"
      max-height="550"
      stripe
      :row-class-name="setRowClassName"
    >
      <!-- <el-table-column type="selection" width="35"></el-table-column> -->
      <el-table-column :fixed="isFixed" label="银行类型" prop="code_desc" width="75">
        <template slot-scope="scope">
          <span v-if="scope.row._mark==='total'">合计</span>
          <span v-else>{{scope.row.code_desc}}</span>
        </template>
      </el-table-column>
      <el-table-column :fixed="isFixed" label="交易时间" width="95" prop="B_JYSJ" align="center">
        <span slot-scope="scope" v-html="timeFormat(scope.row.tm,true)"></span>
      </el-table-column>
      <el-table-column :fixed="isFixed" label="参考号" prop="no" min-width="100"></el-table-column>
      <el-table-column :fixed="isFixed" label="付款名" prop="fm_name" min-width="130"></el-table-column>
      <el-table-column :fixed="isFixed" label="付款账号" prop="fm_account" min-width="100"></el-table-column>
      <el-table-column :fixed="isFixed" label="现金收款人" prop="fm_uid" min-width="60"></el-table-column>
      <el-table-column label="付款公司名" min-width="60" prop="company_name"></el-table-column>
      <el-table-column label="摘要|备注" min-width="100" prop="remark"></el-table-column>
      <el-table-column label="百度账户" min-width="80" prop="baidu_account2"></el-table-column>
      <el-table-column label="账户类型" prop="account_type" min-width="80"></el-table-column>
      <el-table-column label="交易金额" min-width="120" prop>
        <template slot-scope="scope">
          <span v-if="scope.row._mark!=='total'">{{scope.row.amount | currency1}}</span>
          <div v-else>{{totalData.sumAmount | currency}}</div>
        </template>
      </el-table-column>
      <!-- 拆 -->
      <el-table-column class-name="splited-col" label="拆分后金额" prop width="110">
        <template slot-scope="scope">
          <el-table
            v-if="scope.row._mark!=='total'"
            :data="scope.row.split"
            :row-class-name="scope.row.split.length>1?'add-border':''"
            :show-header="false"
            class="split-item"
          >
            <el-table-column class-name="split-item-col" label prop show-overflow-tooltip>
              <span slot-scope="scope">{{scope.row.split_amount | currency1}}</span>
            </el-table-column>
          </el-table>
          <div v-else class="pl2px">{{totalData.billAmount | currency}}</div>
        </template>
      </el-table-column>
      <template v-if="selStatus!=0">
        <el-table-column class-name="splited-col" label="预留信息" prop width="120">
          <template slot-scope="scope">
            <el-table
              v-if="scope.row._mark!=='total'"
              :data="scope.row.split"
              :row-class-name="scope.row.split.length>1?'add-border':''"
              :show-header="false"
              class="split-item"
            >
              <el-table-column class-name="split-item-col" label prop show-overflow-tooltip>
                <span slot-scope="scope">{{scope.row.alloc_remark || ''}}</span>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column class-name="splited-col" label="使用人" prop width="100">
          <template slot-scope="scope">
            <el-table
              v-if="scope.row._mark!=='total'"
              :data="scope.row.split"
              :row-class-name="scope.row.split.length>1?'add-border':''"
              :show-header="false"
              class="split-item"
            >
              <el-table-column class-name="split-item-col" label prop="useName" show-overflow-tooltip>
                <span slot-scope="scope">{{scope.row.useName || ''}}</span>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column class-name="splited-col" label="公司名称" prop width="150">
          <template slot-scope="scope">
            <el-table
              v-if="scope.row._mark!=='total'"
              :data="scope.row.split"
              :row-class-name="scope.row.split.length>1?'add-border':''"
              :show-header="false"
              class="split-item"
            >
              <el-table-column class-name="split-item-col" label prop show-overflow-tooltip>
                <span
                  slot-scope="scope"
                >{{(scope.row.wfndStatus===300||scope.row.reckStatus===300)?scope.row.companyname:''}}</span>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column class-name="splited-col" label="用户名" prop width="160">
          <template slot-scope="scope">
            <el-table
              v-if="scope.row._mark!=='total'"
              :data="scope.row.split"
              :row-class-name="scope.row.split.length>1?'add-border':''"
              :show-header="false"
              class="split-item"
            >
              <el-table-column class-name="split-item-col" label prop show-overflow-tooltip>
                <span slot-scope="scope">{{scope.row.reckStatus===300?scope.row.baidu_account:''}}</span>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column class-name="splited-col" label="提单金额" prop width="120">
          <template slot-scope="scope">
            <el-table
              v-if="scope.row._mark!=='total'"
              :data="scope.row.split"
              :row-class-name="scope.row.split.length>1?'add-border':''"
              :show-header="false"
              class="split-item"
            >
              <el-table-column class-name="split-item-col" label prop show-overflow-tooltip>
                <span
                  slot-scope="scope"
                >{{(scope.row.wfndStatus===300||scope.row.reckStatus===300)?scope.row.split_amount:'' | currency1}}</span>
              </el-table-column>
            </el-table>
            <div v-else class="pl2px">{{totalData.sumSplitAmount | currency}}</div>
          </template>
        </el-table-column>
        <el-table-column class-name="splited-col" label="提单时间" prop width="95">
          <template slot-scope="scope">
            <el-table
              v-if="scope.row._mark!=='total'"
              :data="scope.row.split"
              :row-class-name="scope.row.split.length>1?'add-border':''"
              :show-header="false"
              class="split-item"
            >
              <el-table-column class-name="split-item-col" label prop show-overflow-tooltip>
                <span
                  slot-scope="scope"
                >{{(scope.row.wfndStatus===300?scope.row.bill_time:(scope.row.reckStatus===300?scope.row.bill_time:'')) | timeFormat1}}</span>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </template>
      <el-table-column class-name="splited-col" label="余额" prop v-if="selStatus==100" width="120">
        <template slot-scope="scope">
          <el-table
            v-if="scope.row._mark!=='total'"
            :data="scope.row.split"
            :row-class-name="scope.row.split.length>1?'add-border':''"
            :show-header="false"
            class="split-item"
          >
            <el-table-column class-name="split-item-col" label prop show-overflow-tooltip>
              <span
                slot-scope="inscope"
              >{{(scope.row.amount-((inscope.row.wfndStatus===300||inscope.row.reckStatus===300)?inscope.row.split_amount:0)) |currency1}}</span>
            </el-table-column>
          </el-table>
          <div v-else class="pl2px">{{totalData.yueAmount | currency}}</div>
        </template>
      </el-table-column>
      <el-table-column
        class-name="splited-col"
        label="操作"
        prop
        v-if="selStatus!=20"
        width="90"
        :fixed="actionFiexed"
        align="center"
      >
        <template slot-scope="scope" v-if="scope.row._mark!=='total'">
          <el-table
            :data="scope.row.split"
            :row-class-name="scope.row.split.length>1?'add-border':''"
            :show-header="false"
            class="split-item"
          >
            <el-table-column class-name="split-item-col" label prop>
              <template slot-scope="cscope">
                <el-dropdown :trigger="trigger" :hide-on-click="true">
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu id="my-dropdown-menu" slot="dropdown">
                    <el-dropdown-item>
                      <!-- 客服看到的认领(阳光快付不允许认) -->
                      <el-button
                        @click.native.prevent="claim(cscope.row)"
                        size="mini"
                        type="success"
                        v-if="(permissions.indexOf('6k')>-1&&selStatus===0) && (rid==='12' || rid==='2y') && cscope.row.isClaim == '1'&&
                        ( ((scope.row.bkid!='c5b2159eb53c11e7a1f900e066be4002' && scope.row.bkid!='14721bbfba6f11e8929700e066be4061')&&scope.row.place_id==='HUB027')
                        || scope.row.place_id!=='HUB027')"
                      >认领</el-button>
                      <!-- 财务和admin看到的认领 -->
                      <el-button
                        @click.native.prevent="claim(cscope.row)"
                        size="mini"
                        type="success"
                        v-if="((permissions.indexOf( '6k')>-1&&selStatus===0)&&rid!=='12' && rid!=='2y'|| rid==='0') && cscope.row.isClaim == '1'"
                      >认领</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item divided v-if="permissions.indexOf( '6s')>-1&&selStatus===0">
                      <el-button @click.native.prevent="allot(cscope.row)" size="mini" type="primary">分配</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item divided v-if="permissions.indexOf('6l')>-1&&selStatus===0">
                      <el-button @click.native.prevent="split(cscope.row)" size="mini" type="warning">拆账</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item divided v-if="permissions.indexOf( '6m')>-1&&selStatus ===10">
                      <el-button @click.native.prevent="goBack(cscope.row)" size="mini" type="warning">退回</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item divided v-if="permissions.indexOf( '6t')>-1&&selStatus===0">
                      <el-button @click.native.prevent="deleteFlow(cscope.row)" size="mini" type="danger">删除</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item divided v-if="permissions.indexOf('76')>-1&&selStatus===100">
                      <el-button @click.native.prevent="editFlow(cscope.row)" size="mini" type="info">编辑</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
    <page :sendParams="sendParams" :url="bankUrl" @updateList="updateBankList" class="page"></page>

    <!-- 分配弹窗 -->
    <el-dialog :modal-append-to-body="false" :visible.sync="allotDialog" title="分配流水" width="400px">
      <el-form :model="allotForm" label-width="80px">
        <el-form-item label="预留信息" required>
          <el-input :rows="3" type="textarea" v-model="allotForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="商务" required>
          <el-input disabled v-model="allotForm.shangWu" class="input-btn"></el-input>
          <el-button @click.native.prevent="selAllotUserDialog = true" type="primary">选择</el-button>
        </el-form-item>
        <div class="text-center">
          <el-button @click.native.prevent="confirmAllot" type="success">分配</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 选择人员弹窗 -->
    <el-dialog :modal-append-to-body="false" :visible.sync="selAllotUserDialog" title="选择人员" width="550px">
      <select-user :key="key_seluser" @closeDialog="selAllotUserDialog=false" @userId="getAllotUserId"></select-user>
    </el-dialog>
    <el-dialog :modal-append-to-body="false" :visible.sync="selUserDialog" title="选择人员" width="550px">
      <select-user :key="key_seluser" @closeDialog="selUserDialog=false" @userId="getUserId"></select-user>
    </el-dialog>
    <el-dialog :modal-append-to-body="false" :visible.sync="selKeepUserDialog" title="选择维护客服" width="550px">
      <select-user :key="key_selkeepuser" @closeDialog="selKeepUserDialog=false" @userId="getKeepUserId"></select-user>
    </el-dialog>
    <!-- 拆账弹窗 -->
    <el-dialog :modal-append-to-body="false" :visible.sync="splitDialog" title="拆账" width="500px">
      <el-form :model="splitForm" label-position="left" label-width="140px" class="weight-label">
        <el-form-item label="总金额 :">
          <span>{{splitForm.totalMoney | currency1}}</span>
        </el-form-item>
        <el-form-item label="已拆账金额 :">
          <span>{{splitedMoney | currency1}}</span>
        </el-form-item>
        <el-form-item label="剩余可拆账金额 :">
          <span>{{restMoney | currency1}}</span>
        </el-form-item>
        <div :key="index" class="mt10px" v-for="(item,index) in splitForm.splitItem">
          <el-input class="contact-phone" v-model="item.money"></el-input>
          <el-button
            :icon="index===0?'fa fa-plus':'fa fa-minus'"
            :type="index===0?'success':'danger'"
            @click.native.prevent="addContact(index)"
            circle
            class="circle-btn"
            size="mini"
          ></el-button>
        </div>
        <div class="text-center mt10px">
          <el-button @click.native.prevent="clearSplit" type="warning">清除</el-button>
          <el-button @click.native.prevent="confirmSplit" type="primary">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 认领弹窗 -->
    <el-dialog :modal-append-to-body="false" :visible.sync="claimDialog" title="认领" width="400px">
      <el-form :model="claimForm" label-width="80px">
        <el-form-item label="备注 :" required>
          <el-input :rows="3" type="textarea" v-model="claimForm.remark"></el-input>
        </el-form-item>
        <div class="text-center">
          <el-button @click.native.prevent="confirmClaim" type="primary">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 编辑流水弹窗 -->
    <el-dialog
      :modal-append-to-body="false"
      :title="'编辑流水信息----金额 : '+ flowMoney"
      :visible.sync="editDialog"
      width="800px"
      v-drag-dialog
    >
      <el-form :model="editForm" label-width="140px" :label-position="labelPosition">
        <el-form-item label required>
          <template slot="label">
            <el-button @click.native.prevent="selUser('user')" type="primary">选择使用人</el-button>
          </template>
          <el-input disabled v-model="editForm.user"></el-input>
        </el-form-item>
        <el-form-item label required>
          <template slot="label">
            <el-button @click.native.prevent="selCompanyDialog=true" type="primary">选择公司</el-button>
          </template>
          <el-input v-model="editForm.company"></el-input>
        </el-form-item>
        <el-form-item label="百度账号 :" required>
          <el-input v-model="editForm.bdAccount"></el-input>
        </el-form-item>
        <el-form-item label="用户ID :" required>
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>
        <el-form-item label required>
          <template slot="label">
            <el-button @click.native.prevent="selUser('keepUser')" type="primary">选择维护客服</el-button>
          </template>
          <el-input disabled v-model="editForm.keepUser"></el-input>
        </el-form-item>
        <!-- <el-form-item label="类型 :" required>
          <el-radio v-model="editForm.radio" label="1">新开</el-radio>
          <el-radio v-model="editForm.radio" label="0">续费</el-radio>
        </el-form-item>-->
        <!-- <el-form-item label="产品类型 :">
          <el-checkbox-group @change="selProduct" v-model="editForm.productType">
            <el-checkbox v-for="(item,index) in editForm.productList" :key="index" :label="item">{{item.code_desc}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>-->
        <!-- <el-form-item v-if="editForm.productMoneyList.length!==0">
          <el-table :data="editForm.productMoneyList" border size="mini">
            <el-table-column label="" prop="" width="100">
              <span slot-scope="scope">{{scope.row.type | productType}}</span>
            </el-table-column>
            <el-table-column label="实际到款" prop="">
              <template slot-scope="scope">
                <el-input v-model="scope.row.real_amount"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="代金券" prop="">
              <template slot-scope="scope">
                <el-input v-model="scope.row.djq"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="现金券" prop="">
              <template slot-scope="scope">
                <el-input v-model="scope.row.xjq"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="申请加款" prop="">
              <template slot-scope="scope">
                <el-input v-model="scope.row.apply_amount"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>-->
        <!-- <el-form-item label="大搜服务费 :" required>
          <el-input v-model="editForm.searvice"></el-input>
        </el-form-item>
        <el-form-item label="服务费期限 :" required>
          <el-input v-model="editForm.searviceYear">
            <span slot="prepend">月</span>
          </el-input>
        </el-form-item>-->
        <el-form-item label="提单金额 :">
          <el-input v-model="editForm.money"></el-input>
        </el-form-item>
        <el-form-item label="提单时间 :" required>
          <el-date-picker
            format="yyyy-MM-dd HH:mm"
            placeholder="选择提单时间"
            type="datetime"
            v-model="editForm.subOrderDate"
            value-format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="预留信息 :">
          <el-input :rows="2" type="textarea" v-model="editForm.remark"></el-input>
        </el-form-item>
        <div class="text-center">
          <el-button @click.native.prevent="subEdit" type="primary">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 选择公司弹窗 -->
    <el-dialog :modal-append-to-body="false" :visible.sync="selCompanyDialog" title="选择公司" width="900px">
      <el-input
        @click.native.prevent="searchCompany($event)"
        @keydown.enter.native="searchCompany('enter')"
        placeholder="搜索客服"
        style="margin-top:10px;"
        v-model="comForm.companyName"
      >
        <span class="search-service" slot="append">搜索客服</span>
      </el-input>
      <el-table :data="comList" class="table-width" id="cus-out-table">
        <el-table-column label="客户名称" min-width="170" prop="companyname"></el-table-column>
        <el-table-column label="客户类型" prop>
          <span slot-scope="scope">{{scope.row.producttype | cusState('cusType')}}</span>
        </el-table-column>
        <el-table-column label="公司状态" prop="companyname">
          <span slot-scope="scope">{{scope.row.ctype | cusState('cusStatus')}}</span>
        </el-table-column>
        <el-table-column label="业务状态" prop>
          <span slot-scope="scope">{{scope.row.cltype + '' + scope.row.cltype | businessStatus}}</span>
        </el-table-column>
        <el-table-column label="所属商务" prop="kefa"></el-table-column>
        <el-table-column label="所属客服" prop="kefu"></el-table-column>
        <el-table-column label="百度账号" prop="baidu_account"></el-table-column>
        <el-table-column align="center" label="操作" prop>
          <template slot-scope="scope">
            <el-button @click.native.prevent="confirmSelCompany(scope.row)" class="xsbtn" type="success">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page
        :sendParams="comParams"
        :simpleLayout="'total, prev, next, jumper'"
        :url="comUrl"
        @updateList="getComList"
        class="page"
      ></page>
    </el-dialog>
  </div>
</template>

<script>
import { getByCode } from 'api/getOptions'
import cookie from 'js-cookie'
import Page from 'base/page/page'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectUser from 'base/selectUser/selectUser'
import UpFile from 'base/upLoad/upFile'
import { serverUrl } from 'api/http'
import { appMark } from 'common/js/utils'
export default {
  data() {
    return {
      labelPosition: 'left',
      actionFiexed: 'right',
      isFixed: 'left',
      trigger: 'hover',
      serverUrl: serverUrl,
      rid: cookie.get('rid'),
      permissions: cookie.getJSON('permissions'),
      tk: cookie.get('token'),
      userId: cookie.get('userId'),
      expandTest: [{ name: 'ddd', age: 18 }, { name: 'ccc', age: 19 }],
      bankFlowList: [],
      bankUrl: '/receipt.do?showbankreceipt',
      sendParams: {
        invoice: 100,
        type: 0
      },
      bankList: [],
      statusList: [
        { per: '1', text: '待分配(待认领)', val: 0 },
        { per: '6w', text: '已分配', val: 10 },
        { per: '6x', text: '已认领', val: 20 },
        { per: '2', text: '全部', val: 100 }
      ],
      selStatus: 0,
      selBank: '',
      key_bank: '',
      invoiceStatus: '100',
      key_invoice: '1',
      companyName: '',
      remarkSearch: '',
      bdAccount: '',
      ckNum: '',
      useUser: '',
      useName: '',
      payCompany: '',
      reserveInfo: '',
      payAccount: '',
      businessDate: [],
      orderDate: [],

      rowData: {},
      allotDialog: false,
      allotForm: {
        remark: '',
        shangWu: ''
      },
      selAllotUserDialog: false,
      selUserDialog: false,
      selKeepUserDialog: false,
      selUserId: '',
      selAllotUserId: '',
      splitDialog: false,
      splitForm: {
        totalMoney: 0,
        splitItem: [{ money: 0 }]
      },
      claimDialog: false,
      claimForm: {
        remark: ''
      },
      editDialog: false,
      editForm: {
        user: '',
        company: '',
        remark: '',
        bdAccount: '',
        radio: '1',
        productType: [],
        productList: [],
        productMoneyList: [],
        searvice: '0',
        searviceYear: '0',
        subOrderDate: '',
        money: 0,
        id: '',
        keepUser: ''
      },
      selCompanyDialog: false,
      comForm: {
        companyName: ''
      },
      comList: [],
      comUrl: '/Search.do?ByBaiduAccount',
      comParams: {},
      comInfo: {},
      flowMoney: 0,
      key_seluser: '',
      key_selkeepuser: '1',
      totalData: {}
    }
  },
  computed: {
    // 已拆账金额
    splitedMoney() {
      let sum = 0
      this.splitForm.splitItem.forEach(val => {
        sum += parseFloat(val.money || 0)
      })
      return sum.toFixed(2)
    },
    // 剩余可拆账金额
    restMoney() {
      return (
        parseFloat(this.splitForm.totalMoney) - parseFloat(this.splitedMoney)
      )
    }
  },
  created() {
    if (appMark()) {
      this.isFixed = this.actionFiexed = false
      this.trigger = 'click'
      this.labelPosition = 'top'
    }
    this.params = {
      alloctype: -10,
      bank: '0',
      usertype: 0
    }
    this._getBankType()
  },
  methods: {
    setRowClassName({ row, rowIndex }) {
      if (row._mark === 'total') {
        return 'red'
      }
    },
    exportFlow() {
      this.$export('/receipt.do?bankReceiptExport', this.sendParams)
    },
    // 分配流水
    allot(data) {
      this.rowData = data
      // this.allotForm.shangWu = ''
      this.allotDialog = true
    },
    selUser(type) {
      type === 'user'
        ? (this.selUserDialog = true)
        : (this.selKeepUserDialog = true)
      this.key_seluser = new Date() + ''
      this.key_selkeepuser = new Date() + '1'
    },
    getUserId(id, name) {
      this.selUserId = id
      this.editForm.user = name
    },
    getKeepUserId(id, name) {
      this.editForm.keepUser = name
    },
    getAllotUserId(id, name) {
      this.selAllotUserId = id
      this.allotForm.shangWu = name
    },
    confirmAllot() {
      let params = {
        receiptid: [
          {
            id: this.rowData.id,
            pid: this.rowData.pid
          }
        ],
        uid: this.selAllotUserId,
        alloc_remark: this.allotForm.remark,
        type: 10
      }
      if (!params.alloc_remark || !params.uid) {
        this.$message({
          type: 'warning',
          message: '请完成必填项或必选项！'
        })
        return
      }
      this.$post('/receipt.do?allocationbankreceipt', params).then(res => {
        this.$message({
          type: 'success',
          message: '分配成功'
        })
        this.allotDialog = false
        this.search()
      })
    },
    // 拆账
    split(data) {
      this.rowData = data
      this.splitForm.totalMoney = data.split_amount
      this.splitDialog = true
    },
    addContact(index) {
      if (index === 0) {
        this.splitForm.splitItem.push({
          money: 0
        })
      } else {
        this.splitForm.splitItem.splice(index, 1)
      }
    },
    clearSplit() {
      this.splitForm.splitItem = [{ money: 0 }]
    },
    confirmSplit() {
      let hasZero = this.splitForm.splitItem.some(val => {
        return val.money == 0 // eslint-disable-line
      })
      if (hasZero) {
        this.$message({
          type: 'warning',
          message: '拆账金额不能为0！'
        })
        return
      }
      if (+this.restMoney !== 0) {
        this.$message({
          type: 'warning',
          message: '拆账金额不符，请重新拆账'
        })
        return
      }
      let arr = []
      this.splitForm.splitItem.forEach(val => {
        arr.push(val.money)
      })
      let params = {
        brId: this.rowData.id,
        moneyArr: arr
      }
      this.$post('/receipt.do?bankReceiveChai', params).then(res => {
        if (res.data.data) {
          this.$message({
            type: 'success',
            message: '拆账成功'
          })
        }
        this.splitDialog = false
        this.search()
      })
    },
    // 认领
    claim(data) {
      this.rowData = data
      this.claimDialog = true
    },
    confirmClaim() {
      let params = {
        receiptid: [
          {
            id: this.rowData.id,
            pid: this.rowData.pid
          }
        ],
        uid: this.userId,
        alloc_remark: this.claimForm.remark,
        type: 20
      }
      if (!params.alloc_remark) {
        this.$message({
          type: 'warning',
          message: '请填写备注'
        })
        return
      }
      this.$post('/receipt.do?allocationbankreceipt', params).then(res => {
        if (res.data[0].data) {
          this.$message({
            type: 'success',
            message: '认领成功'
          })
          this.search()
          this.claimDialog = false
        }
      })
    },
    // 退回
    goBack(data) {
      this.rowData = data
      this.$confirm('确定要退回吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$get('/receipt.do?receiptClaimBack', {
            brcId: this.rowData.id
          }).then(res => {
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: '退回成功'
              })
              this.search()
            } else {
              this.$message({
                type: 'error',
                message: '此笔流水不能退回'
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
    },
    // 删除
    deleteFlow(data) {
      this.$confirm('确定要删除此笔流水吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            idsarray: [
              {
                id: data.id,
                pid: data.pid
              }
            ]
          }
          this.$post('/receipt.do?delBankRecept', params).then(res => {
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.search()
            } else {
              this.$message({
                type: 'error',
                message: `${res.data.msg}`
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
    },
    // 编辑
    editFlow(data) {
      this.editForm.money = data.split_amount
      this.selUserId = ''
      this.comInfo = {}
      this.editForm.subOrderDate = ''
      this.editForm.productMoneyList = []
      this.editForm.searvice = ''
      this.editForm.searviceYear = ''
      this.rowData = data
      this.flowMoney = this.rowData.split_amount
      this.editDialog = true
      this._getProductList()
    },
    _getProductList() {
      getByCode(38).then(res => {
        this.editForm.productList = res.data.data
      })
    },
    selProduct(val) {
      this.editForm.productMoneyList = []
      val.forEach(item => {
        this.editForm.productMoneyList.push({
          id: null,
          type: item.code_val + '',
          code_val: item.code_val,
          bonustype: item.tb_field_name,
          real_amount: 0,
          djq: 0,
          xjq: 0,
          apply_amount: 0
        })
      })
    },
    searchCompany(e) {
      if (e === 'enter' || e.target.nodeName !== 'INPUT') {
        this.comParams = {
          companyname: this.comForm.companyName
        }
      }
    },
    getComList(res) {
      this.comList = res.data[0].data
    },
    confirmSelCompany(data) {
      this.comInfo = data
      this.editForm.bdAccount = this.comInfo.baidu_account
      this.editForm.company = this.comInfo.companyname
      this.editForm.id = this.comInfo.baidu_id
      this.editForm.keepUser = this.comInfo.kefu
      this.editForm.cpid = this.comInfo.cpid
      this.selCompanyDialog = false
    },
    subEdit() {
      let params = {
        bsid: this.rowData.id,
        uid: this.selUserId,
        remark: this.editForm.remark,
        companyid: this.comInfo.companyid,
        companylogid: this.comInfo.companylogid,
        companyname: this.editForm.company,
        baidu_account: this.editForm.bdAccount,
        bill_time: this.editForm.subOrderDate,
        // useDetail: this.editForm.productMoneyList,
        // service_money: this.editForm.searvice,
        // service_year: this.editForm.searviceYear,
        // orderOrRenew: this.editForm.radio === '1' ? 'order' : 'renew',
        kefu: this.editForm.keepUser,
        baidu_id: this.editForm.id,
        cpid: this.editForm.cpid
      }
      console.log(params)
      if (!params.baidu_account || !params.bill_time || !params.uid) {
        this.$message({
          type: 'warning',
          message: '请完善必填信息！'
        })
        return
      }
      // let regNum = /^\d{1,}(\.)?\d*$/
      // let sum = 0
      // if (this.editForm.productMoneyList.length !== 0) {
      //   this.editForm.productMoneyList.forEach(val => {
      //     if (!regNum.test(val.real_amount) || !regNum.test(val.djq) || !regNum.test(val.xjq) || !regNum.test(val.apply_amount)) {
      //       this.$message({
      //         type: 'warning',
      //         message: '请填写产品金额！'
      //       })
      //       throw new Error('ignore')
      //     }
      //     sum += parseFloat(val.real_amount)
      //   })
      //   if ((sum + parseFloat(this.editForm.searvice)).toFixed(2) !== parseFloat(this.flowMoney).toFixed(2)) {
      //     this.$message({
      //       type: 'warning',
      //       message: '请确保实际总到款等于流水金额！'
      //     })
      //     return
      //   }
      // }
      this.$post('/receipt.do?manualUserReceive', params)
        .then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.editDialog = false
            this.search()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    search() {
      this.sendParams = {
        type: this.selStatus,
        bank: this.selBank,
        start_time: this.businessDate[0],
        start_end: this.businessDate[1],
        bill_start: this.orderDate[0], // 提单时间
        bill_end: this.orderDate[1],
        remark: this.remarkSearch, // 摘要
        fm_name: this.payAccount, // 付款名
        companyname: this.companyName,
        alloc_remark: this.reserveInfo, // 预留信息
        invoice: this.invoiceStatus,
        baidu_account2: this.bdAccount,
        no: this.ckNum, // 参考号
        company_name: this.payCompany,
        baidu_account: this.useUser,
        use_name: this.useName
      }
    },
    reset() {
      this.selBank = ''
      this.key_bank = new Date() + ''
      this.invoiceStatus = '100'
      this.key_invoice = new Date() + '1'
      this.companyName = ''
      this.remarkSearch = ''
      this.bdAccount = ''
      this.reserveInfo = ''
      this.payAccount = ''
      this.ckNum = ''
      this.payCompany = ''
      this.useUser = ''
      this.useName = ''
      this.businessDate = []
      this.orderDate = []
    },
    // 状态按钮change事件
    changeStatus(val) {
      this.search()
    },
    _getBankType() {
      getByCode(42).then(res => {
        this.bankList = res.data.data
      })
    },
    updateBankList(res) {
      this.bankFlowList = res.data[0].data
      if (this.selStatus === 100) {
        this.totalData = res.data[2].data
        let tempObj = {
          split: [],
          _mark: 'total'
        }
        this.bankFlowList.push(tempObj)
      }
    }
  },
  components: {
    Page,
    AutoSelect,
    SelectUser,
    UpFile
  }
}
</script>

<style>
.el-dropdown-menu--small .el-dropdown-menu__item {
  padding: 2px 15px;
}
</style>

<style lang="less">
.bank-flow {
  .top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: -10px;
    .status {
      display: flex;
      flex-wrap: wrap;
      .status-item {
        margin-top: 5px;
        margin-left: 10px;
        width: 210px;
      }
    }
    .btns {
      .btns-item {
        display: inline-block;
        margin-top: 5px;
        margin-left: 10px;
      }
    }
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    .search-item {
      margin-top: 5px;
      margin-left: 10px;
      width: 310px;
    }
  }
  .splited-col {
    padding: 0;
    > div.cell {
      padding: 0;
    }
    .split-item {
      table {
        border-collapse: collapse; // 为tr设置边框需要
      }
      .el-table__body-wrapper {
        overflow: hidden;
      }
      &::before {
        z-index: inherit; // 消除table最下面的边框
      }
      .split-item-col {
        border-bottom: none;
        padding: 2px 0;
        > div.cell {
          height: 25px;
          line-height: 25px;
        }
      }
    }
    .add-border:not(:last-child) {
      border-bottom: 1px solid #d0d2d8;
    }
  }
  .el-dropdown .el-button {
    padding: 5px 7px;
  }
  .contact-phone {
    width: calc(~'(100% - 35px)');
  }
  .pl2px {
    padding-left: 4px;
  }
}
</style>
