<template>
  <div class="report-data component-container media-padding">
    <div class="search">
      <div v-for="(item,index) in cols" :key="index">
        <template v-if="item.where">
          <el-input
            v-if="item.where.type==='text'"
            v-model="item.where.val[0]"
            :placeholder="item.as"
            class="item item-width"
          >
            <template slot="prepend">{{item.as}}:</template>
          </el-input>
          <el-date-picker :key="item.as"
            v-if="item.where.type==='datetime'"
            v-model="item.where.val"
            value-format="yyyy/MM/dd HH:mm"
            format="yyyy/MM/dd"
            type="datetimerange"
            range-separator="至"
            :start-placeholder="item.as"
            :end-placeholder="item.as"
            class="item item-width"
          ></el-date-picker>
          <select-trade v-if="item.where.type==='indu'" v-model="item.where.val" class="item item-width"></select-trade>
          <select-area v-if="item.where.type==='area'" v-model="item.where.val" class="item item-width"></select-area>
          <auto-select
            v-if="item.where.type==='dropdown'"
            v-model="item.where.val[0]"
            :title="item.as"
            :classMark="item.as"
            class="item item-width"
          >
            <el-option v-for="(op,index) in item.where.options" :key="index" :label="op.text" :value="op.type"></el-option>
          </auto-select>
          <select-department
            @upDeptId="(id)=>{item.where.val[0]=id}"
            v-if="item.where.type==='depart'"
            :title="item.as"
            class="item item-width"
          ></select-department>
        </template>
      </div>
      <div class="item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
      <div class="item export">
        <span v-for="(act, index) in acts" :key="index" :class="index?'ml10px':''">
          <up-file
            v-if="act.label.indexOf('导入')>-1"
            :title="act.label"
            :uploadUrl="serverUrl+'/'+act.url+'&tk='+tk"
            :otherParams="upLoadOtherParams"
            :isHiddenFileList="true"
          ></up-file>
          <el-button v-else @click.native="exportExcell(act)" :type="index%2===1?'primary':'warning'">{{act.label}}</el-button>
        </span>
      </div>
    </div>

    <!-- 列表 -->
    <el-table stripe border :data="list" max-height="550" class="table-width">
      <template v-for="(item, index) in myList">
        <el-table-column
          :key="index"
          prop
          :label="item.as"
          :width="getWidth(item)"
        >
          <span slot-scope="scope">
            <span v-if="item.where && item.where.type==='datetime'">{{scope.row[item.as] | timeFormat}}</span>
            <span v-else>{{scope.row[item.as]}}</span>
          </span>
        </el-table-column>
      </template>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" :otherParams="otherParams" @updateList="getList"></page>
  </div>
</template>

<script>
import Page from '@/base/page/page'
import SelectArea from 'base/selectArea/selectArea'
import SelectTrade from 'base/selectTrade/selectTrade'
import AutoSelect from 'base/autoSelect/autoSelect'
import SelectDepartment from 'base/selectDepartment/selectDepartment'
import UpFile from 'base/upLoad/upFile'
import cookie from 'js-cookie'
import { serverUrl } from 'api/http'
export default {
  computed: {
    upLoadOtherParams() {
      return {
        rpt_id: this.$route.name
      }
    },
    sendParams() {
      return {
        rpt_id: this.$route.name
      }
    }
  },
  watch: {
    $route(to, from) { // 切换路由，带上rpt_data参数会报500错，但这样会导致查询两次
      if (to.name !== from.name) {
        this.otherParams = {}
      }
    }
  },
  data() {
    return {
      serverUrl: serverUrl,
      tk: cookie.get('token'),
      cols: [],
      acts: [],
      myList: [],
      list: [],
      url: '/rpt.do?get',
      otherParams: {
        // rpt_data: {
        //   columns: []
        // }
      },
      mapWidth: {
        'datetime': '100',
        'indu': '150',
        'area': '150'
      }
    }
  },
  methods: {
    getWidth (item) {
      if (!item.where) {
        return '100'
      }
      let width = this.mapWidth[item.where.type]
      if (width) {
        return width
      } else {
        if (item.where.type === 'text' && item.as === '公司名称') {
          return '180'
        }
        if (item.as === '订单ID') {
          return '120'
        }
      }
    },
    exportExcell(data) {
      this.$export('/' + data.url, this.sendParams)
    },
    search() {
      this.cols.forEach(item => {
        if (item.as === '客户区域' || item.as === '所属行业') {
          item.where.val = item.where.val.map(li => {
            return {
              id: li
            }
          })
          item.where.val = this.arrSort(item.where.val)
        }
      })
      this.otherParams = {
        rpt_data: {
          pageno: 1,
          pagenum: 10,
          columns: this.cols
        }
      }
    },
    reset() {
      this.cols.forEach(item => {
        if (item.where) {
          item.where.val = []
        }
      })
    },
    getList(res) {
      if (res.data.success) {
        this.cols = [] // 防止缓存
        this.acts = []
        this.myList = []
        this.list = []
        let exportBtns = {}
        this.cols = res.data.data.columns
        // this.otherParams.rpt_data.columns = res.data.data.columns
        this.list = res.data.data.records
        this.cols.forEach(val => {
          if (val.show === 1) {
            this.myList.push(val)
          }
        })
        exportBtns = res.data.data.act
        for (var key in exportBtns) {
          this.acts.push(exportBtns[key])
        }
      }
    },
    arrSort(arr) {
      let a = arr.sort(function(a, b) {
        let v1 = a.id.length
        let v2 = b.id.length
        if (v1 > v2) {
          return -1
        } else if (v1 < v2) {
          return 1
        } else {
          return 0
        }
      })
      return a
    }
  },
  components: {
    Page,
    SelectArea,
    SelectTrade,
    AutoSelect,
    SelectDepartment,
    UpFile
  }
}
</script>

<style lang="less" scoped>
.report-data {
  .search {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 280px;
    }
  }
  .export {
    flex-grow: 1;
    text-align: right;
    padding-right: 30px;
  }
}
</style>
