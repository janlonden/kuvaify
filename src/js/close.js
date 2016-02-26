'use strict'

let init = function () {
  let parent = this
  let element = document.createElement('a')

  let append = () => {
    element.className = 'kuvaify-close-button',
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M10 40l30-30M40 40L10 10"/></g></svg>'

    parent.overlay.element.appendChild(element)
  }

  let visibility = what => {
    if (what === 'visible') {
      element.classList.add('visible')
    }
    if (what === 'hidden') {
      element.classList.remove('visible')
    }
  }

  let close = () => {
    if (parent.systemsReady) {
      parent.closed = true

      parent.overlay.visibility('hidden')
      parent.closeDiv.visibility('hidden')
      parent.img.hide(parent.currentIndex)
      visibility('hidden')
      parent.menu.visibility('hidden')
      parent.navigation.visibility('hidden')
      parent.spinner.visibility('hidden')

      parent.overlay.removeEventListeners()
      parent.closeDiv.removeEventListeners()
      parent.img.removeEventListeners()
      removeEventListeners()
      parent.menu.removeEventListeners()
      parent.reset.removeEventListeners()
      parent.zoom.removeEventListeners()
      parent.rotate.removeEventListeners()
      parent.navigation.removeEventListeners()

      parent.systemsReady = false
    }
  }

  let click = event => {
    close()

    event.preventDefault()
  }

  let keydown = event => {
    if (event.keyCode === 27) {
      click(event)
    }
  }

  let addEventListeners = () => {
    element.addEventListener('click', click)

    window.addEventListener('keydown', keydown)
  }

  let removeEventListeners = () => {
    element.removeEventListener('click', click)

    window.removeEventListener('keydown', keydown)
  }

  return {
    append,
    visibility,
    close,
    addEventListeners,
    removeEventListeners
  }
}

export default init