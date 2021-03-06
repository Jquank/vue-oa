import storage from 'good-storage'
// import { getByCode } from 'api/getOptions'
// import { $post } from 'api/http'

function _getProductType(arr, num, str) {
  let type = ''
  arr.forEach(val => {
    if (!num) {
      type = ''
    } else if (num == val.code_val) { //eslint-disable-line
      type = val.code_desc
    } else if (num == '1000') { //eslint-disable-line
      type = '总计'
    }
  })
  return type + '' + (str || '')
}

// todo
export function productType(num, str) {
  let productTypes = []
  let res = storage.get('x52')
  if (res) {
    productTypes = res.data.data
  }
  return _getProductType(productTypes, num, str)
  // let b = await getByCode(52).then(res => {
  //   if (res.data.success) {
  //     productTypes = res.data.data
  //     return _getProductType(productTypes, num, str)
  //   }
  // })
  // return b
}

export function comType(num) {
  switch (num) {
    case -10:
      return '异常'
    case 0:
      return '待审中'
    case 10:
      return '正常'
  }
}

export function facilitatorType(num) {
  switch (num) {
    case 1:
      return '35'
    case 2:
      return '百度云'
    case 3:
      return '西部数码'
    case 0:
      return '自备'
  }
}
export function cusStatus(num) {
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

export function cusState(num, type) {
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

export function invoiceState(num, type) {
  if (type === 'invoiceKind') {
    switch (num) {
      case '11':
        return '电子普票'
      case '10':
        return '纸质普票'
      case '20':
        return '专票'
    }
  } else if (type === 'needInvoice') {
    switch (num) {
      case '-10':
        return '不需要'
      case '-1':
        return '暂不需要'
      case '0':
        return '需要'
      case '30':
        return '已开'
    }
  } else if (type === 'invoiceType') {
    switch (num) {
      case '0':
        return '无需发票'
      case '10':
        return '纸质普票'
      case '11':
        return '电子普票'
      case '20':
        return '专票'
      case '30':
        return '暂不开发票'
      case '40':
        return '已开发票'
    }
  } else if (type === 'invoiceMoneyType') {
    switch (num) {
      case '0':
        return '技术维护费'
      case '1':
        return '技术服务费'
      case '2':
        return '信息流服务费'
      case '3':
        return '品牌专区'
      case '4':
        return '网站建设'
    }
  }
}
export function renewState(num, type) {
  if (type === 'activity') {
    switch (num) {
      case '10':
        return '预芽活动'
      case '20':
        return '短框活动'
      case '30':
        return '年框活动'
      default:
        return '无'
    }
  } else if (type === 'addType') {
    switch (num) {
      case '10':
        return '正常加款'
      case '20':
        return '提前加款'
      case '30':
        return '返款加款'
    }
  }
}

export function businessStatus(num) {
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

export function wjStyle(num) {
  switch (num + '') {
    case '0':
      return '客建双站'
    case '1':
      return '自建双站'
    case '2':
      return '客建PC+自建WAP'
    case '3':
      return '客建双站+自建双站'
    case '4':
      return '营销页建站'
  }
}
const reg = /[\u4E00-\u9FA5]{1,}/
export function timeFormat(num, bool = true) {
  if (num === '.') {
    return '.'
  }
  if (!num) {
    return ''
  }
  if (reg.test(num)) {
    return num
  }

  function add0(m) {
    return m < 10 ? '0' + m : m
  }
  let time = new Date(num)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds)
}
export function timeFormat1(num, bool = true) {
  if (num === '.') {
    return '.'
  }
  if (!num) {
    return ''
  }
  if (reg.test(num)) {
    return num
  }

  function add0(m) {
    return m < 10 ? '0' + m : m
  }
  let time = new Date(num)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let date = time.getDate()
  return year + '-' + add0(month) + (bool ? ('-' + add0(date)) : '')
}
export function currency(num) {
  if (num === '.') {
    return '.'
  }
  if (num === 0) {
    return '¥ 0.00'
  }
  num = +num
  if (num && !isNaN(num)) {
    return '¥ ' + parseFloat(num).toFixed(2)
  } else {
    return ''
  }
}
export function currency1(num) {
  if (num === '.') {
    return '.'
  }
  num = +num
  if (!isNaN(num)) {
    return '¥ ' + parseFloat(num).toFixed(2)
  } else {
    return ''
  }
}
export function bankType(num) {
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
