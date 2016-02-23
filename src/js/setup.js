'use strict'

let opt = settings => {
  let options = {
    linkElement: 'body',
    fileTypes: ['jpg', 'jpeg', 'png', 'gif'],
    coverScreen: true,
    showShortcuts: true,
    transitionSpeed: 400,
    transitionOverlap: 0.2,
    transitionScale: 0.08,
    zoomRatio: 0.2,
    smallSize: 768,
    mediumSize: 1280
  }

  if (settings.linkElement) {
    if (typeof settings.linkElement === 'string') {
      options.linkElement = settings.linkElement
    }
  }
  if (settings.fileTypes) {
    if (settings.fileTypes.constructor === Array) {
      options.fileTypes = settings.fileTypes
    }
  }
  if (settings.coverScreen !== undefined) {
    if (settings.coverScreen === false) {
      options.coverScreen = false
    }
  }
  if (settings.showShortcuts !== undefined) {
    if (settings.showShortcuts === false) {
      options.showShortcuts = false
    }
  }
  if (settings.transitionSpeed !== undefined) {
    if (typeof settings.transitionSpeed === 'number' && settings.transitionSpeed >= 100) {
      options.transitionSpeed = settings.transitionSpeed
    }
  }
  if (settings.transitionOverlap !== undefined) {
    if (typeof settings.transitionOverlap === 'number' && settings.transitionOverlap !== undefined && settings.transitionOverlap > 0 && settings.transitionOverlap < 1) {
      options.transitionOverlap = settings.transitionOverlap
    }
    if (settings.transitionOverlap === 0) {
      options.transitionOverlap = 1
    }
  }
  if (settings.transitionScale !== undefined) {
    if (typeof settings.transitionScale === 'number') {
      options.transitionScale = settings.transitionScale
    }
    if (settings.transitionScale === 0) {
      options.transitionScale = 0
    }
  }
  if (settings.zoomScale !== undefined) {
    if (typeof settings.zoomScale === 'number') {
      options.zoomScale = settings.zoomScale
    }
    if (settings.zoomScale === 0) {
      options.zoomScale = 0
    }
  }
  if (settings.smallSize) {
    if (typeof settings.smallSize === 'number') {
      options.smallSize = settings.smallSize
    }
  }
  if (settings.mediumSize) {
    if (typeof settings.mediumSize === 'number') {
      options.mediumSize = settings.mediumSize
    }
  }

  return options
}

let links = function () {
  let links = Array.from(document.querySelectorAll(this.options.linkElement + ' a'))
  let fileTypes = this.options.fileTypes.join('|')
  let regex = new RegExp('\.(' + fileTypes + ')$');

  links.forEach(link => {
    this.pushImage(link)

    link.addEventListener('click', event => {
      let index = links.indexOf(link)

      this.setCurrent(index)

      this.overlay.append()
      this.closeDiv.append()
      this.close.append()
      this.menu.append()
      this.navigation.append()
      this.spinner.append()

      setTimeout(() => {
        this.overlay.visibility('show')
        this.close.visibility('show')
        this.menu.visibility('show')
        this.navigation.visibility('depends')
      }, 50)

      setTimeout(() => {
        this.closed = false

        this.overlay.addEventListeners()
        this.closeDiv.addEventListeners()
        this.close.addEventListeners()
        this.menu.addEventListeners()
        this.navigation.addEventListeners()

        this.img.prepare(index)
      }, this.options.transitionSpeed + 50)

      setTimeout(() => {
        this.systemsReady = true
      }, this.options.transitionSpeed + 400)

      event.preventDefault()
    })
  })

  return links
}

export default {
  opt,
  links
}