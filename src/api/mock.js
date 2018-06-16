import { serverUrl } from '@/api/config'
import Mock from 'mockjs'
const Random = Mock.Random
const productData = function () {
  let Data = []
  for (let i = 0; i < 10; i++) {
    let data = {
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
    }
    Data.push(data)
  }
  return {
    data: Data
  }
}
// Mock.mock( url, post/get , 返回的数据)
Mock.mock(serverUrl + '/Permission.do?get', 'post', productData)
