import axios from 'axios'
import router from '@/router'
import qs from 'querystring'

import { Loading, Message } from 'element-ui'

const instance = axios.create({
  baseURL: 'http://172.16.11.72:88',
  withCredentials: true, // 跨域凭证
  timeout: 1000
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
    if (response.data.status === -1) {
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
  return new Promise((resolve, reject) => {
    instance
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export function $get (url, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, { params: params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
