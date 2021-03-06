'use strict'

let init = function () {
  let kuvaify = this
  let element = document.createElement('div')
  let focusStarted = false

  let focus = event => {
    if (focusStarted === false) {
      visibility('focused')

      setTimeout(() => {
        visibility('unfocused')

        focusStarted = false
      }, 2000)
    }

    focusStarted = true
  }

  let append = () => {
    element.className = 'kuvaify'
    element.style.transition = `opacity ${this.options.transitionSpeed}ms ease, visibility ${this.options.transitionSpeed}ms ease`

    kuvaify.body.appendChild(element)
  }

  let visibility = what => {
    if (what === 'visible') {
      element.classList.add('visible')
    }
    if (what === 'hidden') {
      element.classList.remove('visible')
    }
    if (what === 'focused') {
      element.classList.add('focused')
    }
    if (what === 'unfocused') {
      element.classList.remove('focused')
    }
  }

  let addEventListeners = () => {
    window.addEventListener('mousemove', focus)
  }

  let removeEventListeners = () => {
    window.removeEventListener('mousemove', focus)
  }

  return {
    element,
    append,
    visibility,
    addEventListeners,
    removeEventListeners
  }
}

export default init