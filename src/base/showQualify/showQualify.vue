<template>
  <div class="show-qualify">
    <el-row class="qualify">
      <dl v-for="(s,index) in showQualify" :key="index">
        <dt>&nbsp;{{s.val.split('#')[1]}}</dt>
        <dd style="margin:0 auto">
          <img style="width:150px;height:auto" @click="imgClick(s.val,index)" :src="s.val.split('#')[0]">
        </dd>
        <dd>
          <el-button type="danger" size="mini" @click="delImg(index)">删除</el-button>
        </dd>
      </dl>
    </el-row>
    <!-- 点击图片查看大图 -->
    <el-dialog :title="bigImgUrl.split('#')[1]" :visible.sync="isBigImg" :modal-append-to-body="false" top="5px"
      ref="dialog" :fullscreen="true">
      <div style="text-align:center">
        <img ref="img" :src="bigImgUrl.split('#')[0]" style="width:50%;" class="aa">
      </div>
      <div class="changeImg">
        <div @click="minus" class="click-font">
          <i class="fa fa-minus"></i>
        </div>
        <div @click="rotateImg" class="click-font">
          <i class="fa fa-rotate-right"></i>
        </div>
        <div @click="plus" class="click-font">
          <i class="fa fa-plus"></i>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showQualify: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      bigImgUrl: '',
      isBigImg: false,
      rotate: false,
      deg: 90,
      rate: 1,
      dialogWidth: '50%',
      count1: 1,
      count2: 1
    }
  },
  methods: {
    // 点击图片放大
    imgClick (url, index) {
      this.isBigImg = true
      this.bigImgUrl = url
      this.deg = 90
      setTimeout(() => {
        this.rate = this.$refs.img.width / this.$refs.img.height
        console.log(this.rate)
        this.$refs.img.style.transform = 'rotate(0)'
      }, 10)
    },
    // 删除资质图片
    delImg (index) {
      this.showQualify.splice(index, 1)
    },
    rotateImg () {
      console.log(123)
      this.$refs.img.style.transform = `rotate(${this.deg}deg)`
      // this.newHeight = Math.max(this.$refs.img.height, this.$refs.img.width)
      // this.dialogWidth = this.newHeight + 'px'
      // this.$refs.img.height = this.newHeight
      // this.$refs.img.width = this.newHeight * this.rate
      this.deg += 90
    },
    minus () {
      this.count1 -= 0.2
      this.$refs.img.style.transform = `scale(${this.count1},${this.count1})`
    },
    plus () {
      this.count2 += 0.2
      this.$refs.img.style.transform = `scale(${this.count2},${this.count2})`
    }
  }
}
</script>

<style lang="less" scoped>
.show-qualify {
  .qualify{
    display: flex;
    justify-content: space-around;
    flex-wrap:wrap;
  }
  .changeImg {
    display: flex;
    justify-content: space-around;
    position: fixed;
    left:0;
    right:0;
    bottom:10px;
    color:red;
    .click-font {
      width: 40px;
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
  }
  .aa {
    transition: all 1s;
  }
}
</style>
