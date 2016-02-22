let init = function () {
  let parent = this

  let close = {
    element: document.createElement('a'),

    append () {
      this.element.className = 'kuvaify-close-button',
      this.element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M10 40l30-30M40 40L10 10"/></g></svg>'

      parent.overlay.element.appendChild(this.element)
    },

    visibility (what) {
      if (what === 'show') {
        this.element.classList.add('visible')
      }
      if (what === 'hide') {
        this.element.classList.remove('visible')
      }
    },

    close () {
      parent.closed = true

      parent.overlay.visibility('hide')
      parent.closeDiv.visibility('hide')
      parent.img.visibility('hide')
      this.visibility('hide')
      parent.menu.visibility('hide')
      parent.navigation.visibility('hide')
      parent.spinner.visibility('hide')

      parent.overlay.removeEventListeners()
      parent.closeDiv.removeEventListeners()
      parent.img.removeEventListeners()
      parent.menu.removeEventListeners()
      parent.reset.removeEventListeners()
      parent.zoom.removeEventListeners()
      parent.rotate.removeEventListeners()
      parent.navigation.removeEventListeners()
    },

    closeEvent (event) {
      parent.close.close()

      event.preventDefault()
    },

    keydown (event) {
      if (event.keyCode === 27) {
        parent.close.closeEvent(event)
      }
    },

    addEventListeners () {
      this.element.addEventListener('click', this.closeEvent)

      window.addEventListener('keydown', this.keydown)
    },

    removeEventListeners () {
      this.element.removeEventListener('click', this.closeEvent)

      window.removeEventListener('keydown', this.keydown)
    }
  }

  return close
}

export default init