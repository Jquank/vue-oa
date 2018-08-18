// import Mock from 'mockjs'
// const Random = Mock.Random
// const editTableData = function () {
//   let Data = {
//     code: 0,
//     data: []
//   }
//   for (let i = 0; i < 8; i++) {
//     let data = {
//       date: Random.datetime('yyyy-MM-dd HH:mm:ss'),
//       name: Random.cname(),
//       address: '上海市普陀区金沙江路 1518 弄',
//       isEdit: true
//     }
//     Data.data.push(data)
//   }
//   return Data
// }
// Mock.mock('/editTable', 'post', editTableData)

// Mock.mock('/changeAddr', 'post', function (data) {
//   if (JSON.parse(data.body).addr) {
//     return {
//       code: 0,
//       data: []
//     }
//   }
// })
