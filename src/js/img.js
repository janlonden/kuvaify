'use strict'

let init = function () {
  let parent = this
  let images = parent.images
  let options = parent.options
  let firefox = (navigator.userAgent.includes('Firefox')) ? true : false

  let href = index => {
    let img = images[index]

    if (parent.screenWidth < options.smallSize) {
      return img.smallHref
    }
    if (parent.screenWidth < options.mediumSize) {
      return img.mediumHref
    }

    return img.href
  }

  let size = index => {
    (index => {
      let img = images[index].element
      let body = parent.body
      let imgWidth = img.clientWidth
      let imgHeight = img.clientHeight

      parent.screenWidth = body.clientWidth
      parent.screenHeight = body.clientHeight

      if (imgWidth < parent.screenWidth && imgHeight < parent.screenHeight) {
        if (imgWidth > imgHeight) {
          img.classList.remove('cover-horizontally')
          img.classList.add('cover-vertically')
        } else {
          img.classList.remove('cover-vertically')
          img.classList.add('cover-horizontally')
        }
      } else {
        if (imgWidth < parent.screenWidth) {
          img.classList.remove('cover-vertically')
          img.classList.add('cover-horizontally')
        }
        if (imgHeight < parent.screenHeight) {
          img.classList.remove('cover-horizontally')
          img.classList.add('cover-vertically')
        }
      }
    })(index)
  }

  let visibility = (what, index) => {
    ((what, index) => {
      let img = images[index]

      if (what === 'visible') {
        img.element.classList.add('visible')

        if (img.caption) {
          img.caption.classList.add('visible')
        }
      }
      if (what === 'hidden') {
        img.element.classList.remove('visible')

        if (img.caption) {
          img.caption.classList.remove('visible')
        }
      }
    })(what, index)
  }

  let get = index => {
    (index => {
      let img = images[index]
      let overlay = parent.overlay.element
      let spinner = parent.spinner

      spinner.visibility('visible')

      overlay.appendChild(img.element)

      img.element.src = href(index)

      if (img.caption) {
        overlay.appendChild(img.caption)
      }

      hide(index)

      img.element.addEventListener('load', () => {
        img.loaded = true

        if (options.coverScreen) {
          size(index)
        }

        spinner.visibility('hidden')

        if (index === parent.currentIndex && !parent.closed) {
          show(index)
        }
      })
    })(index)
  }

  let show = index => {
    ((index) => {
      let img = images[index]

      setTimeout(() => {
        visibility('visible', index)

        if (options.transitionScale > 0) {
          transform(index, {
            scaleValue: img.scale - options.transitionScale
          })
        }
      }, options.transitionSpeed * options.transitionOverlap)
    })(index)
  }

  let hide = index => {
    ((index) => {
      let img = images[index]

      visibility('hidden', index)

      if (options.transitionScale > 0) {
        transform(index, {
          scaleValue: img.scale + options.transitionScale
        })
      }
    })(index)
  }

  let prepare = (index, navigated) => {
    let img = images[index]
    let navigation = parent.navigation
    let spinner = parent.spinner

    navigation.removeEventListeners()

    if (navigated) {
      removeEventListeners()

      hide(parent.oldIndex)

      parent.setCurrent(index)
    } else {
      parent.setCurrent(index)
    }

    let next = parent.nextIndex
    let prev = parent.prevIndex

    if (next) {
      if (!images[next].loaded) {
        get(next)
      }
    }
    if (prev) {
      if (!images[prev].loaded) {
        get(prev)
      }
    }

    addEventListeners()

    if (!img.element.src) {
      get(index)
    } else {
      if (img.loaded) {
        spinner.visibility('hidden')

        show(index)
      } else {
        spinner.visibility('visible')
      }
    }

    setTimeout(() => {
      navigation.visibility('depends')
      navigation.addEventListeners()
    }, options.transitionSpeed / 2)
  }

  let transform = (index, { scaleValue = images[index].scale, rotateValue = images[index].rotate }) => {
    ((index, scaleValue, rotateValue) => {
      let img = images[index]

      parent.rotate.removeEventListeners()

      let transformString = `translate(-50%, -50%) scale(${scaleValue}) rotate(${rotateValue}deg)`

      img.scale = scaleValue
      img.rotate = rotateValue
      img.element.style.webkitTransform = transformString
      img.element.style.msTransform = transformString
      img.element.style.transform = transformString

      setTimeout(() => {
        parent.rotate.addEventListeners()
      }, options.transitionSpeed / 2)
    })(index, scaleValue, rotateValue)
  }

  let reset = index => {
    let img = images[index]

    img.element.style.transition = img.transition + ', left 400ms ease, top 400ms ease'
    img.element.style.left = null
    img.element.style.top = null

    setTimeout(() => {
      img.element.style.transition = img.transition
    }, options.transitionSpeed)

    transform(index, {
      scaleValue: 1,
      rotateValue: 0
    })
  }

  let click = event => {
    parent.menu.div.classList.remove('visible')

    event.preventDefault()
  }

  let dblclick = event => {
    reset(parent.currentIndex)

    event.preventDefault()
  }

  let wheel = event => {
    let img = images[parent.currentIndex]
    let delta = firefox ? event.detail : event.wheelDelta
    let positive = firefox ? -1 : 1
    let negative = firefox ? 1 : -1

    if ((Math.sign(delta) === positive)) {
      img.scale += img.scaleRatio
    }
    if ((Math.sign(delta) === negative)) {
      if (img.scale >= 0.001) {
        img.scale -= img.scaleRatio
      }
    }

    transform(parent.currentIndex, {
      scaleValue: img.scale
    })

    event.preventDefault()
  }

  let mousedown = event => {
    let img = images[parent.currentIndex]

    img.offx = event.clientX - img.element.offsetLeft
    img.offy = event.clientY - img.element.offsetTop

    window.addEventListener('mousemove', mousemove)

    event.preventDefault()
  }

  let mousemove = event => {
    let img = images[parent.currentIndex]

    let move = () => {
      img.element.style.left = event.clientX - img.offx + 'px'
      img.element.style.top = event.clientY - img.offy + 'px'
    }

    window.requestAnimationFrame(move)
  }

  let mouseup = event => {
    window.removeEventListener('mousemove', mousemove)
  }

  let addEventListeners = () => {
    let img = images[parent.currentIndex]

    img.element.addEventListener('mousedown', mousedown)
    img.element.addEventListener('click', click)
    img.element.addEventListener('dblclick', dblclick)

    if (firefox) {
      window.addEventListener('DOMMouseScroll', wheel)
    } else {
      window.addEventListener('mousewheel', wheel)
    }
    window.addEventListener('mouseup', mouseup)
  }

  let removeEventListeners = () => {
    let img = images[parent.currentIndex]

    img.element.removeEventListener('mousedown', mousedown)
    img.element.removeEventListener('click', click)
    img.element.removeEventListener('dblclick', dblclick)

    if (firefox) {
      window.removeEventListener('DOMMouseScroll', wheel)
    } else {
      window.removeEventListener('mousewheel', wheel)
    }
    window.removeEventListener('mouseup', mouseup)
  }

  let resize = event => {
    images.forEach((img) => {
      let index = images.indexOf(img)

      size(index)
    })
  }

  let addResizeListener = () => {
    if (options.coverScreen) {
      window.addEventListener('resize', resize)
    }
  }

  return {
    hide,
    prepare,
    transform,
    reset,
    addEventListeners,
    removeEventListeners,
    addResizeListener
  }
}

export default init