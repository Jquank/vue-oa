/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

// 登录页
const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module)
  })
}
// 首页
const IndexPage = (resolve) => {
  import('components/indexPage/indexPage').then((module) => {
    resolve(module)
  })
}
const IndexContent = (resolve) => {
  import('components/indexContent/indexContent').then((module) => {
    resolve(module)
  })
}
// 系统配置
const Rule = (resolve) => {
  import('components/systemSetting/rule/rule').then((module) => {
    resolve(module)
  })
}
const Auth = (resolve) => {
  import('components/systemSetting/auth/auth').then((module) => {
    resolve(module)
  })
}
const SystemCycle = (resolve) => {
  import('components/systemSetting/systemCycle/systemCycle').then((module) => {
    resolve(module)
  })
}
const DepartManage = (resolve) => {
  import('components/systemSetting/departManage/departManage').then((module) => {
    resolve(module)
  })
}
const DepartSetNum = (resolve) => {
  import('components/systemSetting/departSetNum/departSetNum').then((module) => {
    resolve(module)
  })
}
const AccountManage = (resolve) => {
  import('components/systemSetting/accountManage/accountManage').then((module) => {
    resolve(module)
  })
}
const News = (resolve) => {
  import('components/systemSetting/news/news').then((module) => {
    resolve(module)
  })
}
const Activity = (resolve) => {
  import('components/systemSetting/activity/activity').then((module) => {
    resolve(module)
  })
}
const Editor = (resolve) => {
  import('components/systemSetting/news/editor').then((module) => {
    resolve(module)
  })
}
const ViewNews = (resolve) => {
  import('components/systemSetting/news/viewNews').then((module) => {
    resolve(module)
  })
}
// 人员管理
const AddUser = (resolve) => {
  import('components/userManage/addUser/addUser').then((module) => {
    resolve(module)
  })
}
const UserList = (resolve) => {
  import('components/userManage/userList/userList').then((module) => {
    resolve(module)
  })
}
// 客户管理
const AddCus = (resolve) => {
  import('components/cusManage/addCus/addCus').then((module) => {
    resolve(module)
  })
}
const ApplyCus = (resolve) => {
  import('components/cusManage/applyCus/applyCus').then((module) => {
    resolve(module)
  })
}
const ApplyDetail = (resolve) => {
  import('components/cusManage/applyCus/applyDetail').then((module) => {
    resolve(module)
  })
}
const MyCus = (resolve) => {
  import('components/cusManage/myCus/myCus').then((module) => {
    resolve(module)
  })
}
const MyCusDetail = (resolve) => {
  import('components/cusManage/myCus/myCusDetail').then((module) => {
    resolve(module)
  })
}
const VisitRecord = (resolve) => {
  import('components/cusManage/visitRecord/visitRecord').then((module) => {
    resolve(module)
  })
}
const FollowRecord = (resolve) => {
  import('components/cusManage/followRecord/followRecord').then((module) => {
    resolve(module)
  })
}
const ImportCus = (resolve) => {
  import('components/cusManage/importCus/importCus').then((module) => {
    resolve(module)
  })
}
// 客户审核
const DealCheck = (resolve) => {
  import('components/cusCheck/dealCheck/dealCheck').then((module) => {
    resolve(module)
  })
}
const CheckDetail = (resolve) => {
  import('components/cusCheck/dealCheck/checkDetail').then((module) => {
    resolve(module)
  })
}
const CheckRecord = (resolve) => {
  import('components/cusCheck/checkRecord/checkRecord').then((module) => {
    resolve(module)
  })
}
const CusInfo = (resolve) => {
  import('components/cusCheck/cusInfo/cusInfo').then((module) => {
    resolve(module)
  })
}
const viewCusInfo = (resolve) => {
  import('components/cusCheck/cusInfo/viewCusInfo').then((module) => {
    resolve(module)
  })
}
const CusPoolManage = (resolve) => {
  import('components/cusCheck/cusPoolManage/cusPoolManage').then((module) => {
    resolve(module)
  })
}
const ViewCusInfo = (resolve) => {
  import('components/cusCheck/cusPoolManage/viewCusInfo').then((module) => {
    resolve(module)
  })
}
// 客户搜索
const CusSearch = (resolve) => {
  import('components/cusSearch/cusSearch/cusSearch').then((module) => {
    resolve(module)
  })
}
const CusOut = (resolve) => {
  import('components/cusSearch/cusOut/cusOut').then((module) => {
    resolve(module)
  })
}
// 合同管理
const AllotContract = (resolve) => {
  import('components/contract/allotContract/allotContract').then((module) => {
    resolve(module)
  })
}
const ContractList = (resolve) => {
  import('components/contract/contractList/contractList').then((module) => {
    resolve(module)
  })
}
const ApplyContract = (resolve) => {
  import('components/contract/applyContract/applyContract').then((module) => {
    resolve(module)
  })
}
// 续费管理
const RenewApply = (resolve) => {
  import('components/renew/renewApply/renewApply').then((module) => {
    resolve(module)
  })
}
const RenewList = (resolve) => {
  import('components/renew/renewList/renewList').then((module) => {
    resolve(module)
  })
}
const RenewCheck = (resolve) => {
  import('components/renew/renewCheck/renewCheck').then((module) => {
    resolve(module)
  })
}
const RenewReceive = (resolve) => {
  import('components/renew/renewReceive/renewReceive').then((module) => {
    resolve(module)
  })
}
const RenewDispatch = (resolve) => {
  import('components/renew/renewDispatch/renewDispatch').then((module) => {
    resolve(module)
  })
}
const RenewAdd = (resolve) => {
  import('components/renew/renewAdd/renewAdd').then((module) => {
    resolve(module)
  })
}
const AccountOut = (resolve) => {
  import('components/renew/accountOut/accountOut').then((module) => {
    resolve(module)
  })
}
// 工资管理
const SalaryList = (resolve) => {
  import('components/salary/salaryList').then((module) => {
    resolve(module)
  })
}
const SalaryDetail = (resolve) => {
  import('components/salary/salaryDetail').then((module) => {
    resolve(module)
  })
}
const SalaryError = (resolve) => {
  import('components/salary/salaryError').then((module) => {
    resolve(module)
  })
}
// 到款管理
const MoneyRecord = (resolve) => {
  import('components/moneyManage/moneyRecord/moneyRecord').then((module) => {
    resolve(module)
  })
}
const AddMoney = (resolve) => {
  import('components/moneyManage/moneyRecord/addMoney').then((module) => {
    resolve(module)
  })
}
const ViewMoney = (resolve) => {
  import('components/moneyManage/moneyRecord/viewMoney').then((module) => {
    resolve(module)
  })
}
const EditMoney = (resolve) => {
  import('components/moneyManage/moneyRecord/editMoney').then((module) => {
    resolve(module)
  })
}
const BankflowList = (resolve) => {
  import('components/moneyManage/bankflowList/bankflowList').then((module) => {
    resolve(module)
  })
}
const MyFlow = (resolve) => {
  import('components/moneyManage/myFlow/myFlow').then((module) => {
    resolve(module)
  })
}
const MoneyCount = (resolve) => {
  import('components/moneyManage/moneyCount/moneyCount').then((module) => {
    resolve(module)
  })
}
// 订单管理
const AddBaiduOrder = (resolve) => {
  import('components/order/addBaiduOrder/addBaiduOrder').then((module) => {
    resolve(module)
  })
}
const AddWjOrder = (resolve) => {
  import('components/order/addWjOrder/addWjOrder').then((module) => {
    resolve(module)
  })
}
const AddZtcOrder = (resolve) => {
  import('components/order/addZtcOrder/addZtcOrder').then((module) => {
    resolve(module)
  })
}
const AddKaOrder = (resolve) => {
  import('components/order/addKaOrder/addKaOrder').then((module) => {
    resolve(module)
  })
}
const OrderPending = (resolve) => {
  import('components/order/orderPending/orderPending').then((module) => {
    resolve(module)
  })
}
const PendingDetail = (resolve) => {
  import('components/order/orderPending/pendingDetail').then((module) => {
    resolve(module)
  })
}
const EditOrder = (resolve) => {
  import('components/order/orderPending/editOrder').then((module) => {
    resolve(module)
  })
}
const OrderList = (resolve) => {
  import('components/order/orderList/orderList').then((module) => {
    resolve(module)
  })
}
const Print = (resolve) => {
  import('components/order/print/print').then((module) => {
    resolve(module)
  })
}
// 发票管理
const InvoicePending = (resolve) => {
  import('components/invoiceManage/invoicePending/invoicePending').then((module) => {
    resolve(module)
  })
}
const InvoiceList = (resolve) => {
  import('components/invoiceManage/invoiceList/invoiceList').then((module) => {
    resolve(module)
  })
}
const InvoiceHandled = (resolve) => {
  import('components/invoiceManage/invoiceHandled/invoiceHandled').then((module) => {
    resolve(module)
  })
}
const InvoiceSend = (resolve) => {
  import('components/invoiceManage/invoiceSend/invoiceSend').then((module) => {
    resolve(module)
  })
}
const InvoiceCheck = (resolve) => {
  import('components/invoiceManage/invoiceCheck/invoiceCheck').then((module) => {
    resolve(module)
  })
}
const ChargeOffCheck = (resolve) => {
  import('components/invoiceManage/chargeOffCheck/chargeOffCheck').then((module) => {
    resolve(module)
  })
}
// 报表统计
const ReportData = (resolve) => {
  import('components/reportData/reportData').then((module) => {
    resolve(module)
  })
}
const AheadInvoice = (resolve) => {
  import('components/reportData/aheadInvoice').then((module) => {
    resolve(module)
  })
}
const OrderReport = (resolve) => {
  import('components/reportData/orderReport').then((module) => {
    resolve(module)
  })
}
const BranchAdd = (resolve) => {
  import('components/reportData/branchAdd').then((module) => {
    resolve(module)
  })
}
const MoneyChart = (resolve) => {
  import('components/reportData/moneyChart').then((module) => {
    resolve(module)
  })
}
// 呼叫中心
import PhoneChange from 'components/callCenter/phoneChange'
import _History from 'components/callCenter/history'
import MissedCall from 'components/callCenter/missedCall'
import CallReport from 'components/callCenter/callReport'
import PhoneWatch from 'components/callCenter/phoneWatch'
import AcdWatch from 'components/callCenter/acdWatch'
import WorkerWatch from 'components/callCenter/workerWatch'
import BlackList from 'components/callCenter/blackList'
import CallCenter from 'components/callCenter/callCenter'
// 产品列表
const TextEditor = (resolve) => {
  import('components/textEditor/textEditor').then((module) => {
    resolve(module)
  })
}
const ProductManage = (resolve) => {
  import('components/productList/productManage').then((module) => {
    resolve(module)
  })
}
const ViewProduct = (resolve) => {
  import('components/productList/viewProduct').then((module) => {
    resolve(module)
  })
}
const AddClassify = (resolve) => {
  import('components/productList/addClassify').then((module) => {
    resolve(module)
  })
}
const ProductShow = (resolve) => {
  import('components/productList/productShow').then((module) => {
    resolve(module)
  })
}
// 反馈流程
const ProcessManage = (resolve) => {
  import('components/feedBack/processManage').then((module) => {
    resolve(module)
  })
}
const ProcessShow = (resolve) => {
  import('components/feedBack/processShow').then((module) => {
    resolve(module)
  })
}
const ProcessClassify = (resolve) => {
  import('components/feedBack/processClassify').then((module) => {
    resolve(module)
  })
}
import Test from 'components/login/test'

