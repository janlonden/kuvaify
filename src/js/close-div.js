'use strict'

let init = function () {
  let kuvaify = this
  let element = document.createElement('div')

  let append = () => {
    element.className = 'kuvaify-close-div'

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

  let click = event => {
    kuvaify.close.close()

    event.preventDefault()
  }

  let addEventListeners = () => {
    element.addEventListener('click', click)
  }

  let removeEventListeners = () => {
    element.removeEventListener('click', click)
  }

  return {
    append,
    visibility,
    addEventListeners,
    removeEventListeners
  }
}

export default init