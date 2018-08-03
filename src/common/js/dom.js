export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
export function removeClass (el, className) {
  if (!hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  let index = className.indexOf(newClass)
  newClass.splice(index, 1)
  el.className = newClass.join(' ')
}
function siblings (el) {
  let a = []
  let p = el.parentNode.children
  for (let i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== el) a.push(p[i])
  }
  return a
}

export function toggleClass (el, className) {
  addClass(el, className)
  let s = siblings(el)
  for (let i = 0, sl = s.length; i < sl; i++) {
    removeClass(s[i], className)
  }
}
