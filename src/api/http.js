import axios from 'axios'

export function $post (url, params = {}) {
  const tk = sessionStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios.post(url + '&tk=' + tk, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export function $get (url, params = {}) {
  const tk = sessionStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios.get(url + '&tk=' + tk, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
