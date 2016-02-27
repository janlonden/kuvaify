'use strict'

let init = function () {
  let kuvaify = this
  let images = kuvaify.images
  let options = kuvaify.options
  let firefox = (navigator.userAgent.indexOf('Firefox') !== -1) ? true : false

  let href = index => {
    let img = images[index]

    if (kuvaify.screenWidth < options.smallSize) {
      return img.smallHref
    }
    if (kuvaify.screenWidth < options.mediumSize) {
      return img.mediumHref
    }

    return img.href
  }

  let size = index => {
    (index => {
      let img = images[index].element
      let body = kuvaify.body
      let imgWidth = img.clientWidth
      let imgHeight = img.clientHeight

      kuvaify.screenWidth = body.clientWidth
      kuvaify.screenHeight = body.clientHeight

      if (imgWidth < kuvaify.screenWidth && imgHeight < kuvaify.screenHeight) {
        if (imgWidth > imgHeight) {
          img.classList.remove('cover-horizontally')
          img.classList.add('cover-vertically')
        } else {
          img.classList.remove('cover-vertically')
          img.classList.add('cover-horizontally')
        }
      } else {
        if (imgWidth < kuvaify.screenWidth) {
          img.classList.remove('cover-vertically')
          img.classList.add('cover-horizontally')
        }
        if (imgHeight < kuvaify.screenHeight) {
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
      let overlay = kuvaify.overlay.element
      let spinner = kuvaify.spinner

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

        if (index === kuvaify.currentIndex && !kuvaify.closed) {
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
            scale: img.scale - options.transitionScale
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
          scale: img.scale + options.transitionScale
        })
      }
    })(index)
  }

  let prepare = (index, navigated) => {
    let img = images[index]
    let navigation = kuvaify.navigation
    let spinner = kuvaify.spinner

    navigation.removeEventListeners()

    if (navigated) {
      removeEventListeners()

      hide(kuvaify.oldIndex)
    }

    kuvaify.setCurrent(index)

    let next = kuvaify.nextIndex
    let prev = kuvaify.prevIndex

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

  let transform = (index, { scale = images[index].scale, rotate = images[index].rotate }) => {
    ((index, scale, rotate) => {
      let img = images[index]

      kuvaify.rotate.removeEventListeners()

      let transformString = `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`

      img.scale = scale
      img.rotate = rotate
      img.element.style.webkitTransform = transformString
      img.element.style.msTransform = transformString
      img.element.style.transform = transformString

      setTimeout(() => {
        kuvaify.rotate.addEventListeners()
      }, options.transitionSpeed / 2)
    })(index, scale, rotate)
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
      scale: 1,
      rotate: 0
    })
  }

  let click = event => {
    kuvaify.menu.div.classList.remove('visible')

    event.preventDefault()
  }

  let dblclick = event => {
    reset(kuvaify.currentIndex)

    event.preventDefault()
  }

  let wheel = event => {
    let img = images[kuvaify.currentIndex]
    let delta = firefox ? event.detail : event.wheelDelta
    let positive = firefox ? delta < 0 : delta > 0
    let negative = firefox ? delta > 0 : delta < 0

    if (positive) {
      img.scale += img.scaleRatio
    }
    if (negative) {
      if (img.scale >= 0.001) {
        img.scale -= img.scaleRatio
      }
    }

    transform(kuvaify.currentIndex, {
      scale: img.scale
    })

    event.preventDefault()
  }

  let mousedown = event => {
    let img = images[kuvaify.currentIndex]

    img.offx = event.clientX - img.element.offsetLeft
    img.offy = event.clientY - img.element.offsetTop

    window.addEventListener('mousemove', mousemove)

    event.preventDefault()
  }

  let mousemove = event => {
    let img = images[kuvaify.currentIndex]

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
    let img = images[kuvaify.currentIndex]
    let wheelEvent = firefox ? 'DOMMouseScroll' : 'mousewheel'

    img.element.addEventListener('mousedown', mousedown)
    img.element.addEventListener('click', click)
    img.element.addEventListener('dblclick', dblclick)

    window.addEventListener(wheelEvent, wheel)
    window.addEventListener('mouseup', mouseup)
  }

  let removeEventListeners = () => {
    let img = images[kuvaify.currentIndex]
    let wheelEvent = firefox ? 'DOMMouseScroll' : 'mousewheel'

    img.element.removeEventListener('mousedown', mousedown)
    img.element.removeEventListener('click', click)
    img.element.removeEventListener('dblclick', dblclick)

    window.removeEventListener(wheelEvent, wheel)
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