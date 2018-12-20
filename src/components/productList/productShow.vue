<template>
  <div class="product-show component-container media-padding">
    <el-tabs v-model="activeName" type="card">
      <template v-for="(item,index) in newsList">
        <el-tab-pane :label="item.title" :name="index===0?'first':item.id" :key="item.id">
          <div class="text-center author">
            <h3 class="title">{{item.title}}</h3>
            <div class="back-btn">
              <el-button type="warning" @click.native="$router.go(-1)" class="xsbtn">返回</el-button>
            </div>
          </div>
          <div class="article">
            <div v-html="item.vtext"></div>
          </div>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      newsList: []
    }
  },
  created() {
    this._getList()
  },
  methods: {
    _getList() {
      this.$post('/res.do?get', { type: 10 }).then(res => {
        if (res.data.success) {
          this.newsList = res.data.data
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.product-show {
  .author {
    .title{
      display: inline-block;
      width: calc(~"(100% - 85px)");
      max-width: 750px;
    }
    .back-btn{
      display: inline-block;
    }
  }
  .article {
    padding: 0 20px;
    overflow: auto;
    max-height: 550px;
  }
}
</style>
