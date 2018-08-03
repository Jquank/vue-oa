import Mock from 'mockjs'
const Random = Mock.Random
const lineData = function () {
  let Data = {
    code: 0,
    expected: [],
    done: []
  }
  for (let i = 0; i < 8; i++) {
    let expected = Random.natural(50, 100)
    let done = Random.natural(50, 100)

    Data.expected.push(expected)
    Data.done.push(done)
  }
  return Data
}
Mock.mock('/lineChart', 'post', lineData)

const pieData = function () {
  let Data = {
    code: 0,
    data: []
  }
  for (let i = 0; i < 6; i++) {
    let data = {
      value: Random.natural(100, 450),
      name: Random.string(5)
    }
    Data.data.push(data)
  }
  return Data
}
Mock.mock('/pieChart', 'post', pieData)
