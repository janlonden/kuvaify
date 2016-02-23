'use strict'

let init = function () {
  let parent = this

  let overlay = {
    element: document.createElement('div'),
    focusStarted: false,

    focus (event) {
      if (parent.overlay.focusStarted === false) {
        parent.overlay.visibility('focus')

        setTimeout(() => {
          parent.overlay.visibility('unfocus')

          parent.overlay.focusStarted = false
        }, 2000)
      }

      this.focusStarted = true
    },

    append () {
      this.element.className = 'kuvaify'
      this.element.style.transition = `opacity ${parent.options.transitionSpeed}ms ease, visibility ${parent.options.transitionSpeed}ms ease`

      parent.body.appendChild(this.element)
    },

    visibility (what) {
      if (what === 'show') {
        this.element.classList.add('visible')
      }
      if (what === 'hide') {
        this.element.classList.remove('visible')
      }
      if (what === 'focus') {
        this.element.classList.add('focused')
      }
      if (what === 'unfocus') {
        this.element.classList.remove('focused')
      }
    },

    addEventListeners () {
      window.addEventListener('mousemove', this.focus)
    },

    removeEventListeners () {
      window.removeEventListener('mousemove', this.focus)
    }
  }

  return overlay
}

export default init