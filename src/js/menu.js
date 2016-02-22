let init = function () {
  let parent = this

  let menu = {
    button: document.createElement('a'),
    div: document.createElement('div'),
    help: document.createElement('p'),

    append () {
      this.button.className = 'kuvaify-menu-button'
      this.button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M10 11h30M10 25h30M10 39h30"/></g></svg>'
      this.div.className = 'kuvaify-menu-div'
      this.help.className = 'kuvaify-help'
      this.help.innerHTML = 'Desktop users can use the <strong>left</strong> and <strong>right</strong> keys to navigate; <strong>up</strong> and <strong>down</strong> or <strong>scroll</strong> to zoom; <strong>page up</strong> and <strong>page down</strong> to rotate; <strong>click</strong> and <strong>drag</strong> to move; <strong>home</strong> to reset; and <strong>esc</strong> to close.'

      parent.rotate.append()
      parent.zoom.append()
      parent.reset.append()

      if (parent.options.showShortcuts && parent.screenWidth > 1280) {
        this.div.appendChild(this.help)
      }

      parent.overlay.element.appendChild(this.button)
      parent.overlay.element.appendChild(this.div)
    },

    visibility (what) {
      if (what === 'show') {
        this.button.classList.add('visible')
      }
      if (what === 'hide') {
        this.button.classList.remove('visible')
        this.div.classList.remove('visible')
      }
    },

    click (event) {
      if (!parent.menu.div.classList.contains('visible')) {
        parent.menu.div.classList.add('visible')
      } else {
        parent.menu.div.classList.remove('visible')
      }

      event.preventDefault()
    },

    divClick (event) {
      parent.menu.div.classList.remove('visible')

      event.preventDefault()
    },

    addEventListeners () {
      this.button.addEventListener('click', this.click)

      parent.rotate.addEventListeners()
      parent.zoom.addEventListeners()
      parent.reset.addEventListeners()
    },

    removeEventListeners () {
      this.button.removeEventListener('click', this.click)

      parent.rotate.removeEventListeners()
      parent.zoom.removeEventListeners()
      parent.reset.removeEventListeners()
    }
  }

  return menu
}

export default init