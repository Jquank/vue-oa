function clearLastChildren (arr) {
  arr.forEach(val => {
    if (val.children.length === 0) {
      delete val.children
    }
    if (val.children) {
      clearLastChildren(val.children)
    }
  })
}
export function transTree (arr) {
  let r = []
  let hash = {}
  arr.forEach((val, key) => {
    val.children = []
    hash[val.code] = val
  })
  for (let i = 0; i < arr.length; i++) {
    let oneData = arr[i]
    // let parentcode = oneData.code.substr(0, oneData.code.length - 5)
    let parentcode = oneData.parentcode
    let hashVP = hash[parentcode]
    if (hashVP) {
      hashVP.children.push(oneData)
    } else {
      r.push(oneData)
    }
  }
  clearLastChildren(r)
  return r
}
