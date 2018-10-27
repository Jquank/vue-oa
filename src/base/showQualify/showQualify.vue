<template>
  <div class="show-qualify">
    <el-row class="qualify">
      <dl v-for="(s,index) in showQualify" :key="index">
        <template v-if="s.val">
          <dt>&nbsp;{{s.val.split('#')[1]}}</dt>
          <dd style="margin:0 auto">
            <img style="width:180px;height:auto" @click="imgClick(s.val,index)" :src="s.val.split('#')[0]">
          </dd>
          <dd>
            <el-button type="danger" size="mini" @click="delImg(index)">删除</el-button>
          </dd>
        </template>
      </dl>
    </el-row>
    <!-- 点击图片查看大图 -->
    <el-dialog @open="open" :title="bigImgUrl.split('#')[1]" :visible.sync="isBigImg" :modal-append-to-body="false" ref="dialog" :fullscreen="true" :center="true" :append-to-body="true" custom-class="big-img-dialog">
      <div class="img-content">
        <img ref="img" :src="bigImgUrl.split('#')[0]" class="aa">
      </div>
      <div class="change-img" slot="footer">
        <!-- <div @click="open('minus')" class="click-font">
          <i class="fa fa-minus"></i>
        </div> -->
        <div @click="open('rotate')" class="click-font">
          <i class="fa fa-rotate-right"></i>
        </div>
        <!-- <div @click="open('plus')" class="click-font">
          <i class="fa fa-plus"></i>
        </div> -->
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
      imgDom: '',
      deledQualify: [],
      newQualifyList: []
    }
  },
  mounted () {
    console.log(this.showQualify)
  },
  methods: {
    open (val) {
      if (val === 'rotate') {
        this.$refs.img.style.transform = `rotate(${this.deg}deg)`
        this.deg += 90
      }
    },
    // 点击图片放大
    imgClick (url, index) {
      this.isBigImg = true
      this.bigImgUrl = url
      this.deg = 90
    },
    // 删除资质图片
    delImg (index) {
      this.deledQualify = this.showQualify.splice(index, 1)
      // this.showQualify.splice(index, 1)
      this._emitQualifyList()
    },
    _emitQualifyList () {
      this.$emit('getQualifyList', this.showQualify, this.deledQualify)
    }
  }
}
</script>

<style lang="less">
.big-img-dialog {
  .el-dialog__body {
    height: calc(~'(100% - 110px)');
    padding: 0;
  }
  .img-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img.aa {
    height: 700px;
    max-width: 700px;
    width: auto;
  }
  .change-img {
    display: flex;
    justify-content: space-around;
    color: red;
  }
}
</style>

<style lang="less" scoped>
.show-qualify {
  .qualify {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    dl {
      margin-right: 8px;
    }
  }
  .click-font {
    width: 40px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
  .aa {
    transition: all 1s;
  }
}
</style>
