import cookie from 'js-cookie'
// import { addClass } from 'common/js/dom'
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

// 转化树结构
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

export function groupBy (array, f) {
  let groups = {}
  array.forEach(function (o) {
    let group = JSON.stringify(f(o))
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return Object.keys(groups).map(function (group) {
    return groups[group]
  })
}

export function rowSpan (id, row, cols, standardCol) {
  var tb = document.getElementById(id)
  var lastValue = ''
  var value = ''
  var pos = 1
  for (var i = row; i < tb.rows.length; i++) {
    console.log(i)
    value = tb.rows[i].cells[standardCol].innerHTML
    if (value !== '' && value !== '\t' && value !== '\n' && value !== '\r') {
      if (lastValue == value) { // eslint-disable-line
        var colsbak = cols.slice(0)
        colsbak.sort(function (a, b) {
          return a - b
        })
        for (var c = colsbak.length - 1; c >= 0; c--) {
          tb.rows[i].deleteCell(colsbak[c])
          tb.rows[i - pos].cells[colsbak[c]].rowSpan = tb.rows[i - pos].cells[colsbak[c]].rowSpan + 1
        }
        pos++
      } else {
        lastValue = value
        pos = 1
      }
    }
  }
}

export function appMark () {
  let viewWidth = document.documentElement.clientWidth
  if (viewWidth && viewWidth < 768) {
    return true
  } else {
    return false
  }
}

export function autoHeight () { // 没有电话条的账户设置最小高度铺满
  const bool = cookie.get('allowBar') === '9999'
  if (bool) {
    let container = document.getElementsByClassName('component-container')[0]
    // addClass(container, 'component-bar-container')
    container.style.minHeight = 'calc(100% - 130px)'
  }
}
