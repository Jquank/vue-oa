
import { serverUrl, $get } from 'api/http'
export function loadCallIframe (id) {
  let baseUrl = '/gaiaopt/rest/interface/agent/agentBarInit4H5'
  let callInitUrl = serverUrl + '/bdurl.do?init'
  let data
  window.agentbar.init(id)
  $get(callInitUrl, {url: baseUrl}).then(res => {
    data = res.data.data
    window.agentbar.initial(data)
  }).catch(err => {
    console.log(err)
  })
}

export function callPhone (phone) {
  window.agentbar.makecall('', '', phone, '', '', '', '', '', 1)
}
