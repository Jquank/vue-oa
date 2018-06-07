import { $post } from '@/api/http'
// 带提交的弹窗
export default function submitBox (that, obj = {}) {
  that.$prompt(obj.title || '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputType: 'text',
    inputValue: obj.inputValue || ''
    // inputPattern: /[]/,
    // inputErrorMessage: '邮箱格式不正确'
  })
    .then(({ value }) => {
      if (value && value !== obj.inputValue) {
        let params = {'name': value, 'id': obj.editParams.id}
        $post(obj.url, params).then((res) => {
          that.$message({
            type: 'success',
            message: '修改成功'
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        that.$message({
          type: 'warning',
          message: '请输入要更改的内容'
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
