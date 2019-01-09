<template>
  <div class="follow-record component-container media-padding">
    <div class="follow-search">
      <el-input v-model="phone" class="follow-item item-width" placeholder="搜索客户名称">
        <template slot="prepend">电话号码:</template>
      </el-input>
      <div class="follow-item">
        <el-button type="primary" @click.native="search">查 询</el-button>
        <el-button type="warning" @click.native="reset">重 置</el-button>
      </div>
      <div class="follow-item add">
        <el-button type="primary" @click.native="addBlackList" icon="el-icon-plus">新增黑名单</el-button>
      </div>
    </div>
    <el-table stripe border :data="balckList" class="table-width">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="number" label="联系电话">
      </el-table-column>
      <el-table-column prop="pid" label="业务类型">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column prop="pid" label="状态">
        <template slot-scope="scope">
          <el-switch @change="change(scope.row)" v-model="scope.row.status" active-text="ON" inactive-text="OFF"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button @click.native="del(scope.row)" type="danger" class="xsbtn">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page class="page" :url="blackUrl" :sendParams="sendParams" @updateList="updateBackList"></page>

    <!-- 新增黑名单弹窗 -->
    <el-dialog :modal-append-to-body="false" title="新增黑名单" :visible.sync="addDialog" width="400px">
      <el-form label-width="80px">
        <el-form-item label="联系电话:">
          <el-input v-model="contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="产品类型:">
          <el-select v-model="productType" style="width: 100%;">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in products" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="remark" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;margin-top:10px;">
        <el-button @click.native="sub" type="primary">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Page from 'base/page/page'
export default {
  data () {
    return {
      phone: '',
      balckList: [],
      blackUrl: '/cc.do?getBlackList',
      sendParams: {
        phoneNum: this.phone
      },
      products: [],
      addDialog: false,
      contactPhone: '',
      productType: '',
      remark: ''
    }
  },
  methods: {
    search () {
      this.sendParams = {
        phoneNum: this.phone
      }
    },
    reset () {
      this.phone = ''
    },
    updateBackList (res) {
      this.balckList = res.data[0].data
      this.balckList.forEach(val => {
        if (val.status === 1) {
          val.status = true
        } else if (val.status === 0) {
          val.status = false
        }
      })
    },
    change (data) {
      console.log(data)
      this.$post('/cc.do?setBlackList', {id: data.id, status: data.status ? 1 : 0}).then(res => {
        if (res.data.success) {
          this.search()
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      })
    },
    del (data) {
      this.$confirm('确定删除吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$post('/cc.do?setBlackList', {
            'id': data.id,
            'opt': 'DELETE'
          }).then(res => {
            if (res.data.success) {
              this.search()
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message({
                type: 'danger',
                message: '删除失败'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    addBlackList () {
      this.addDialog = true
      this.$get('/Product.do?proget', {parentid: null}).then(res => {
        if (res.data.success) {
          this.products = res.data.data
        }
      })
    },
    sub () {
      let params = {
        'phoneNum': this.contactPhone,
        'pid': this.productType,
        'remark': this.remark
      }
      this.$get('/cc.do?setBlackList', params).then(res => {
        if (res.data.success) {
          this.search()
          this.addDialog = false
        }
      })
    }
  },
  components: {
    Page
  }
}
</script>

<style lang="less" scoped>
.follow-record {
  padding: 20px;
  .follow-search {
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    .follow-item {
      margin-left: 10px;
      margin-top: 10px;
    }
    .item-width {
      width: 250px;
    }
    .add{
      flex-grow: 1;
      text-align: right;
      padding-right: 30px;
    }
  }
}
</style>
