import axios from 'axios'
import router from '@/router'
import qs from 'querystring'
console.log(router)
// 添加响应拦截器

const instance = axios.create({
  baseURL: 'http://172.16.11.72:88',
  withCredentials: true // 跨域凭证
})

instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  if (response.data.status === -1) {
    console.log(888)
    router.push('/login')
    return response
  } else {
    return response
  }
}, err => {
  console.log(err)
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
