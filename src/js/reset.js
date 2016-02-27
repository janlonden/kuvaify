'use strict'

let init = function () {
  let kuvaify = this
  let element = document.createElement('a')

  let append = () => {
    element.className = 'kuvaify-reset-button',
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M21.62 28.38L10.31 39.69M12 28h10v10"/><g><path d="M28.38 21.62L39.69 10.31M38 22H28V12"/></g></g></svg>'

    kuvaify.menu.div.appendChild(element)
  }

  let click = event => {
    kuvaify.img.reset(kuvaify.currentIndex)

    event.preventDefault()
  }

  let keydown = event => {
    if (event.keyCode === 36) {
      click(event)
    }
  }

  let dblclick = event => {
    event.preventDefault()
  }

  let addEventListeners = () => {
    element.addEventListener('click', click)
    element.addEventListener('dblclick', dblclick)

    window.addEventListener('keydown', keydown)
  }

  let removeEventListeners = () => {
    element.removeEventListener('click', click)
    element.removeEventListener('dblclick', dblclick)

    window.removeEventListener('keydown', keydown)
  }

  return {
    append,
    addEventListeners,
    removeEventListeners
  }
}

export default init