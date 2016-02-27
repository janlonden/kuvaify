'use strict'

let init = function () {
  let kuvaify = this
  let element = document.createElement('a')

  let append = () => {
    element.className = 'kuvaify-close-button',
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M10 40l30-30M40 40L10 10"/></g></svg>'

    kuvaify.overlay.element.appendChild(element)
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
    if (kuvaify.systemsReady) {
      kuvaify.closed = true

      kuvaify.overlay.visibility('hidden')
      kuvaify.closeDiv.visibility('hidden')
      kuvaify.img.hide(kuvaify.currentIndex)
      visibility('hidden')
      kuvaify.menu.visibility('hidden')
      kuvaify.navigation.visibility('hidden')
      kuvaify.spinner.visibility('hidden')

      kuvaify.overlay.removeEventListeners()
      kuvaify.closeDiv.removeEventListeners()
      kuvaify.img.removeEventListeners()
      removeEventListeners()
      kuvaify.menu.removeEventListeners()
      kuvaify.reset.removeEventListeners()
      kuvaify.zoom.removeEventListeners()
      kuvaify.rotate.removeEventListeners()
      kuvaify.navigation.removeEventListeners()

      kuvaify.systemsReady = false
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