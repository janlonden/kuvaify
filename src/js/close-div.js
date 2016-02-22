let init = function () {
  let parent = this

  let closeDiv = {
    element: document.createElement('div'),

    append () {
      this.element.className = 'kuvaify-close-div'

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

    click (event) {
      parent.close.close()

      event.preventDefault()
    },

    addEventListeners () {
      this.element.addEventListener('click', this.click)
    },

    removeEventListeners () {
      this.element.removeEventListener('click', this.click)
    }
  }

  return closeDiv
}

export default init