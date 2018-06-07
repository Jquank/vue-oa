<template>
 <div class="m-header">
    <ul>
      <li>
        <a href="http://bg.baijiegroup.com/BaiJieOA/bj_crm_oa.zip">下载客户端</a>
      </li>
      <li>
        <a href="http://bg.baijiegroup.com/hlp/index.html" target="_blank">帮助文档</a>
      </li>
      <li>
        <a href="javascript:void (0)" title="刷新" @click="refresh">
          <span class="fa fa-refresh"></span>
        </a>
      </li>
      <li>
        <a href="javascript:void (0)">
          <span>{{uName}}</span>
        </a>
      </li>
      <li>
        <a href="javascript:void (0)" title="未读消息">
          <span class="fa fa-bell"></span>
        </a>
      </li>
      <li>
        <a href="javascript:void (0)">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img class="avater" src="../../common/img/avatar.jpg" alt="">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="dialogFormVisible = true">修改个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="exitLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>
      </li>
    </ul>
    <!-- 修改个人信息弹窗 start-->
    <el-dialog @open="open" title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input @keyup.enter.native="editPwd" type="password" v-model="form.mima" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPwd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改个人信息弹窗 end-->
 </div>
</template>

<script>
import { serverUrl } from '@/api/config'
import { $post } from '@/api/http'
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    uName () {
      return this.userName
    },
    ...mapGetters([
      'userName'
    ])
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        mima: ''
      },
      formLabelWidth: '60px'
    }
  },
  methods: {
    open () {
      this.form.name = this.uName
    },
    editPwd () {
      let userUrl = serverUrl + '/Oper.do?EditPwd'
      let userId = sessionStorage.getItem('userId')
      let reg = /^[0-9A-Za-z_]{4,10}$/
      let myPassword = '' + this.form.mima
      if (reg.test(myPassword)) {
        $post(userUrl, {'id': userId, 'pwd': myPassword}).then((res) => {
          if (res.data[0].success === true) {
            this.$message({
              message: '修改成功,请重新登录',
              type: 'success'
            })
            this.dialogFormVisible = false
            setTimeout(() => {
              sessionStorage.clear()
              this.getUserName()
              this.$router.push('/login')
            }, 800)
          }
        })
      } else {
        this.$message({
          message: '密码请填写4到8位的数字、字母、下划线组合',
          type: 'error'
        })
      }
    },
    exitLogin () {
      sessionStorage.clear()
      this.getUserName()
      this.$router.push('/login')
    },
    refresh () {
      this.$router.go(0)
    },
    ...mapMutations({
      getUserName: 'GET_USERNAME'
    })
  },
  components: {}
}
</script>

<style scoped lang="less">
.m-header {
  ul {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    // align-items: center;
    li {
      height: 100%;
      line-height: 50px;
      margin-right: 15px;
      > a {
        width: 100%;
        height: 100%;
        display: inline-block;
        padding: 0 5px;
      }
      & > a:hover {
        background: #eeeeee;
      }
      .avater {
        width: 30px;
        border-radius: 50%;
      }
      .el-dropdown-link {
        height: 50px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
