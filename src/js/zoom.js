'use strict'

let init = function () {
  let parent = this
  let _out = document.createElement('a')
  let _in = document.createElement('a')

  let append = () => {
    _out.className = 'kuvaify-zoom-out-button',
    _out.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><path d="M40 25H10" fill="none" stroke="#fff" stroke-width="2"/></svg>'
    _in.className = 'kuvaify-zoom-in-button',
    _in.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g fill="none" stroke="#fff" stroke-width="2"><path d="M25 40V10M40 25H10"/></g></svg>'

    parent.menu.div.appendChild(_out)
    parent.menu.div.appendChild(_in)
  }

  let zoomOut = event => {
    let img = parent.images[parent.currentIndex]

    if (img.scale >= 0.001) {
      img.scale -= img.scaleRatio
    }

    parent.img.transform(parent.currentIndex, {
      scaleValue: img.scale
    })

    event.preventDefault()
  }

  let zoomIn = event => {
    let img = parent.images[parent.currentIndex]

    img.scale += img.scaleRatio

    parent.img.transform(parent.currentIndex, {
      scaleValue: img.scale
    })

    event.preventDefault()
  }

  let keydown = event => {
    if (event.keyCode === 38) {
      zoomIn(event)
    }
    if (event.keyCode === 40) {
      zoomOut(event)
    }
  }

  let dblclick = event => {
    event.preventDefault()
  }

  let addEventListeners = () => {
    _out.addEventListener('click', zoomOut)
    _in.addEventListener('click', zoomIn)
    _out.addEventListener('dblclick', dblclick)
    _in.addEventListener('dblclick', dblclick)

    window.addEventListener('keydown', keydown)
  }

  let removeEventListeners = () => {
    _out.removeEventListener('click', zoomOut)
    _in.removeEventListener('click', zoomIn)
    _out.removeEventListener('dblclick', dblclick)
    _in.removeEventListener('dblclick', dblclick)

    window.removeEventListener('keydown', keydown)
  }

  return {
    append,
    addEventListeners,
    removeEventListeners
  }
}

export default init