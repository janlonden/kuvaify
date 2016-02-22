'use strict'

let init = function () {
  let parent = this

  let spinner = {
    element: document.createElement('div'),

    append () {
      this.element.className = 'kuvaify-spinner'
      this.element.innerHTML = '<div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>'
      this.element.style.transition = `opacity ${parent.options.transitionSpeed}ms ease, visibility ${parent.options.transitionSpeed}ms ease`

      parent.overlay.element.appendChild(this.element)
    },

    visibility (what) {
      if (what === 'show') {
        this.element.classList.add('visible')
      }
      if (what === 'hide') {
        this.element.classList.remove('visible')
      }
    }
  }

  return spinner
}

export default init