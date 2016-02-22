'use strict'

let init = function () {
  let parent = this

  const zoom = {
    _out: document.createElement('a'),
    _in: document.createElement('a'),

    append () {
      this._out.className = 'kuvaify-zoom-out-button',
      this._out.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><path d="M40 25H10" fill="none" stroke="#fff" stroke-width="2"/></svg>'
      this._in.className = 'kuvaify-zoom-in-button',
      this._in.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g fill="none" stroke="#fff" stroke-width="2"><path d="M25 40V10M40 25H10"/></g></svg>'

      parent.menu.div.appendChild(this._out)
      parent.menu.div.appendChild(this._in)
    },

    zoomOut (event) {
      if (parent.images[parent.currentIndex].scale >= 0.4) {
        parent.images[parent.currentIndex].scale -= parent.images[parent.currentIndex].scaleRatio
      }

      parent.img.transform({
        scaleValue: parent.images[parent.currentIndex].scale
      })

      event.preventDefault()
    },

    zoomIn (event) {
      parent.images[parent.currentIndex].scale += parent.images[parent.currentIndex].scaleRatio

      parent.img.transform({
        scaleValue: parent.images[parent.currentIndex].scale
      })

      event.preventDefault()
    },

    keydown (event) {
      if (event.keyCode === 38) {
        parent.zoom.zoomIn(event)
      }
      if (event.keyCode === 40) {
        parent.zoom.zoomOut(event)
      }
    },

    addEventListeners () {
      this._out.addEventListener('click', this.zoomOut)
      this._in.addEventListener('click', this.zoomIn)

      window.addEventListener('keydown', this.keydown)
    },

    removeEventListeners () {
      this._out.removeEventListener('click', this.zoomOut)
      this._in.removeEventListener('click', this.zoomIn)

      window.removeEventListener('keydown', this.keydown)
    }
  }

  return zoom
}

export default init