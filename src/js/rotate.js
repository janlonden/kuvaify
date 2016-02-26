'use strict'

let init = function () {
  let parent = this
  let negative = document.createElement('a')
  let positive = document.createElement('a')

  let append = () => {
    negative.className = 'kuvaify-rotate-negative-button',
    negative.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M25 39c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14" stroke-linejoin="round"/><path d="M5.03 17.885l5.565 8.308 8.308-5.567"/></g></svg>'
    positive.className = 'kuvaify-rotate-positive-button',
    positive.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M25 39c-7.732 0-14-6.268-14-14s6.268-14 14-14 14 6.268 14 14" stroke-linejoin="round"/><path d="M44.97 17.885l-5.565 8.308-8.308-5.567"/></g></svg>'

    parent.menu.div.appendChild(negative)
    parent.menu.div.appendChild(positive)
  }

  let negativeRotate = event => {
    parent.img.transform(parent.currentIndex, {
      rotateValue: parent.images[parent.currentIndex].rotate - 90
    })

    event.preventDefault()
  }

  let positiveRotate = event => {
    parent.img.transform(parent.currentIndex, {
      rotateValue: parent.images[parent.currentIndex].rotate + 90
    })

    event.preventDefault()
  }

  let keydown = event => {
    if (event.keyCode === 33) {
      positiveRotate(event)
    }
    if (event.keyCode === 34) {
      negativeRotate(event)
    }
  }

  let dblclick = event => {
    event.preventDefault()
  }

  let addEventListeners = () => {
    negative.addEventListener('click', negativeRotate)
    positive.addEventListener('click', positiveRotate)
    negative.addEventListener('dblclick', dblclick)
    positive.addEventListener('dblclick', dblclick)

    window.addEventListener('keydown', keydown)
  }

  let removeEventListeners = () => {
    negative.removeEventListener('click', negativeRotate)
    positive.removeEventListener('click', positiveRotate)
    negative.removeEventListener('dblclick', dblclick)
    positive.removeEventListener('dblclick', dblclick)

    window.removeEventListener('keydown', keydown)
  }

  return {
    append,
    addEventListeners,
    removeEventListeners
  }
}

export default init