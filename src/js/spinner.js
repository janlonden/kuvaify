'use strict'

let init = function () {
  let kuvaify = this
  let element = document.createElement('div')

  let append = () => {
    element.className = 'kuvaify-spinner'
    element.innerHTML = '<div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>'
    element.style.transition = `opacity ${kuvaify.options.transitionSpeed}ms ease, visibility ${kuvaify.options.transitionSpeed}ms ease`

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

  return {
    append,
    visibility
  }
}

export default init