'use strict'

let init = function () {
  let parent = this

  let navigation = {
    next: document.createElement('a'),
    prev: document.createElement('a'),

    append () {
      this.next.className = 'kuvaify-next-button'
      this.next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><path d="M14.467 10l20 15-20 15" fill="none" stroke="#fff" stroke-width="2"/></svg>'
      this.prev.className = 'kuvaify-prev-button'
      this.prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><path d="M35.533 10l-20 15 20 15" fill="none" stroke="#fff" stroke-width="2"/></svg>'

      parent.overlay.element.appendChild(this.next)
      parent.overlay.element.appendChild(this.prev)
    },

    visibility (what) {
      if (what === 'depends') {
        if (parent.nextIndex === null) {
          this.next.classList.remove('visible')
        } else {
          this.next.classList.add('visible')
        }
        if (parent.prevIndex === null) {
          this.prev.classList.remove('visible')
        } else {
          this.prev.classList.add('visible')
        }
      }
      if (what === 'hide') {
        this.next.classList.remove('visible')
        this.prev.classList.remove('visible')
      }
    },

    getNext () {
      if (parent.nextIndex !== null) {
        parent.img.prepare(parent.nextIndex)
      }
    },

    getPrev () {
      if (parent.prevIndex !== null) {
        parent.img.prepare(parent.prevIndex)
      }
    },

    nextImg (event) {
      parent.navigation.getNext()

      event.preventDefault()
    },

    prevImg (event) {
      parent.navigation.getPrev()

      event.preventDefault()
    },

    keydown: function (event) {
      if (event.keyCode === 39) {
        parent.navigation.getNext(event)
      }
      if (event.keyCode === 37) {
        parent.navigation.getPrev(event)
      }
    },

    addEventListeners () {
      this.next.addEventListener('click', this.nextImg)
      this.prev.addEventListener('click', this.prevImg)

      window.addEventListener('keydown', this.keydown)
    },

    removeEventListeners () {
      this.next.removeEventListener('click', this.nextImg)
      this.prev.removeEventListener('click', this.prevImg)

      window.removeEventListener('keydown', this.keydown)
    }
  }

  return navigation
}

export default init