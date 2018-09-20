import axios from 'axios'
import router from '@/router'
// import qs from 'querystring'
import cookie from 'js-cookie'
import { Loading, Message } from 'element-ui'
// export const serverUrl = 'http://bg.baijiegroup.com/BaiJieOA'
export const serverUrl = 'http://172.16.11.78:8080/BaiJieOA'
const instance = axios.create({
  baseURL: serverUrl,
  // withCredentials: true, // 跨域凭证
  timeout: 10000
  // headers: {'token': tk}
})
let loadingInstance
instance.interceptors.request.use( // 请求拦截
  config => {
    // element ui Loading方法
    loadingInstance = Loading.service({
      fullscreen: true,
      background: 'rgba(0, 0, 0, 0.5)'
    })
    return config
  },
  err => {
    loadingInstance.close()
    Message.error({
      message: '加载超时'
    })
    console.log(err)
    return Promise.reject(err)
  }
)
instance.interceptors.response.use( // 响应拦截
  response => {
    loadingInstance.close()
    if (response.data === 'tosignin') {
      router.push('/login')
    }
    return response
  },
  err => {
    loadingInstance.close()
    Message.error({
      message: '网络错误'
    })
    console.log(err)
    return Promise.reject(err)
  }
)
export function $post (url, params = {}) {
  let tk = cookie.get('tk')
  let isQuestionMark = url.indexOf('?') > -1
  let mark = isQuestionMark ? '&' : '?'
  return new Promise((resolve, reject) => {
    instance
      // .post(url, qs.stringify(params))
      .post(url + mark + 'tk=' + tk, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export function $get (url, _params = {}) {
  let tk = cookie.get('tk')
  let isQuestionMark = url.indexOf('?') > -1
  let mark = isQuestionMark ? '&' : '?'
  return new Promise((resolve, reject) => {
    instance
      .get(url + mark + 'tk=' + tk, { params: _params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
