import { $post } from 'api/http'
import { serverUrl } from '@/api/config'
// const detailUrl = serverUrl + '/CustomerCheck.do?customlist'
const tradeUrl = '/CompanyCat/AllCompanyCatGet'
const areaUrl = '/Area/HomeAreaTreeGet'
const sourceUrl = serverUrl + '/cd.do?get&code=27'
const codeUrl = serverUrl + '/cd.do?get&code='
const contractUrl = serverUrl + '/Contract.do?SearchByCatId'
const departmentUrl = serverUrl + '/Search.do?DeptTree'

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

// 获取部门
export function getDepartment (params = {}) {
  return $post(departmentUrl, params).then(res => {
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
    return res
  })
}

// 获取对应类型的合同
export function getMyContract (type, uid, state = '20') {
  let params = {
    catid: type,
    state: state,
    uid: uid,
    paging: 1
  }
  return $post(contractUrl, params).then(res => {
    return res
  })
}