import store from '../store'
import cookie from 'js-cookie'
Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/test'
    // },
    // {
    //   path: '*',
    //   redirect: '/test'
    // },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: Test
    // },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/indexPage',
      component: IndexPage,
      children: [
        {
          path: '',
          redirect: 'indexContent',
          component: IndexContent
        },
        {
          path: 'indexContent',
          name: 'indexContent',
          meta: { text: '首页' },
          component: IndexContent
        },
        // 系统配置
        {
          path: 'rule',
          name: 'rule',
          meta: { text: '权限设置' },
          component: Rule
        },
        {
          path: 'auth',
          name: 'auth',
          meta: { text: '角色设置' },
          component: Auth
        },
        {
          path: 'systemCycle',
          name: 'systemCycle',
          meta: { text: '时长设置' },
          component: SystemCycle
        },
        {
          path: 'departManage',
          name: 'departManage',
          meta: { text: '部门管理' },
          component: DepartManage
        },
        {
          path: 'departSetNum',
          name: 'departSetNum',
          meta: { text: '部门配额' },
          component: DepartSetNum
        },
        {
          path: 'accountManage',
          name: 'accountManage',
          meta: { text: '账号管理' },
          component: AccountManage
        },
        {
          path: 'news',
          name: 'news',
          meta: { text: '公告管理' },
          component: News,
          children: [
            {
              path: 'add/:id',
              meta: { text: '新增公告' },
              component: Editor
            },
            {
              path: 'edit/:id',
              meta: { text: '编辑公告' },
              component: Editor
            },
            {
              path: 'view/:id',
              meta: { text: '公告详情' },
              component: ViewNews
            }
          ]
        },
        {
          path: 'activity',
          name: 'activity',
          meta: { text: '活动/产品类型' },
          component: Activity
        },
        // 人员管理
        {
          path: 'addUser',
          name: 'addUser',
          meta: { text: '新增人员' },
          component: AddUser
        },
        {
          path: 'userList',
          name: 'userList',
          meta: { text: '人员列表' },
          component: UserList
        },
        // 客户管理
        {
          path: 'addCus',
          name: 'addCus',
          meta: { text: '新增客户' },
          component: AddCus
        },
        {
          path: 'applyCus',
          name: 'applyCus',
          meta: { text: '申领客户' },
          component: ApplyCus,
          children: [{
            path: ':id',
            meta: { text: '申领详情' },
            component: ApplyDetail
          }]
        },
        {
          path: 'myCus',
          name: 'myCus',
          meta: { text: '我的客户' },
          component: MyCus,
          children: [
            {
              path: ':id',
              meta: { text: '客户详情' },
              component: MyCusDetail
            }
          ]
        },
        {
          path: 'visitRecord',
          name: 'visitRecord',
          meta: { text: '出访记录' },
          component: VisitRecord
        },
        {
          path: 'followRecord',
          name: 'followRecord',
          meta: { text: '跟进记录' },
          component: FollowRecord
        },
        {
          path: 'importCus',
          name: 'importCus',
          meta: { text: '市场部导入客户' },
          component: ImportCus
        },
        // 客户审核
        {
          path: 'dealCheck',
          name: 'dealCheck',
          meta: { text: '审核处理' },
          component: DealCheck,
          children: [
            {
              path: ':id',
              meta: { text: '审核详情' },
              component: CheckDetail
            }
          ]
        },
        {
          path: 'checkRecord',
          name: 'checkRecord',
          meta: { text: '审核记录' },
          component: CheckRecord
        },
        {
          path: 'cusInfo',
          name: 'cusInfo',
          meta: { text: '客户信息修改' },
          component: CusInfo,
          children: [
            {
              path: ':id',
              meta: { text: '修改详情' },
              component: viewCusInfo
            }
          ]
        },
        {
          path: 'cusPoolManage',
          name: 'cusPoolManage',
          meta: { text: '客户库管理' },
          component: CusPoolManage,
          children : [{
            path: ':id',
            meta: { text: '审核详情' },
            component: ViewCusInfo
          }]
        },
        // 客户搜索
        {
          path: 'cusSearch',
          name: 'cusSearch',
          meta: { text: '搜索客户' },
          component: CusSearch
        },
        {
          path: 'cusOut',
          name: 'cusOut',
          meta: { text: '客户转出' },
          component: CusOut
        },
        // 合同管理
        {
          path: 'allotContract',
          name: 'allotContract',
          meta: { text: '分配合同' },
          component: AllotContract
        },
        {
          path: 'contractList',
          name: 'contractList',
          meta: { text: '合同列表' },
          component: ContractList
        },
        {
          path: 'applyContract',
          name: 'applyContract',
          meta: { text: '合同申请' },
          component: ApplyContract
        },
        // 到款管理
        {
          path: 'moneyRecord',
          name: 'moneyRecord',
          meta: { text: '到款记录' },
          component: MoneyRecord,
          children: [
            {
              path: 'add/:id',
              meta: { text: '到款记录/添加到款' },
              component: AddMoney
            },
            {
              path: 'view/:id',
              meta: { text: '到款记录/到款详情' },
              component: ViewMoney
            },
            {
              path: 'edit/:id',
              meta: { text: '到款记录/编辑到款' },
              component: EditMoney
            }
          ]
        },
        {
          path: 'bankflowList',
          name: 'bankflowList',
          meta: { text: '银行流水列表' },
          component: BankflowList
        },
        {
          path: 'myFlow',
          name: 'myFlow',
          meta: { text: '我的银行流水' },
          component: MyFlow
        },
        {
          path: 'moneyCount',
          name: 'moneyCount',
          meta: { text: '到款统计' },
          component: MoneyCount
        },
        // 订单管理
        {
          path: 'orderPending',
          name: 'orderPending',
          meta: { text: '待处理订单' },
          component: OrderPending,
          children: [
            {
              path: 'view/:id',
              meta: { text: '待处理订单/订单详情' },
              component: PendingDetail
            },
            {
              path: 'edit/:id',
              meta: { text: '待处理订单/编辑订单' },
              component: EditOrder
            }
          ]
        },
        {
          path: 'orderList',
          name: 'orderList',
          meta: { text: '订单列表' },
          component: OrderList,
          children: [
            {
              path: 'print/:id',
              meta: { text: '打印' },
              component: Print
            },
          ]
        },
        {
          path: 'addBaiduOrder',
          name: 'addBaiduOrder',
          meta: { text: '新增百度订单' },
          component: AddBaiduOrder
        },
        {
          path: 'addWjOrder',
          name: 'addWjOrder',
          meta: { text: '新增网建订单' },
          component: AddWjOrder
        },
        {
          path: 'addZtcOrder',
          name: 'addZtcOrder',
          meta: { text: '新增直通车订单' },
          component: AddZtcOrder
        },
        {
          path: 'addKaOrder',
          name: 'addKaOrder',
          meta: { text: '新增大客订单' },
          component: AddKaOrder
        },
        // 续费管理
        {
          path: 'renewApply',
          name: 'renewApply',
          meta: { text: '续费申请' },
          component: RenewApply
        },
        {
          path: 'renewList',
          name: 'renewList',
          meta: { text: '续费列表' },
          component: RenewList
        },
        {
          path: 'renewCheck',
          name: 'renewCheck',
          meta: { text: '续费审核' },
          component: RenewCheck
        },
        {
          path: 'renewReceive',
          name: 'renewReceive',
          meta: { text: '续费收单' },
          component: RenewReceive
        },
        {
          path: 'renewDispatch',
          name: 'renewDispatch',
          meta: { text: '转户出纳' },
          component: RenewDispatch
        },
        {
          path: 'renewAdd',
          name: 'renewAdd',
          meta: { text: '续费加款' },
          component: RenewAdd
        },
        {
          path: 'accountOut',
          name: 'accountOut',
          meta: { text: '转出出纳' },
          component: AccountOut
        },
        // 发票管理
        {
          path: 'invoiceList',
          name: 'invoiceList',
          meta: { text: '发票列表' },
          component: InvoiceList
        },
        {
          path: 'invoicePending',
          name: 'invoicePending',
          meta: { text: '待开发票' },
          component: InvoicePending
        },
        {
          path: 'invoiceHandled',
          name: 'invoiceHandled',
          meta: { text: '已开发票' },
          component: InvoiceHandled
        },
        {
          path: 'invoiceSend',
          name: 'invoiceSend',
          meta: { text: '邮寄发票' },
          component: InvoiceSend
        },
        {
          path: 'invoiceCheck',
          name: 'invoiceCheck',
          meta: { text: '开票审核' },
          component: InvoiceCheck
        },
        {
          path: 'chargeOffCheck',
          name: 'chargeOffCheck',
          meta: { text: '销账审核' },
          component: ChargeOffCheck
        },
        // 工资管理
        {
          path: 'salaryList',
          name: 'salaryList',
          meta: { text: '工资列表' },
          component: SalaryList,
          children: [
            {
              path: ':id',
              meta: { text: '工资列表/工资详情' },
              component: SalaryDetail
            }
          ]
        },
        {
          path: 'salaryError',
          name: 'salaryError',
          meta: { text: '工资异常' },
          component: SalaryError
        },
        // 报表统计
        {
          path: 'REP_BACUS',
          name: 'REP_BACUS',
          meta: { text: '保A客户统计' },
          component: ReportData
        },
        // {
        //   path: 'REP_RECEIVE',
        //   name: 'REP_RECEIVE',
        //   meta: { text: '到款统计' },
        //   component: ReportData
        // },
        {
          path: 'REP_ORDER',
          name: 'REP_ORDER',
          meta: { text: '订单统计' },
          component: ReportData
        },
        {
          path: 'REP_ZTC_ORDER',
          name: 'REP_ZTC_ORDER',
          meta: { text: '直通车订单统计' },
          component: ReportData
        },
        {
          path: 'REP_KHXQ',
          name: 'REP_KHXQ',
          meta: { text: '薪资计算业绩' },
          component: ReportData
        },
        {
          path: 'REP_JYJ',
          name: 'REP_JYJ',
          meta: { text: '外审业绩时间' },
          component: ReportData
        },
        {
          path: 'moneyChart',
          name: 'moneyChart',
          meta: { text: '资金明细' },
          component: MoneyChart
        },
        {
          path: 'aheadInvoice',
          name: 'aheadInvoice',
          meta: { text: '提前开票/加款汇总' },
          component: AheadInvoice
        },
        {
          path: 'REP_MONEY_ORDER',
          name: 'REP_MONEY_ORDER',
          meta: { text: '新开活动明细' },
          component: ReportData
        },
        {
          path: 'orderReport',
          name: 'orderReport',
          meta: { text: '岗位效能数据' },
          component: OrderReport
        },
        {
          path: 'REP_ZJJLDC',
          name: 'REP_ZJJLDC',
          meta: { text: '质检经理导出表' },
          component: ReportData
        },
        {
          path: 'REP_PERCENTAGE',
          name: 'REP_PERCENTAGE',
          meta: { text: '提成统计' },
          component: ReportData
        },
        {
          path: 'REP_BUSINESS_RENEW',
          name: 'REP_BUSINESS_RENEW',
          meta: { text: '续费统计' },
          component: ReportData
        },
        {
          path: 'REP_ORDER_RENEW',
          name: 'REP_ORDER_RENEW',
          meta: { text: '开户统计' },
          component: ReportData
        },
        {
          path: 'REP_BUSINESS_ACHIEVEMENT',
          name: 'REP_BUSINESS_ACHIEVEMENT',
          meta: { text: '商务业绩查看' },
          component: ReportData
        },
        {
          path: 'branchAdd',
          name: 'branchAdd',
          meta: { text: '分公司加款' },
          component: BranchAdd
        },
        // 呼叫中心
        {
          path: 'phoneChange',
          name: 'phoneChange',
          meta: { text: '坐席分机修改' },
          component: PhoneChange
        },
        {
          path: 'history',
          name: 'history',
          meta: { text: '联系历史记录' },
          component: _History
        },
        {
          path: 'missedCall',
          name: 'missedCall',
          meta: { text: '未接来电' },
          component: MissedCall
        },
        {
          path: 'callReport',
          name: 'callReport',
          meta: { text: '呼叫中心报表' },
          component: CallReport
        },
        {
          path: 'phoneWatch',
          name: 'phoneWatch',
          meta: { text: '综合话务监控' },
          component: PhoneWatch
        },
        {
          path: 'acdWatch',
          name: 'acdWatch',
          meta: { text: 'ACD监控' },
          component: AcdWatch
        },
        {
          path: 'workerWatch',
          name: 'workerWatch',
          meta: { text: '员工工作情况' },
          component: WorkerWatch
        },
        {
          path: 'blackList',
          name: 'blackList',
          meta: { text: '黑名单管理' },
          component: BlackList
        },
        {
          path: 'callCenter',
          name: 'callCenter',
          meta: { text: '拨号中心' },
          component: CallCenter
        },
        // 产品列表
        {
          path: 'productManage',
          name: 'productManage',
          meta: { text: '产品管理' },
          component: ProductManage,
          children: [
            {
              path: 'add',
              meta: { text: '产品管理/新增' },
              component: TextEditor
            },
            {
              path: 'edit',
              meta: { text: '产品管理/编辑' },
              component: TextEditor
            },
            {
              path: 'view',
              meta: { text: '产品管理/详情' },
              component: ViewProduct
            }
          ]
        },
        {
          path: 'productManage?menu=no',
          name: 'productManage1',
          meta: { text: '产品管理' },
          component: ProductManage,
          children: [
            {
              path: 'add',
              meta: { text: '产品管理/新增' },
              component: TextEditor
            },
            {
              path: 'edit',
              meta: { text: '产品管理/编辑' },
              component: TextEditor
            },
            {
              path: 'view',
              meta: { text: '产品管理/详情' },
              component: ViewProduct
            }
          ]
        },
        {
          path: 'productShow',
          name: 'productShow',
          meta: { text: '产品分类' },
          component: ProductShow
        },
        {
          path: 'productShow?menu=no',
          name: 'productShow1',
          meta: { text: '产品分类' },
          component: ProductShow
        },
        {
          path: 'addClassify',
          name: 'addClassify',
          meta: { text: '产品查询' },
          component: AddClassify,
          children: [
            {
              path: 'add',
              meta: { text: '产品查询/新增' },
              component: TextEditor
            },
            {
              path: 'edit',
              meta: { text: '产品查询/编辑' },
              component: TextEditor
            },
            {
              path: 'view/:id',
              meta: { text: '产品查询/详情' },
              component: ViewProduct
            }
          ]
        },
        {
          path: 'addClassify?menu=no',
          name: 'addClassify1',
          meta: { text: '产品查询' },
          component: AddClassify,
          children: [
            {
              path: 'add',
              meta: { text: '产品查询/新增' },
              component: TextEditor
            },
            {
              path: 'edit',
              meta: { text: '产品查询/编辑' },
              component: TextEditor
            },
            {
              path: 'view/:id',
              meta: { text: '产品查询/详情' },
              component: ViewProduct
            }
          ]
        },
        // 反馈流程
        {
          path: 'processManage',
          name: 'processManage',
          meta: { text: '流程管理' },
          component: ProcessManage,
          children: [
            {
              path: 'add',
              meta: { text: '流程管理/新增' },
              component: TextEditor
            },
            {
              path: 'edit',
              meta: { text: '流程管理/编辑' },
              component: TextEditor
            },
            {
              path: 'view',
              meta: { text: '流程管理/详情' },
              component: ViewProduct
            }
          ]
        },
        {
          path: 'processManage?menu=no',
          name: 'processManage1',
          meta: { text: '流程管理' },
          component: ProcessManage,
          children: [
            {
              path: 'add',
              meta: { text: '流程管理/新增' },
              component: TextEditor
            },
            {
              path: 'edit',
              meta: { text: '流程管理/编辑' },
              component: TextEditor
            },
            {
              path: 'view',
              meta: { text: '流程管理/详情' },
              component: ViewProduct
            }
          ]
        },
        {
          path: 'processShow',
          name: 'processShow',
          meta: { text: '流程分类' },
          component: ProcessShow
        },
        {
          path: 'processShow?menu=no',
          name: 'processShow1',
          meta: { text: '流程分类' },
          component: ProcessShow
        },
        {
          path: 'processClassify',
          name: 'processClassify',
          meta: { text: '流程归类' },
          component: ProcessClassify,
          children: [
            {
              path: 'add',
              meta: { text: '流程归类/新增' },
              component: TextEditor
            },
            {
              path: 'edit',
              meta: { text: '流程归类/编辑' },
              component: TextEditor
            },
            {
              path: 'view/:id',
              meta: { text: '流程归类/详情' },
              component: ViewProduct
            }
          ]
        },
        {
          path: 'processClassify?menu=no',
          name: 'processClassify1',
          meta: { text: '流程归类' },
          component: ProcessClassify,
          children: [
            {
              path: 'add',
              meta: { text: '流程归类/新增' },
              component: TextEditor
            },
            {
              path: 'edit',
              meta: { text: '流程归类/编辑' },
              component: TextEditor
            },
            {
              path: 'view/:id',
              meta: { text: '流程归类/详情' },
              component: ViewProduct
            }
          ]
        },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if(to.name === 'login'){
      return
    }
    if (savedPosition) {
      return savedPosition
    } else {
      let main = document.getElementById('main') //定位滚动条
      main.scrollLeft = 0
      main.scrollTop = 0
    }
  }
})

import Progress from 'nprogress' //进度条
Progress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  // const isLogin = cookie.get('token', { domain: 'bg.baijiegroup.com', path: '/BaiJieOA' })
  const isLogin = cookie.get('token')
  if (to.name !== 'login') {
    if (!isLogin) {
      next({
        path: '/login'
      })
      Progress.done()
    } else {
      if (to.name === from.name) {
        // 防止刷新的时候加载两次组件
        next(false)
      } else {
        Progress.start()
        next()
      }
    }
  } else {
    next()
    Progress.done()
  }
})
router.afterEach((to, from) => {
  Progress.done()
})

export default router
