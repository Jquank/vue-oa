
import storage from 'good-storage'
export function comType (num) {
  switch (num) {
    case -10:
      return '异常'
    case 0:
      return '待审中'
    case 10:
      return '正常'
  }
}
export function cusStatus (num) {
  switch (num) {
    case 0:
      return '新开'
    case 10:
      return '一户多开'
    case 20:
      return '老户重开'
    case 30:
      return '多项目'
    case 40:
      return '新'
  }
}

export function productType (num) {
  let productTypes = storage.get('productType')
  productTypes.forEach((val, key) => {
    console.log(num == val.code_val)//eslint-disable-line
    if (num == val.code_val) { //eslint-disable-line
      // return '123'
      return val.code_desc
    }
  })
}

export function businessStatus (num) {
  switch (num) {
    case '010':
      return '公共库审核不通过'
    case '020':
      return '公共库待审核'
    case '030':
      return '公共库客户'
    case '1010':
      return '跟踪审核不通过'
    case '1020':
      return '跟踪待审核'
    case '1030':
      return '跟踪客户'
    case '2010':
      return '保A审核不通过'
    case '2020':
      return '保A待审核'
    case '2030':
      return '保A客户'
    case '2530':
      return '签约中'
    case '3030':
      return '已签约'
    case '200':
      return '公共库客户' // 放弃保A
    case '100':
      return '公共库客户' // 放弃跟踪
  }
}
export function timeFormat (num) {
  function add0 (m) { return m < 10 ? '0' + m : m }
  let time = new Date(num)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds)
}
export function timeFormat1 (num) {
  function add0 (m) { return m < 10 ? '0' + m : m }
  let time = new Date(num)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  return year + '-' + add0(month) + '-' + add0(date)
}
export function currency (num) {
  num = +num
  if (num && !isNaN(num)) {
    return '¥ ' + parseFloat(num).toFixed(2)
  } else {
    return ''
  }
}
