/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

// 登录页
import Login from 'components/login/login'
// 首页
import IndexPage from 'components/indexPage/indexPage'
import IndexContent from 'components/indexContent/indexContent'
// 系统配置
const Rule = () => import('components/systemSetting/rule/rule')
const Auth = () => import('components/systemSetting/auth/auth')
const SystemCycle = () => import('components/systemSetting/systemCycle/systemCycle')
const DepartManage = () => import('components/systemSetting/departManage/departManage')
const DepartSetNum = () => import('components/systemSetting/departSetNum/departSetNum')
const AccountManage = () => import('components/systemSetting/accountManage/accountManage')
const News = () => import('components/systemSetting/news/news')
const Activity = () => import('components/systemSetting/activity/activity')
const Editor = () => import('components/systemSetting/news/editor')
const ViewNews = () => import('components/systemSetting/news/viewNews')
// 人员管理
const AddUser = () => import('components/userManage/addUser/addUser')
const UserList = () => import('components/userManage/userList/userList')
// 客户管理
import AddCus from 'components/cusManage/addCus/addCus'
import ApplyCus from 'components/cusManage/applyCus/applyCus'
import ApplyDetail from 'components/cusManage/applyCus/applyDetail'
import MyCus from 'components/cusManage/myCus/myCus'
import MyCusDetail from 'components/cusManage/myCus/myCusDetail'
const VisitRecord = () => import('components/cusManage/visitRecord/visitRecord')
const FollowRecord = () => import('components/cusManage/followRecord/followRecord')
const ImportCus = () => import('components/cusManage/importCus/importCus')
// 客户审核
const DealCheck = () => import('components/cusCheck/dealCheck/dealCheck')
const CheckDetail = () => import('components/cusCheck/dealCheck/checkDetail')
const CheckRecord = () => import('components/cusCheck/checkRecord/checkRecord')
const CusInfo = () => import('components/cusCheck/cusInfo/cusInfo')
const viewCusInfo = () => import('components/cusCheck/cusInfo/viewCusInfo')
const CusPoolManage = () => import('components/cusCheck/cusPoolManage/cusPoolManage')
const ViewCusInfo = () => import('components/cusCheck/cusPoolManage/viewCusInfo')
// 客户搜索
import CusSearch from 'components/cusSearch/cusSearch/cusSearch'
import CusOut from 'components/cusSearch/cusOut/cusOut'
// 合同管理
const AllotContract = () => import('components/contract/allotContract/allotContract')
const ContractList = () => import('components/contract/contractList/contractList')
const ApplyContract = () => import('components/contract/applyContract/applyContract')
// 续费管理
const RenewApply = () => import('components/renew/renewApply/renewApply')
const RenewList = () => import('components/renew/renewList/renewList')
const RenewCheck = () => import('components/renew/renewCheck/renewCheck')
const RenewReceive = () => import('components/renew/renewReceive/renewReceive')
const RenewDispatch = () => import('components/renew/renewDispatch/renewDispatch')
const RenewAdd = () => import('components/renew/renewAdd/renewAdd')
const AccountOut = () => import('components/renew/accountOut/accountOut')
// 工资管理
const SalaryList = () => import('components/salary/salaryList')
const SalaryDetail = () => import('components/salary/salaryDetail')
const SalaryError = () => import('components/salary/salaryError')
// 到款管理
const MoneyRecord = () => import('components/moneyManage/moneyRecord/moneyRecord')
const AddMoney = () => import('components/moneyManage/moneyRecord/addMoney')
const ViewMoney = () => import('components/moneyManage/moneyRecord/viewMoney')
const EditMoney = () => import('components/moneyManage/moneyRecord/editMoney')
const BankflowList = () => import('components/moneyManage/bankflowList/bankflowList')
const MyFlow = () => import('components/moneyManage/myFlow/myFlow')
const MoneyCount = () => import('components/moneyManage/moneyCount/moneyCount')
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
import InvoiceSend from'components/invoiceManage/invoiceSend/invoiceSend'
import InvoiceCheck from 'components/invoiceManage/invoiceCheck/invoiceCheck'
import ChargeOffCheck from 'components/invoiceManage/chargeOffCheck/chargeOffCheck'
// 报表统计
import ReportData from 'components/reportData/reportData'
const AheadInvoice = () => import('components/reportData/aheadInvoice')
const OrderReport = () => import('components/reportData/orderReport')
const BranchAdd = () => import('components/reportData/branchAdd')
const MoneyChart = () => import('components/reportData/moneyChart')
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
const TextEditor = () => import('components/textEditor/textEditor')
const ProductManage = () => import('components/productList/productManage')
const ViewProduct = () => import('components/productList/viewProduct')
const AddClassify = () => import('components/productList/addClassify')
const ProductShow = () => import('components/productList/productShow')
// 反馈流程
const ProcessManage = () => import('components/feedBack/processManage')
const ProcessShow = () => import('components/feedBack/processShow')
const ProcessClassify = () => import('components/feedBack/processClassify')
// import Test from 'components/login/test'

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
          component: DepartSetNum,
          // component: ()=> import(/* webpackChunkName: 'departSetNum' */'components/systemSetting/departSetNum/departSetNum')
          // component: ()=> import(/* webpackChunkName: 'ImportFuncDemo' */'components/systemSetting/departSetNum/departSetNum')
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
              path: 'view/:id',
              meta: { text: '订单列表/订单详情' },
              component: PendingDetail
            },
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
          path: 'productShow',
          name: 'productShow',
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
          path: 'processShow',
          name: 'processShow',
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
        }
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

function routerIntercept(to, from, next, isLogin, progress) {
  if (to.name !== 'login') {
    if (isLogin) {
      if (to.name === from.name) {
        // 防止刷新的时候加载两次组件
        next(false)
      } else {
        Progress.start()
        next()
      }
    } else {
      next({
        path: '/login'
      })
      Progress.done()
    }
  } else {
    next()
    Progress.done()
  }
}

import Progress from 'nprogress' //进度条
Progress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  let isLogin = cookie.get('token')
  routerIntercept(to, from, next, isLogin, Progress)
})
router.afterEach((to, from) => {
  Progress.done()
})

export default router
