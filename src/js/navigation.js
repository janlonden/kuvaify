'use strict'

let init = function () {
  let parent = this
  let next = document.createElement('a')
  let prev = document.createElement('a')

  let append = () => {
    next.className = 'kuvaify-next-button'
    next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><path d="M14.467 10l20 15-20 15" fill="none" stroke="#fff" stroke-width="2"/></svg>'
    prev.className = 'kuvaify-prev-button'
    prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><path d="M35.533 10l-20 15 20 15" fill="none" stroke="#fff" stroke-width="2"/></svg>'

    parent.overlay.element.appendChild(next)
    parent.overlay.element.appendChild(prev)
  }

  let visibility = what => {
    if (what === 'depends') {
      if (parent.nextIndex === null) {
        next.classList.remove('visible')
      } else {
        next.classList.add('visible')
      }
      if (parent.prevIndex === null) {
        prev.classList.remove('visible')
      } else {
        prev.classList.add('visible')
      }
    }
    if (what === 'hidden') {
      next.classList.remove('visible')
      prev.classList.remove('visible')
    }
  }

  let getNext = () => {
    parent.oldIndex = parent.currentIndex

    if (parent.nextIndex !== null) {
      parent.img.prepare(parent.nextIndex, 'navigated')
    }
  }

  let getPrev = () => {
    parent.oldIndex = parent.currentIndex

    if (parent.prevIndex !== null) {
      parent.img.prepare(parent.prevIndex, 'navigated')
    }
  }

  let nextImg = event => {
    getNext()

    event.preventDefault()
  }

  let prevImg = event => {
    getPrev()

    event.preventDefault()
  }

  let keydown = event => {
    if (event.keyCode === 39) {
      getNext(event)
    }
    if (event.keyCode === 37) {
      getPrev(event)
    }
  }

  let addEventListeners = () => {
    next.addEventListener('click', nextImg)
    prev.addEventListener('click', prevImg)

    window.addEventListener('keydown', keydown)
  }

  let removeEventListeners = () => {
    next.removeEventListener('click', nextImg)
    prev.removeEventListener('click', prevImg)

    window.removeEventListener('keydown', keydown)
  }

  return {
    append,
    visibility,
    addEventListeners,
    removeEventListeners
  }
}

export default init