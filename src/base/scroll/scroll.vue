<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {appMark} from 'common/js/utils'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    initDelay: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {

    }
  },
  watch: {
    data() {
      if (!appMark()) {
        return
      }
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  mounted() {
    if (!appMark()) {
      this.$refs.wrapper.style.overflow = 'auto'
      return
    }
    this.$nextTick(() => {
      setTimeout(() => {
        this._initScroll()
      }, this.initDelay)
    })
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  components: {

  }
}
</script>

<style>

</style>
