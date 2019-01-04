<template>
  <div class="product-show component-container media-padding">
    <el-tabs v-model="activeName" type="card">
      <template v-for="(item,index) in newsList">
        <el-tab-pane :label="item.title" :name="index===0?'first':item.id" :key="item.id">
          <div class="text-center author">
            <h3 class="title">{{item.title}}</h3>
            <!-- <div class="back-btn">
              <el-button type="warning" @click.native="$router.go(-1)" class="xsbtn">返回</el-button>
            </div> -->
          </div>
          <div class="article">
            <div v-html="item.vtext"></div>
          </div>
          <div v-show="item.img">
            <download-enclosure :data="item"></download-enclosure>
          </div>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import DownloadEnclosure from 'base/downloadEnclosure/downloadEnclosure'
const TYPE = 10
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
      this.$post('/res.do?get', { type: TYPE }).then(res => {
        if (res.data.success) {
          this.newsList = res.data.data
          console.log(this.newsList)
          this.newsList.sort((a, b) => {
            return a.insert_time - b.insert_time
          })
        }
      })
    }
  },
  components: {DownloadEnclosure}
}
</script>

<style lang="less" scoped>
.product-show {
  .author {
    .title {
      display: inline-block;
    }
    .back-btn {
      display: inline-block;
    }
  }
  .article {
    display: flex;
    justify-content: center;
    >div {
      max-width: 100%;
      overflow: auto;
    }
  }
}
</style>
