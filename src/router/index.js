/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

import Login from 'components/login/login'
// 首页
import IndexPage from 'components/indexPage/indexPage'
import IndexContent from 'components/indexContent/indexContent'
// 系统配置
import Rule from 'components/systemSetting/rule/rule'
import Auth from 'components/systemSetting/auth/auth'
import SystemCycle from 'components/systemSetting/systemCycle/systemCycle'
import DepartSetNum from 'components/systemSetting/departSetNum/departSetNum'
import AccountManage from 'components/systemSetting/accountManage/accountManage'
import News from 'components/systemSetting/news/news'
import Activity from 'components/systemSetting/activity/activity'
import Editor from 'components/systemSetting/news/editor'
import ViewNews from 'components/systemSetting/news/viewNews'
// 人员管理
import AddUser from 'components/userManage/addUser/addUser'
import UserList from 'components/userManage/userList/userList'
// 客户管理
import AddCus from 'components/cusManage/addCus/addCus'
import ApplyCus from 'components/cusManage/applyCus/applyCus'
import ApplyDetail from 'components/cusManage/applyCus/applyDetail'
import MyCus from 'components/cusManage/myCus/myCus'
import MyCusDetail from 'components/cusManage/myCus/myCusDetail'
import VisitRecord from 'components/cusManage/visitRecord/visitRecord'
import FollowRecord from 'components/cusManage/followRecord/followRecord'
import ImportCus from 'components/cusManage/importCus/importCus'
// 客户审核
import DealCheck from 'components/cusCheck/dealCheck/dealCheck'
import CheckDetail from 'components/cusCheck/dealCheck/checkDetail'
import CheckRecord from 'components/cusCheck/checkRecord/checkRecord'
import CusInfo from 'components/cusCheck/cusInfo/cusInfo'
import viewCusInfo from 'components/cusCheck/cusInfo/viewCusInfo'
import CusPoolManage from 'components/cusCheck/cusPoolManage/cusPoolManage'
import ViewCusInfo from 'components/cusCheck/cusPoolManage/viewCusInfo'

// 客户搜索
import CusSearch from 'components/cusSearch/cusSearch/cusSearch'
import CusOut from 'components/cusSearch/cusOut/cusOut'
// 合同管理
import AllotContract from 'components/contract/allotContract/allotContract'
import ContractList from 'components/contract/contractList/contractList'
import ApplyContract from 'components/contract/applyContract/applyContract'
// 续费管理
import RenewApply from 'components/renew/renewApply/renewApply'
import RenewList from 'components/renew/renewList/renewList'
import RenewCheck from 'components/renew/renewCheck/renewCheck'
import RenewReceive from 'components/renew/renewReceive/renewReceive'
import RenewDispatch from 'components/renew/renewDispatch/renewDispatch'
import RenewAdd from 'components/renew/renewAdd/renewAdd'
import AccountOut from 'components/renew/accountOut/accountOut'

// 工资管理
import SalaryList from 'components/salary/salaryList'
import SalaryDetail from 'components/salary/salaryDetail'
import SalaryError from 'components/salary/salaryError'
// 到款管理
import MoneyRecord from 'components/moneyManage/moneyRecord/moneyRecord'
import AddMoney from 'components/moneyManage/moneyRecord/addMoney'
import ViewMoney from 'components/moneyManage/moneyRecord/viewMoney'
import EditMoney from 'components/moneyManage/moneyRecord/editMoney'
import BankflowList from 'components/moneyManage/bankflowList/bankflowList'
import MyFlow from 'components/moneyManage/myFlow/myFlow'
import MoneyCount from 'components/moneyManage/moneyCount/moneyCount'
// 订单管理
import AddBaiduOrder from 'components/order/addBaiduOrder/addBaiduOrder'
import AddWjOrder from 'components/order/addWjOrder/addWjOrder'
import AddZtcOrder from 'components/order/addZtcOrder/addZtcOrder'
import AddKaOrder from 'components/order/addKaOrder/addKaOrder'
import OrderPending from 'components/order/orderPending/orderPending'
import PendingDetail from 'components/order/orderPending/pendingDetail'
import EditOrder from 'components/order/orderPending/editOrder'
import OrderList from 'components/order/orderList/orderList'
import Print from 'components/order/print/print'

// 发票管理
import InvoicePending from 'components/invoiceManage/invoicePending/invoicePending'
import InvoiceList from 'components/invoiceManage/invoiceList/invoiceList'
import InvoiceHandled from 'components/invoiceManage/invoiceHandled/invoiceHandled'
import InvoiceSend from 'components/invoiceManage/invoiceSend/invoiceSend'
import InvoiceCheck from 'components/invoiceManage/invoiceCheck/invoiceCheck'
import ChargeOffCheck from 'components/invoiceManage/chargeOffCheck/chargeOffCheck'

// 图表
import Charts from 'views/charts/charts'
import EditTable from 'views/editTable/editTable'

// 报表统计
import ReportData from 'components/reportData/reportData'
import AheadInvoice from 'components/reportData/aheadInvoice'
import BranchAdd from 'components/reportData/branchAdd'
import MoneyChart from 'components/reportData/moneyChart'

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

// import store from '../store'
import cookie from 'js-cookie'
Vue.use(Router)

const router = new Router({
  routes: [
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
          meta: { text: '续费申请' },
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
        // 图表
        {
          path: 'charts',
          name: 'charts',
          meta: { text: '图表' },
          component: Charts
        },
        {
          path: 'editTable',
          name: 'editTable',
          meta: { text: '可编辑的表格' },
          component: EditTable
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
          meta: { text: '商务续费统计' },
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
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
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
  const isLogin = cookie.get('token')
  // todo
  // const isLogin = true
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
