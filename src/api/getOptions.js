import { $post } from './http'
import { serverUrl } from '@/api/config'
// const detailUrl = serverUrl + '/CustomerCheck.do?customlist'
const tradeUrl = serverUrl + '/CompanyCat.do?compcat'
const areaUrl = serverUrl + '/Area.do?comparea'
const sourceUrl = serverUrl + '/cd.do?get&code=27'
const codeUrl = serverUrl + '/cd.do?get&code='

// 获取地区
export function getArea (params = {}) {
  return $post(areaUrl, params).then(res => {
    return res
  })
}

// 获取行业
export function getTrade (params = {}) {
  return $post(tradeUrl, params).then(res => {
    return res
  })
}

// 获取客户来源
export function getSource (params = {}) {
  return $post(sourceUrl, params).then(res => {
    return res
  })
}

// 根据code获取各种类型
export function getCode (code, params = {}) {
  return $post(codeUrl + code, params).then(res => {
    return res.data.data
  })
}
