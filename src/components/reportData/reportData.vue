<template>
  <div class="report-data component-container media-padding">
    <div class="search">
      <div v-for="(item,index) in cols" :key="index">
        <template v-if="item.where">
          <el-input v-if="item.where.type==='text'" v-model="item.where.val[0]" :placeholder="item.as" class="item item-width">
            <template slot="prepend">{{item.as}}:</template>
          </el-input>
          <el-date-picker v-if="item.where.type==='datetime'" v-model="item.where.val" value-format="yyyy/MM/dd HH:mm" format="yyyy/MM/dd HH:mm" type="datetimerange" range-separator="至" :start-placeholder="item.as" :end-placeholder="item.as" class="item" style="width:300px;"></el-date-picker>
          <select-trade v-if="item.where.type==='indu'" v-model="item.where.val" class="item item-width"></select-trade>
          <select-area v-if="item.where.type==='area'" v-model="item.where.val" class="item item-width"></select-area>
          <auto-select v-if="item.where.type==='dropdown'" v-model="item.where.val[0].type" :title="item.as" class="item item-width">
            <el-option v-for="(op,index) in item.where.options" :key="index" :label="op.text" :value="op.type"></el-option>
          </auto-select>
        </template>
      </div>
      <div class="item">
        <el-button @click.native="search" type="primary">查 询</el-button>
        <el-button @click.native="reset" type="warning">重 置</el-button>
      </div>
      <div class="item export">
        <span v-for="(act, index) in acts" :key="index" :class="index?'ml10px':''">
          <el-button @click.native="search(act.label.indexOf('导入')>-1?'import':'export')" :type="index%2===1?'primary':'warning'">{{act.label}}</el-button>
        </span>
      </div>
    </div>

    <!-- 列表 -->
    <el-table stripe border :data="list" max-height="550" class="table-width">
      <template v-for="(item, index) in myList">
        <el-table-column :key="index" prop="" :label="item.as" :width="(item.where && item.where.type==='datetime')?'90':''">
          <span slot-scope="scope">
            <span v-if="!item.where || item.where.type!=='datetime'">{{scope.row[item.as]}}</span>
            <span v-if="item.where && item.where.type==='datetime'">{{scope.row[item.as] | timeFormat}}</span>
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
export default {
  computed: {
    sendParams () {
      return {
        rpt_id: this.$route.name
      }
    }
  },
  data () {
    return {
      cols: [],
      acts: [],
      myList: [],
      list: [],
      url: '/rpt.do?get',

      otherParams: {
        rpt_data: {
          columns: []
        }
      }
    }
  },
  created () {
    // this._getInit(this.path)
  },
  mounted () {},
  methods: {
    search () {
      this.sendParams = {
        rpt_id: this.$route.name,
        rpt_data: {
          pageno: 1,
          pagenum: 10,
          columns: this.cols
        }
      }
      // this.$post('/rpt.do?get')
    },
    getList (res) {
      if (res.data.success) {
        this.cols = [] // 防止缓存
        this.acts = []
        this.myList = []
        this.list = []
        let exportBtns = {}
        this.cols = res.data.data.columns
        this.otherParams.rpt_data.columns = res.data.data.columns
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
        console.log(this.acts)
      }
    }
  },
  components: {
    Page,
    SelectArea,
    SelectTrade,
    AutoSelect
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
      width: 250px;
    }
  }
  .export{
     flex-grow: 1;
    text-align: right;
    padding-right: 30px;
  }
}
</style>
