/*
带提交的弹窗，接受两个参数，1、vue实例（this），2、配置对象（{}）。回调用来刷新列表，修改成功res为true
ex：submitBox(that, {
        url: editUrl,
        editParams: {
          name: '',
          id: id
        },
        title: '编辑权限名称',
        inputValue: preName
      }).then(res=>{

      }).catch(err => {
        console.log(err)
      })
*/
export default function submitBox (that, obj = {}) {
  return new Promise((resolve, reject) => {
    that.$prompt(obj.title || '', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputType: obj.type ? obj.type : 'text',
      inputValue: obj.inputValue || ''
      // inputPattern: /[]/,
      // inputErrorMessage: '邮箱格式不正确'
    }).then(({ value }) => {
      if (value && value !== obj.inputValue) {
        let params = {}
        for (var key in obj.editParams) {
          params[key] = obj.editParams[key] || value
        }
        that.$post(obj.url, params).then((res) => {
          if (res.data.success) {
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        that.$message({
          type: 'warning',
          message: '请输入要更改的内容'
        })
        resolve(false)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}
