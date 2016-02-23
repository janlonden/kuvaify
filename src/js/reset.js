'use strict'

let init = function () {
  let parent = this

  const reset = {
    element: document.createElement('a'),

    append () {
      this.element.className = 'kuvaify-reset-button',
      this.element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M21.62 28.38L10.31 39.69M12 28h10v10"/><g><path d="M28.38 21.62L39.69 10.31M38 22H28V12"/></g></g></svg>'

      parent.menu.div.appendChild(this.element)
    },

    reset (event) {
      parent.img.reset()

      event.preventDefault()
    },

    keydown (event) {
      if (event.keyCode === 36) {
        parent.reset.reset(event)
      }
    },

    dblclick (event) {
      event.preventDefault()
    },

    addEventListeners () {
      this.element.addEventListener('click', this.reset)
      this.element.addEventListener('dblclick', this.dblclick)

      window.addEventListener('keydown', this.keydown)
    },

    removeEventListeners () {
      this.element.removeEventListener('click', this.reset)
      this.element.removeEventListener('dblclick', this.dblclick)

      window.removeEventListener('keydown', this.keydown)
    }
  }

  return reset
}

export default init