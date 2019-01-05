<template>
  <div class="index-content component-container media-padding">
    <el-row
      :gutter="20"
      class="box-card mt-10px"
    >
      <el-col :sm="24/cardList.length" :xs="24" class="mt10px" v-for="(card,index) in cardList" :key="card.color">
        <el-card @mouseenter.native="mouseEnter(index)"  @mouseleave.native="mouseLeave(index)" shadow="always">
          <div class="box-card-item">
            <div class="left" :ref="'card'+index">
              <i :class="card.icon" :style="{'color':card.color}" :ref="'i'+index"></i>
            </div>
            <div class="right">
              <span>{{card.title}}</span>
              <div>{{card.number}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :md="8" :xs="24">
        <el-table :data="news" border class="table-width" :height="listHeight" max-height="600">
          <el-table-column prop="title" label="消息通知">
            <template slot-scope="scope">
              <span @click="jump(scope.row)" class="jump">{{scope.row.title}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :md="8" :xs="24">
        <el-table :data="importInfo" border class="table-width" :height="listHeight" max-height="600">
          <el-table-column prop="title" label="业务公告">
            <template slot-scope="scope">
              <span @click="jump(scope.row)" class="jump">{{scope.row.title}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :md="8" :xs="24">
        <el-table :data="bjFamily" border class="table-width" :height="listHeight" max-height="600">
          <el-table-column prop="title" label="百捷大家庭">
            <template slot-scope="scope">
              <span @click="jump(scope.row)" class="jump">{{scope.row.title}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { appMark } from 'common/js/utils'
export default {
  data () {
    return {
      listHeight: 500,
      cardList: [
        {
          icon: 'fa fa-file-text',
          title: '待处理订单',
          number: '0',
          color: '#40c9c6'
        },
        {
          icon: 'fa fa-file-text',
          title: '待处理续费',
          number: '0',
          color: '#36a3f7'
        },
        {
          icon: 'fa fa-file-text',
          title: '待处理保A',
          number: '0',
          color: '#f4516c'
        }
        // {
        //   icon: 'fa fa-file-text',
        //   title: '待处理发票',
        //   number: '0',
        //   color: '#34bfa3'
        // }
      ],
      news: [],
      importInfo: [],
      bjFamily: []
    }
  },
  created () {
    if (appMark()) {
      this.listHeight = 300
    }
  },
  mounted () {
    this._getMessage()
  },
  methods: {
    jump (data) {
      this.$router.push({
        path: 'news/view/555',
        query: {data: data}
      })
    },
    _getMessage () {
      this.$get('/User.do?DisAllInfo').then(res => {
        this.news = res.data[0].data
        this.importInfo = res.data[1].data
        this.bjFamily = res.data[2].data
      })
    },
    mouseEnter (index) {
      this.$refs['card' + index][0].style.backgroundColor = this.cardList[index].color
      this.$refs['i' + index][0].style.color = '#fff'
    },
    mouseLeave (index) {
      this.$refs['card' + index][0].style.backgroundColor = ''
      this.$refs['i' + index][0].style.color = this.cardList[index].color
    }
  }
}
</script>
<style lang="less">
  .index-content{
    .jump{
      cursor: pointer;
    }
  .el-card__body{
    padding: 10px 5px;
  }
  .box-card-item{
      display: flex;
      justify-content: space-around;
      align-items: center;
      .left{
        transition: all .5s;
        padding: 10px;
        font-size: 58px;
        color: #40c9c6;
      }
      .right{
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          font-size: 16px;
          color: rgba(0,0,0,.45);
          font-weight: 700;
        }
        div{
          font-weight: 700;
          font-size: 20px;
          margin-top: 8px;
          color: #666;
        }
      }
    }
  }
</style>
