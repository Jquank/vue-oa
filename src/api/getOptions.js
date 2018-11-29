import { $post } from 'api/http'
import storage from 'good-storage'
const contractUrl = '/Contract.do?SearchByCatId'
const departmentUrl = '/Search.do?DeptTree'

const roleUrl = '/Oper.do?SearchRoles'
const codeUrl = '/cd.do?get&code='

// 获取角色
export function getRoles (params = {}) {
  return $post(roleUrl, params).then(res => {
    return res
  })
}
// 根据code获取各种类型（包括职位）
export function getByCode (code, params = {}) {
  return new Promise((resolve, reject) => {
    let data = storage.session.get('x' + code)
    if (data) {
      resolve(data)
    } else {
      $post(codeUrl + code, params).then(res => {
        if (res.data.success) {
          storage.session.set('x' + code, res)
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
}

// 获取部门
export function getDepartment (params = {}) {
  return $post(departmentUrl, params).then(res => {
    return res
  })
}

// 获取对应类型的合同
export function getMyContract (type, uid, state = '20') {
  let params = {
    catid: type,
    status: state,
    uid: uid,
    paging: 1
  }
  return $post(contractUrl, params).then(res => {
    return res
  })
}
