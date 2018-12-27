<template>
    <div class="download-enclosure">
      <a :href="data.img" download>{{title}}</a>
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    title: {
      type: String,
      default: '下载附件'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleClick(val) {
      let iframe = document.createElement('iframe')
      iframe.src = 'http://172.16.11.84:8080/upload/0a/9b/0a9b29f421a245e5b737f70561813376.jpg'
      iframe.display = 'none'
      document.body.appendChild(iframe)
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.download-enclosure{
  margin-top: 10px;
  text-align: right;
  padding-right: 30px;
  a{
    text-decoration: underline;
    color: #06c;
  }
}
</style>
