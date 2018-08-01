import axios from 'axios'
import storage from 'good-storage'
export function $post (url, params = {}) {
  // const tk = storage.session.get('token')
  return new Promise((resolve, reject) => {
    // axios.post(url + '&tk=' + tk, params)
    axios.post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export function $get (url, params = {}) {
  const tk = storage.session.get('token')
  let _params = Object.assign({}, {tk: tk}, params)
  return new Promise((resolve, reject) => {
    axios.get(url, {params: _params})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
