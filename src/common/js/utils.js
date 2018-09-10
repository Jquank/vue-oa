export function transTree (arr) {
  let r = []
  let hash = {}
  arr.forEach((val, key) => {
    hash[val.code] = val
  })
  for (let i = 0; i < arr.length; i++) {
    let oneData = arr[i]
    let parentcode = oneData.parentcode
    let hashVP = hash[parentcode]
    if (hashVP) {
      !hashVP['children'] && (hashVP['children'] = [])
      hashVP['children'].push(oneData)
    } else {
      r.push(oneData)
    }
  }
  return r
}
