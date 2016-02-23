'use strict'

let init = function () {
  let parent = this

  let rotate = {
    negative: document.createElement('a'),
    positive: document.createElement('a'),

    append () {
      this.negative.className = 'kuvaify-rotate-negative-button',
      this.negative.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M25 39c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14" stroke-linejoin="round"/><path d="M5.03 17.885l5.565 8.308 8.308-5.567"/></g></svg>'
      this.positive.className = 'kuvaify-rotate-positive-button',
      this.positive.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M25 39c-7.732 0-14-6.268-14-14s6.268-14 14-14 14 6.268 14 14" stroke-linejoin="round"/><path d="M44.97 17.885l-5.565 8.308-8.308-5.567"/></g></svg>'

      parent.menu.div.appendChild(this.negative)
      parent.menu.div.appendChild(this.positive)
    },

    negativeRotate (event) {
      parent.img.transform({
        rotateValue: parent.images[parent.currentIndex].rotate - 90
      })

      event.preventDefault()
    },

    positiveRotate (event) {
      parent.img.transform({
        rotateValue: parent.images[parent.currentIndex].rotate + 90
      })

      event.preventDefault()
    },

    keydown (event) {
      if (event.keyCode === 33) {
        parent.rotate.positiveRotate(event)
      }
      if (event.keyCode === 34) {
        parent.rotate.negativeRotate(event)
      }
    },

    dblclick (event) {
      event.preventDefault()
    },

    addEventListeners () {
      this.negative.addEventListener('click', this.negativeRotate)
      this.positive.addEventListener('click', this.positiveRotate)
      this.negative.addEventListener('dblclick', this.dblclick)
      this.positive.addEventListener('dblclick', this.dblclick)

      window.addEventListener('keydown', this.keydown)
    },

    removeEventListeners () {
      this.negative.removeEventListener('click', this.negativeRotate)
      this.positive.removeEventListener('click', this.positiveRotate)
      this.negative.removeEventListener('dblclick', this.dblclick)
      this.positive.removeEventListener('dblclick', this.dblclick)

      window.removeEventListener('keydown', this.keydown)
    }
  }

  return rotate
}

export default init