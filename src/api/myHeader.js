export function enterfullscreen () { // 进入全屏
  let docElm = document.documentElement
  if (docElm.requestFullscreen) { // W3C
    docElm.requestFullscreen()
  } else if (docElm.mozRequestFullScreen) { // FireFox
    docElm.mozRequestFullScreen()
  } else if (docElm.webkitRequestFullScreen) { // Chrome等
    docElm.webkitRequestFullScreen()
  } else if (docElm.msRequestFullscreen) { // IE11
    docElm.msRequestFullscreen()
  }
}
export function exitfullscreen () { // 退出全屏
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}
