<template>
  <div class="drag-table">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <div slot-scope="scope">
          <el-button type="success" size="mini" @click.native="handleClick(scope.$index,scope.row)">操作</el-button>
        </div>
      </el-table-column>
    </el-table>
    <div>{{oldList}}</div>
    <div>{{newList}}</div>
  </div>
</template>

<script>
import { $post } from 'api/http'
import Sortable from 'sortablejs'
export default {
  data () {
    return {
      tableData: [],
      sortable: null,
      oldList: [],
      newList: []
    }
  },
  created () {
    $post('/dragTable').then(res => {
      if (res.data.code === 0) {
        this.tableData = res.data.data
        this.oldList = this.tableData.map(v => v.id)
        this.newList = this.oldList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
      }
    })
  },
  methods: {
    setSort () {
      const el = document.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        onEnd: evt => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0]
          this.tableData.splice(evt.newIndex, 0, targetRow)
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    handleClick (index, row) {
      console.log(index)
      console.log(row.name)
    }
  },
  components: {}
}
</script>

<style lang="less">
.drag-table {
  background: #fff;
  padding: 15px 10px;
}
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>
