import axios from 'axios'
// import storage from 'good-storage'
import qs from 'querystring'
const instance = axios.create({
  baseURL: 'http://172.16.11.72:88',
  withCredentials: true // 跨域凭证
})
export function $post (url, params = {}) {
  // const tk = storage.session.get('token')
  return new Promise((resolve, reject) => {
    // axios.post(url + '&tk=' + tk, params)
    instance.post(url, qs.stringify(params))
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export function $get (url, params = {}) {
  // const tk = storage.session.get('token')
  return new Promise((resolve, reject) => {
    instance.get(url, {params: params})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
