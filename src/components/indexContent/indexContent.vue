<template>
  <div>
    <!-- <el-table border :span-method="arraySpanMethod" :data="tableData" style="width: 100%"> -->
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column type="selection" fixed width="50">
      </el-table-column>
      <el-table-column prop="name" fixed label="姓名" width="280">
      </el-table-column>
      <el-table-column prop="name" fixed label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="date" fixed label="日期" width="180">
      </el-table-column>
      <el-table-column type="selection" fixed width="50">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="啊" min-width="180">
      </el-table-column>
      <el-table-column prop="a" label="是" width="180">
      </el-table-column>
      <el-table-column prop="e" label="额" width="180">
      </el-table-column>

    </el-table>
    <el-dialog :key="key" :visible.sync="dialogVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="sads" prop="xxx">
          <el-select v-model="ruleForm.xxx" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="wwew" prop="yyy">
          <el-input v-model="ruleForm.yyy"></el-input>
        </el-form-item>
        <el-form-item label="ghfhg" prop="zzz">
          <el-input v-model="ruleForm.zzz"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-button type="text" @click="opp">点击打开 Dialog</el-button>
    <el-button type="text" @click="opp">点击 Dialog</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: '',
      dialogVisible: false,
      tableData: [{
        date: '2016-05-02',
        name: 'xxx',
        address: 'xxxx',
        a: '上海',
        e: '上海'
      }, {
        date: '2016-05-02',
        name: 'xxx',
        address: '上海丰东股份',
        a: '上海a',
        e: '上海e'
      }, {
        date: '2016-05-02',
        name: '',
        address: '上海得人',
        a: '上海',
        e: '上海'
      }, {
        date: '2016-05-03',
        name: 'sss',
        address: '上海恢复供货方',
        a: '上海',
        e: '上海'
      },
      {
        date: '2016-05-02',
        name: '王',
        address: '上海',
        a: '上海',
        e: '上海'
      }],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        djdh: '',
        xxx: '',
        yyy: '',
        zzz: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        xxx: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        yyy: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        zzz: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      let table = document.getElementsByClassName('el-table')[0]
      let table2 = table.querySelector('.el-table__body-wrapper .el-table__body')
      let table1 = table.querySelector('.el-table__fixed .el-table__fixed-body-wrapper .el-table__body')
      table1.setAttribute('id', 'tb1')
      table2.setAttribute('id', 'tb2')

      this.autoRowSpan('tb1', 0, [4], 5)
      this.autoRowSpan('tb1', 0, [0, 1, 2, 3], 3)
      this.autoRowSpan('tb2', 0, [5, 6, 7, 8], 5)
    })
  },
  methods: {
    opp () {
      setTimeout(() => {
        let ddd = {
          name: 'fhdj',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          djdh: 'jdhjf',
          xxx: 'undefined',
          yyy: 'null',
          zzz: ''
        }
        this.ruleForm = Object.assign({}, this.ruleForm, ddd)
      }, 1000)
      this.key = new Date() + ''
      setTimeout(() => {
        this.dialogVisible = true
      }, 200)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid, ooo) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    autoRowSpan (id, row, cols, standardCol) {
      var tb = document.getElementById(id)
      var lastValue = ''
      var value = ''
      var pos = 1
      for (var i = row; i < tb.rows.length; i++) {
        value = tb.rows[i].cells[standardCol].innerHTML
        console.dir(value)
        if (value !== '\t' && value !== '\n' && value !== '\r' && value !== '') {
        // if (true) { //eslint-disable-line
          if (lastValue === value) {
            var colsback = cols.slice(0)
            colsback.sort(function (a, b) {
              return a - b
            })
            for (var c = colsback.length - 1; c >= 0; c--) {
              tb.rows[i].deleteCell(colsback[c])
              tb.rows[i - pos].cells[colsback[c]].rowSpan = tb.rows[i - pos].cells[colsback[c]].rowSpan + 1
            }
            pos++
          } else {
            lastValue = value
            pos = 1
          }
        }
      }
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {

      // let arr = [1,1]
      // let count = 1
      //   if(columnIndex === 2){
      //     console.log(this.tableData[rowIndex].date === this.tableData[rowIndex+1].date)
      //       if(row.date === this.tableData[rowIndex+1].date){
      //         count ++
      //         arr = [count,1]
      //         console.log(arr)
      //         // return arr
      //       }
      //       // return arr
      //     return [2,1]
      //   }
    }
  },
  components: {

  }
}
</script>
<style>

</style>

<style>
.el-table td{
  /* border: none !important; */
  /* border-bottom: 1px solid red !important; */
}
.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid red;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid red;
}
</style>
