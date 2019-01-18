<template>
  <div class="invoice-setting component-container media-padding">
    <el-row>
      <el-table
        border
        stripe
        :data="authList"
        style="width: 100%">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="code_desc" label="发票类型" align="center">
        </el-table-column>
        <el-table-column prop="tb_field_name" label="发票编码起始值" align="center">
        </el-table-column>
        <el-table-column prop="" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" class="xsbtn"
              @click.native="editInvoiceName(scope.row.tb_field_name,scope.row.id)">修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import submitBox from 'base/submitBox/submitBox'
import storage from 'good-storage'
import { getByCode } from 'api/getOptions'
export default {
  data () {
    return {
      authList: []
    }
  },
  created () {
    this._getList()
  },
  methods: {
    _getList() {
      getByCode(48).then(res => {
        this.authList = res.data.data
      })
    },
    editInvoiceName (name, id) {
      let that = this
      submitBox(that, {
        url: '/cd.do?setRenewActivity',
        editParams: {
          name: '',
          id: id,
          code: '48'
        },
        title: '修改编码起始值',
        inputValue: name
      }).then(res => {
        if (res) {
          this.$post('/cd.do?get&code=48').then(res => {
            if (res.data.success) {
              this.authList = res.data.data
              storage.session.set('x48', res)
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
  }
}
</script>
