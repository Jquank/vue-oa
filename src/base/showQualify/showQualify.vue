<template>
  <div class="show-qualify">
    <el-row class="qualify" id="images">
      <dl v-for="(s,index) in showQualify" :key="index">
        <template v-if="s.val">
          <dt>&nbsp;{{s.val.split('#')[1]}}</dt>
          <dd style="margin:0 auto">
            <img style="width:120px;height:auto" :src="s.val.split('#')[0]" :alt="s.val.split('#')[1]">
          </dd>
          <dd>
            <el-button type="danger" size="mini" @click="delImg(index)">删除</el-button>
          </dd>
        </template>
      </dl>
    </el-row>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
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
      deledQualify: []
    }
  },
  mounted () {
    const viewer = new Viewer(document.getElementById('images')) // eslint-disable-line
  },
  methods: {
    open (val) {
      if (val === 'rotate') {
        this.$refs.img.style.transform = `rotate(${this.deg}deg)`
        this.deg += 90
      }
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
