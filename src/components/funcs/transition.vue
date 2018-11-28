<template>
  <div>
    <div class="container">
      <transition name="fade">
        <div class="img">
          <!-- <img src="./aaa.jpg" alt="" style="width:200px;height:200px;"> -->
        </div>
      </transition>
      <div class="footer" @click="handleClick" v-show="!show">
        <transition name="jjj">
          <div ref="miniImg">
            <img @click.stop="aaa" ref='img' src="./aaa.jpg" alt="" style="width:50px;height:50px;">
          </div>
        </transition>
      </div>
    </div>

    <!-- <div>
      <img id="image" width="50px" src="./bbb.jpg" alt="Picture">
    </div> -->

    <div>
      <ul id="images">
        <li v-for="(item,index) in signImages" :key="index">
          <img :src="item" width="50px">
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'
export default {
  data () {
    return {
      signImages: [require('./aaa.jpg'), require('./bbb.jpg'), require('./ccc.jpg')],
      show: false
    }
  },
  mounted () {
    // const viewer = new Viewer(document.getElementById('image'), {
    //   inline: true,
    //   viewed () {
    //     viewer.zoomTo(1)
    //   }
    // })
    const gallery = new Viewer(document.getElementById('images')) // eslint-disable-line
  },
  methods: {
    aaa () {
      this.$refs.img.style.animation = 'mymove 10s linear infinite'
    },
    handleClick () {
      // this.show = !this.show
      this.$refs.miniImg.style.transform = 'translate3d(200px,-300px,0) scale(3)'
    }
  },
  components: {

  }
}
</script>

<style lang="less">
@keyframes mymove {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.jjj-enter-active,
.jjj-leave-active {
  transition: all 0.5s cubic-bezier(0.1, 0.55, 0.1, 1.25);
}
.jjj-enter {
  transform: translate3d(0px, 0px, 0) scale(1);
}
.jjj-leave-to {
  transform: translate3d(200px, -300px, 0) scale(1);
}
.ani {
  animation: mymove 500ms;
}
.container {
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  position: relative;
  .img {
    // opacity: 0;
    width: 200px;
    height: 200px;
    margin: 20px auto 0;
    img {
      border-radius: 50%;
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    border-top: 1px solid #000;
    background: gray;
    div {
      transition: all 0.5s cubic-bezier(0.6, 0.55, 0.9, 1.25);
      position: absolute;
      top: 0;
      left: 0;
    }
    img {
      border-radius: 50%;
    }
  }
}
</style>
