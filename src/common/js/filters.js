
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
    case 50:
      return '信息流'
  }
}
export function wjType (num) {
  let wjTypes = storage.get('wjType')
  let type = ''
  wjTypes.forEach(val => {
    if (num == val.code_val) { //eslint-disable-line
      type = val.code_desc
    }
  })
  return type
}

export function productType (num, str) {
  let productTypes = storage.get('productType38')
  let type = ''
  productTypes.forEach(val => {
    if (num == val.code_val) { //eslint-disable-line
      type = val.code_desc
    }
  })
  return type + '' + (str || '')
}

// 直通车产品
export function productType18 (num, str) {
  let productTypes = storage.get('productType18')
  let type = ''
  productTypes.forEach(val => {
    if (num == val.code_val) { //eslint-disable-line
      type = val.code_desc
    }
  })
  return type + '' + (str || '')
}

export function cusState (num, type) {
  if (type === 'cusStatus') {
    switch (num) {
      case -10:
        return '异常'
      case 0:
        return '待审中'
      case 10:
        return '正常'
    }
  }
  if (type === 'cusType') {
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
        return '(新)'
      case 50:
        return '信息流'
    }
  }
  if (type === 'checkType') {
    if (num >= 0 && num < 20) {
      return '公共库审核'
    } else if (num >= 20 && num <= 30) {
      return '保A审核'
    }
  }
  if (type === 'checkStatus') {
    switch (num) {
      case 0:
        return '撤消保A申请'
      case 10:
        return '审核不通过'
      case 20:
        return '待审核'
      case 30:
        return '审核通过'
    }
  }
  if (type === 'end_result') {
    switch (num) {
      case 100:
        return '收全款'
      case 200:
        return '收半款'
      case 300:
        return '只签合同'
      case 400:
        return '继续跟进'
    }
  }
  if (type === 'contractStatus') {
    switch (num) {
      case 10:
        return '未领用'
      case 20:
        return '已领用'
      case 25:
        return '已签约'
      case 30:
        return '已签约'
      case 40:
        return '作废'
    }
  }
  if (type === 'applyStatus') {
    switch (num) {
      case 10:
        return '被驳回'
      case 20:
        return '待分配'
      case 30:
        return '已领用'
    }
  }
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
  if (num === '.') { return '.' }
  if (!num) { return '' }
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
  if (num === '.') { return '.' }
  if (!num) { return '' }
  function add0 (m) { return m < 10 ? '0' + m : m }
  let time = new Date(num)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  return year + '-' + add0(month) + '-' + add0(date)
}
export function currency (num) {
  if (num === '.') { return '.' }
  num = +num
  if (num && !isNaN(num)) {
    return '¥ ' + parseFloat(num).toFixed(2)
  } else {
    return ''
  }
}
export function currency1 (num) {
  if (num === '.') { return '.' }
  num = +num
  if (!isNaN(num)) {
    return '¥ ' + parseFloat(num).toFixed(2)
  } else {
    return ''
  }
}
export function bankType (num) {
  switch (num) {
    case 0:
      return '阳光快付'
    case 1:
      return '现金'
    case 2:
      return '糯米现金'
    case 3:
      return '招行'
    case 4:
      return '糯米招行'
    case 5:
      return '银联'
    case 6:
      return '银联2'
    case 7:
      return '银联3'
    case 8:
      return '糯米银联'
    case 9:
      return '黄华中行'
    case 10:
      return '中行1'
    case 'c5b2159eb53c11e7a1f900e066be4002':
      return '阳光快付'
    case 'd05ac8afb53c11e7a1f900e066be4002':
      return '现金'
    case 'e7b2be2bb53c11e7a1f900e066be4002':
      return '糯米现金'
    case 'efa7f660b53c11e7a1f900e066be4002':
      return '招行'
    case 'f778a6ceb53c11e7a1f900e066be4002':
      return '糯米招行'
    case 'ff631b32b53c11e7a1f900e066be4002':
      return '银联'
    case '10db32e0b53d11e7a1f900e066be4002':
      return '糯米银联'
    case '1bbe9160b53d11e7a1f900e066be4002':
      return '黄华中行'
    case '22e098e7b53d11e7a1f900e066be4002':
      return '中行1'
  }
}
