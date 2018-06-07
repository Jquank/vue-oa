<template>
  <div class="mycus-detail">
    <p>
      <span>我的客户 / 客户详情</span>
    </p>
    <div class="detail-main">
      <div class="detail-title">
        <h4>客户详情</h4>
        <el-button size="small" type="warning" height="10px">返回</el-button>
      </div>
      <div class="detail-content">
        <el-table
          :data="cusDetailData" border style="width: 100%" :span-method="spanMethod">
          <el-table-column
            prop="title"
            label=""
            width="80">
          </el-table-column>
          <el-table-column
            prop=""
            label="">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.content" type="datetime" placeholder="选择日期时间"
                style="width:100%"
                v-if="scope.row.title==='成立日期'" size="small"></el-date-picker>
              <el-input type="textarea" :row="3" v-model="scope.row.content" size="medium"
                v-else-if="scope.row.title==='经营范围'"></el-input>
              <el-input size="small" v-model="scope.row.content" v-else></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="title1"
            label=""
            width="80">
          </el-table-column>
          <el-table-column
            prop=""
            label="">
            <template slot-scope="scope">
              <el-cascader v-if="scope.row.title1==='所属行业'" size="small" style="width:100%"
                :options="tradeOptions" :props="tradeProps" @active-item-change="handleTradeChange"
                v-model="selTradeOption">
              </el-cascader>
              <el-cascader v-else-if="scope.row.title1==='所属地区'" size="small" style="width:100%"
                :options="areaOptions"
                v-model="selAreaOption">
              </el-cascader>
              <el-select v-model="selSourceOption" placeholder="请选择" style="width:100%"
                v-else-if="scope.row.title1==='客户来源'" size="small">
                <el-option
                  v-for="item in cusSource"
                  :key="item.id"
                  :label="item.code_desc"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-input v-else size="small" v-model="scope.row.content1"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
import { serverUrl } from '@/api/config'
import { $post } from '@/api/http'
import { getArea, getSource, getTrade } from '@/api/getOptions'
const detailUrl = serverUrl + '/CustomerCheck.do?customlist'
// const tradeUrl = serverUrl + '/CompanyCat.do?compcat'
// const areaUrl = serverUrl + '/Area.do?comparea'
// const sourceUrl = serverUrl + '/cd.do?get&code=27'
export default {
  data () {
    return {
      cusSource: [],
      selSourceOption: '',
      tradeOptions: [],
      tradeProps: {
        value: 'label',
        children: 'secondTrade'
      },
      selTradeOption: [],
      cusDetailData: [],
      areaOptions: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则'
            },
            {
              value: 'daohang',
              label: '导航'
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic'
            },
            {
              value: 'form',
              label: 'Form'
            },
            {
              value: 'data',
              label: 'Data'
            },
            {
              value: 'notice',
              label: 'Notice'
            },
            {
              value: 'navigation',
              label: 'Navigation'
            },
            {
              value: 'others',
              label: 'Others'
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      selAreaOption: ['zujian', 'data']
    }
  },
  created () {
    this._getCusDetailData()

    getSource().then(res => {
      this.cusSource = res.data.data
    })
    getTrade().then(res => {
      console.log(res.data.data)
      let resArr = res.data.data
      resArr.forEach(val => {
        this.tradeOptions.push({
          id: val.id,
          value: val.name,
          label: val.name,
          secondTrade: [{
            id: '',
            value: '',
            label: ''
          }]
        })
      })
    })

    getArea({parentid: 1}).then(res => {
      console.log(res)
    })
  },
  methods: {
    // 合并行或列
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 5) {
        if (columnIndex === 1) {
          return [1, 3]
        }
      }
    },
    // 获取并处理详情页的数据
    _getCusDetailData () {
      let receiveData = this.$route.query.data
      if (!receiveData.id) {
        this.$router.push({
          path: '/indexPage/myCustomer'
        })
        return
      }
      let params = {
        id: receiveData.id,
        clstatus: receiveData.companylogstatus,
        cltype: receiveData.companylogtype,
        protectAuid: receiveData.userid
      }
      $post(detailUrl, params).then(res => {
        if (res.data[0].success === true) {
          let res0 = res.data[0].data[0]
          let res1 = res.data[1].data[0]
          // let res2 = res.data[2].data[0]
          console.log(res)
          this.selSourceOption = res0.fm
          this.selTradeOption = [res0.cname, res0.bname]
          let arr = [
            {
              content: res0.name,
              title: '客户名称',
              content1: '',
              title1: '所属行业'
            },
            {
              content: res0.legal_person,
              title: '客户法人',
              content1: res0.address,
              title1: '客户地址'
            },
            {
              content: res0.establishment_date,
              title: '成立日期',
              content1: '',
              title1: '所属地区'
            },
            {
              content: res0.website,
              title: '客户网址',
              content1: '',
              title1: '客户来源'
            },
            {
              content: res1.name,
              title: '联系人',
              content1: res1.contact,
              title1: '联系电话'
            },
            { content: res0.business_scope, title: '经营范围' }
          ]
          this.cusDetailData = [].concat(arr)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 动态加载二级行业
    handleTradeChange (val) {
      let handleId = ''
      let handleIndex = 0
      for (let i = 0; i < this.tradeOptions.length; i++) {
        if (val[0] === this.tradeOptions[i].label) {
          handleId = this.tradeOptions[i].id
          handleIndex = i
        }
      }
      getTrade({parentid: handleId}).then(res => {
        if (res.data.success === true) {
          let resArr = res.data.data
          resArr.forEach(v => {
            this.tradeOptions[handleIndex].secondTrade.push({
              id: v.id,
              value: v.name,
              label: v.name
            })
          })
        }
        console.log(this.tradeOptions)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.mycus-detail {
  width: 100%;
  height: 100%;
  background: #e2e5ec;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  .detail-main {
    background: #fff;
    padding: 20px;
    .detail-title {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
