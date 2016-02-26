'use strict'

let init = function () {
  let parent = this
  let button = document.createElement('a')
  let div = document.createElement('div')
  let help = document.createElement('p')

  let append = () => {
    button.className = 'kuvaify-menu-button'
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M10 11h30M10 25h30M10 39h30"/></g></svg>'
    div.className = 'kuvaify-menu-div'
    help.className = 'kuvaify-help'
    help.innerHTML = 'Desktop users can use the <strong>left</strong> and <strong>right</strong> keys to navigate; <strong>up</strong> and <strong>down</strong> or <strong>scroll</strong> to zoom; <strong>page up</strong> and <strong>page down</strong> to rotate; <strong>click</strong> and <strong>drag</strong> to move; <strong>home</strong> or <strong>double click</strong> to reset; and <strong>esc</strong> to close.'

    parent.rotate.append()
    parent.zoom.append()
    parent.reset.append()

    if (parent.options.showShortcuts && parent.screenWidth > 1280) {
      div.appendChild(help)
    }

    parent.overlay.element.appendChild(button)
    parent.overlay.element.appendChild(div)
  }

  let visibility = what => {
    if (what === 'visible') {
      button.classList.add('visible')
    }
    if (what === 'hidden') {
      button.classList.remove('visible')
      div.classList.remove('visible')
    }
  }

  let click = event => {
    if (!div.classList.contains('visible')) {
      div.classList.add('visible')
    } else {
      div.classList.remove('visible')
    }

    event.preventDefault()
  }

  let divClick = event => {
    div.classList.remove('visible')

    event.preventDefault()
  }

  let addEventListeners = () => {
    button.addEventListener('click', click)

    parent.rotate.addEventListeners()
    parent.zoom.addEventListeners()
    parent.reset.addEventListeners()
  }

  let removeEventListeners = () => {
    button.removeEventListener('click', click)

    parent.rotate.removeEventListeners()
    parent.zoom.removeEventListeners()
    parent.reset.removeEventListeners()
  }

  return {
    div,
    append,
    visibility,
    addEventListeners,
    removeEventListeners
  }
}

export default init