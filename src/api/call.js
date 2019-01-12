
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
function makeSelfRecord(phone, type, cpid, cat) {
  let params = {
    type: type,
    cpid: cpid,
    cat: cat,
    phone: phone
  }
  $get(serverUrl + '/wf.do?tellog', params).then(res => {})
}
export function callPhone (phone, type, cpid, cat = 10000) {
  if (!phone) {
    this.$message.error('无电话号码！')
    return
  }
  window.agentbar.makecall('', '', phone, '', '', '', '', '', 1)
  makeSelfRecord(phone, type, cpid, cat)
}
