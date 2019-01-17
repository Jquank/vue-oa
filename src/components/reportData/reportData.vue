<template>
  <div class="report-data component-container media-padding">
    <div class="search">
      <div v-for="(item,index) in searchCols" :key="index">
        <template v-if="item.where">
          <el-input
            v-if="item.where.type==='text'"
            v-model="item.where.val[0]"
            :placeholder="item.as"
            class="item item-width"
          ><template slot="prepend">{{item.as}}:</template>
          </el-input>
          <el-date-picker
            :unlink-panels="true"
            :key="item.as"
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
          <select-trade :key="key_trade" v-if="item.where.type==='indu'" v-model="item.where.val" class="item item-width"></select-trade>
          <select-area :key="key_area" v-if="item.where.type==='area'" v-model="item.where.val" class="item item-width"></select-area>
          <auto-select
            :valueKey="'type'"
            :resetSelect="resetSelect"
            v-if="item.where.type==='dropdown'"
            v-model="item.where.val[0]"
            :title="item.as"
            :classMark="item.as"
            class="item item-width"
          >
            <el-option v-for="(op,index) in item.where.options" :key="index" :label="op.text" :value="op"></el-option>
          </auto-select>
          <select-department
            :resetDept="resetDept"
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
            :uploadUrl="'/'+act.url"
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
        <el-table-column :key="index" prop :label="item.as" :width="getWidth(item)">
          <span slot-scope="scope">
            <span v-if="item.where && item.where.type==='datetime'">{{scope.row[item.as] | timeFormat}}</span>
            <span v-else>{{scope.row[item.as]}}</span>
          </span>
        </el-table-column>
      </template>
    </el-table>
    <page class="page" :url="url" :sendParams="sendParams" :otherParams="otherParams" :cols="cols" @updateList="getList"></page>
    <form style="display: none" action="" id="exportExl" method="post" ref="subform">
      <input id="rpt_id" type="text" name="rpt_id" ref="formId">
      <input id="rpt_data" type="text" name="rpt_data" ref="formData">
    </form>
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
    $route(to, from) {
      if (to.name !== from.name) {
        this.otherParams = {}
        this.firstRequest = ''
      }
    }
  },
  data() {
    return {
      resetDept: false,
      resetSelect: false,
      serverUrl: serverUrl,
      tk: cookie.get('token'),
      cols: [],
      searchCols: [],
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
        datetime: '95',
        indu: '150',
        area: '150'
      },
      key_area: '',
      key_trade: ''
    }
  },
  methods: {
    getWidth(item) {
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
      let params = {
        rpt_id: this.$route.name,
        rpt_data: {
          pageno: 1,
          pagenum: 10,
          columns: this.searchCols
        }
      }
      let isQuestionMark = data.url.indexOf('?') > -1
      let mark = isQuestionMark ? '&' : '?'
      let url = this.serverUrl + '/' + data.url + mark + 'tk=' + this.tk
      this.$refs.formId.setAttribute('value', params.rpt_id)
      this.$refs.formData.setAttribute('value', JSON.stringify(params.rpt_data))
      this.$refs.subform.setAttribute('action', url)
      this.$refs.subform.submit()
    },
    search() {
      this.searchCols.forEach(item => {
        if (item.as === '客户区域' || item.as === '所属行业') {
          item.where.val = [{id: item.where.val[item.where.val.length - 1]}]
        }
      })
      this.otherParams = {
        rpt_data: {
          pageno: 1,
          pagenum: 10,
          columns: this.searchCols
        }
      }
    },
    reset() {
      this.key_area = new Date() + ''
      this.key_trade = new Date() + '1'
      this.resetDept = true
      this.resetSelect = true
      this.searchCols.forEach(item => {
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
        if (!this.firstRequest) { // 存一份搜索数据
          this.searchCols = JSON.parse(JSON.stringify(this.cols))
          this.searchCols.forEach(val => {
            if (val.where && val.where.type === 'datetime') {
              val.where.val = []
            }
          })
          this.firstRequest = true
        }
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
