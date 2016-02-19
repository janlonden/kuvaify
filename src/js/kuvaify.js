var kuvaify = (function () {
  'use strict'

  var options = {
    linkElement: 'body',
    fileTypes: ['jpg', 'jpeg', 'png', 'gif'],
    coverScreen: true,
    showShortcuts: true,
    transitionSpeed: 400,
    transitionScale: 0.08,
    zoomRatio: 0.2,
    smallSize: 768,
    mediumSize: 1280
  }

  var body = document.body
  var images = []
  var currentIndex = null
  var nextIndex = null
  var prevIndex = null
  var screenWidth = body.clientWidth
  var screenHeight = body.clientHeight

  var setup = function (settings) {
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
    if (settings.transitionSpeed) {
      if (typeof settings.transitionSpeed === 'number' && settings.transitionSpeed >= 100) {
        options.transitionSpeed = settings.transitionSpeed
      }
    }
    if (settings.transitionScale) {
      if (typeof settings.transitionScale === 'number') {
        options.transitionScale = settings.transitionScale
      }
      if (settings.transitionScale === 0) {
        options.transitionScale = 0
      }
    }
    if (settings.zoomScale) {
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

    links.get()
    links.push()
    links.addEventListeners()
  }

  var init = function (settings) {
    setup(settings)
  }

  var links = {
    links: [],

    get: function () {
      var linksCollection = document.querySelectorAll(options.linkElement + ' a')
      var linksArray = [].slice.call(linksCollection)
      var fileTypes = options.fileTypes.join('|')
      var regex = new RegExp('\.(' + fileTypes + ')$');

      linksArray.forEach(function (link) {
        if (link.pathname.match(regex)) {
          links.links.push(link)
        }
      })
    },

    push: function () {
      links.links.forEach(function (link) {
        img.push(link)
      })
    },

    addEventListeners: function () {
      links.links.forEach(function (link) {
        link.addEventListener('click', function (event) {
          var index = links.links.indexOf(link)

          overlay.append()
          closeDiv.append()
          close.append()
          menu.append()
          navigation.append()
          spinner.append()

          overlay.addEventListeners()
          closeDiv.addEventListeners()
          menu.addEventListeners()
          close.addEventListeners()
          navigation.addEventListeners()

          img.current(index)
          img.prepare(index)

          setTimeout(function () {
            overlay.visibility('show')
            close.visibility('show')
            menu.visibility('show')
            navigation.visibility('depends')
          }, 100)

          event.preventDefault()
        })
      })
    }
  }

  var overlay = {
    element: document.createElement('div'),
    focusStarted: false,

    focus: function (event) {
      if (overlay.focusStarted === false) {
        overlay.visibility('focus')

        setTimeout(function () {
          overlay.visibility('unfocus')

          overlay.focusStarted = false
        }, 2000)
      }

      overlay.focusStarted = true
    },

    append: function () {
      body.appendChild(overlay.element)

      overlay.element.id = 'kuvaify'
      overlay.element.style.transition = 'opacity ' + options.transitionSpeed + 'ms ease, visibility ' + options.transitionSpeed + 'ms ease'
    },

    visibility: function (what) {
      if (what === 'show') {
        overlay.element.classList.add('visible')
      }
      if (what === 'hide') {
        overlay.element.classList.remove('visible')
      }
      if (what === 'focus') {
        overlay.element.classList.add('focused')
      }
      if (what === 'unfocus') {
        overlay.element.classList.remove('focused')
      }
    },

    addEventListeners: function () {
      window.addEventListener('mousemove', overlay.focus)
    },

    removeEventListeners: function () {
      window.removeEventListener('mousemove', overlay.focus)
    }
  }

  var img = {
    push: function (link) {
      var img = {
        element: document.createElement('img'),
        href: link.pathname,
        smallHref: link.getAttribute('data-kuvaify-small') || null,
        mediumHref: link.getAttribute('data-kuvaify-medium') || null,
        caption: null,
        scale: 1,
        scaleRatio: options.zoomRatio,
        rotate: 0,
        offx: 0,
        offy: 0,
        transition: 'width ' + options.transitionSpeed + 'ms ease, height ' + options.transitionSpeed + 'ms ease, transform ' + options.transitionSpeed + 'ms ease, opacity ' + options.transitionSpeed + 'ms ease, visibility ' + options.transitionSpeed + 'ms ease',
        loaded: false
      }

      img.element.style.transition = img.transition
      img.element.style.left = null
      img.element.style.top = null
      img.element.classList.add('kuvaify-img')

      if (link.getAttribute('data-kuvaify-caption')) {
        img.caption = document.createElement('div')
        img.caption.innerHTML = '<p>' + link.getAttribute('data-kuvaify-caption').replace(/<[^>]+>/ig,'') + '</p>'
        img.caption.id = 'kuvaify-caption'
        img.caption.style.transition = 'opacity ' + options.transitionSpeed + 'ms ease, visibility ' + options.transitionSpeed + 'ms ease'
      }

      images.push(img)
    },

    current: function (index) {
      var img = images[index]

      currentIndex = images.indexOf(img)

      if (images[currentIndex + 1]) {
        nextIndex = currentIndex + 1
      } else {
        nextIndex = null
      }
      if (images[currentIndex - 1]) {
        prevIndex = currentIndex - 1
      } else {
        prevIndex = null
      }
    },

    href: function () {
      if (screenWidth < options.smallSize) {
        return images[currentIndex].smallHref
      }
      if (screenWidth < options.mediumSize) {
        return images[currentIndex].mediumHref
      }

      return images[currentIndex].href
    },

    size: function () {
      var imgWidth = images[currentIndex].element.clientWidth
      var imgHeight = images[currentIndex].element.clientHeight
      var what

      screenWidth = body.clientWidth
      screenHeight = body.clientHeight

      if (imgWidth < screenWidth && imgHeight < screenHeight) {
        if (imgWidth > imgHeight) {
          what = 'cover-vertically'
        } else {
          what = 'cover-horizontally'
        }
      } else {
        if (imgWidth < screenWidth) {
          what = 'cover-horizontally'
        }
        if (imgHeight < screenHeight) {
          what = 'cover-vertically'
        }
      }

      images[currentIndex].element.classList.add(what)
    },

    visibility: function (what) {
      if (what === 'show') {
        images[currentIndex].element.classList.add('visible')

        if (options.transitionScale > 0) {
          img.transform({
            scale: images[currentIndex].scale - options.transitionScale
          })
        }

        if (images[currentIndex].caption) {
          images[currentIndex].caption.classList.add('visible')
        }
      }
      if (what === 'hide') {
        images[currentIndex].element.classList.remove('visible')

        if (images[currentIndex].caption) {
          images[currentIndex].caption.classList.remove('visible')
        }
      }
      if (what === 'measure') {
        images[currentIndex].element.classList.add('measure')
      }
      if (what === 'measured') {
        images[currentIndex].element.classList.remove('measure')
      }
    },

    show: function () {
      img.visibility('measure')

      if (options.transitionScale > 0) {
        img.transform({ scale: images[currentIndex].scale + options.transitionScale })
      }
      if (options.coverScreen) {
        img.size()
      }

      setTimeout(function () {
        img.visibility('show')

        setTimeout(function () { img.visibility('measured') }, 100)
      }, options.transitionSpeed / 4)
    },

    prepare: function (index) {
      navigation.removeEventListeners()

      img.visibility('hide')

      img.current(index)

      navigation.visibility('depends')

      img.addEventListeners()

      if (!images[currentIndex].element.src) {
        ;(function (thisIndex) {
          var thisIndex = thisIndex

          spinner.visibility('show')

          overlay.element.appendChild(images[thisIndex].element)

          if (images[thisIndex].caption) {
            overlay.element.appendChild(images[thisIndex].caption)
          }

          images[thisIndex].element.src = img.href()

          images[thisIndex].element.addEventListener('load', function () {
            images[thisIndex].loaded = true

            spinner.visibility('hide')

            if (thisIndex === currentIndex) {
              img.show()
            }
          })
        })(currentIndex)
      } else {
        if (images[currentIndex].loaded) {
          spinner.visibility('hide')

          img.show()
        } else {
          spinner.visibility('show')
        }
      }
      setTimeout(function () {
        navigation.addEventListeners()
      }, options.transitionSpeed / 2)
    },

    transform: function (transformArgs) {
      rotate.removeEventListeners()

      var scaleValue = transformArgs.scale || images[currentIndex].scale
      var rotateValue = transformArgs.rotate || images[currentIndex].rotate
      var transformString

      if (transformArgs.rotate === 0) {
        rotateValue = 0
      }

      transformString = 'translate(-50%, -50%) scale(' + scaleValue + ') rotate(' + rotateValue + 'deg)'

      images[currentIndex].scale = scaleValue
      images[currentIndex].rotate = rotateValue
      images[currentIndex].element.style.webkitTransform = transformString
      images[currentIndex].element.style.msTransform = transformString
      images[currentIndex].element.style.transform = transformString

      setTimeout(function () {
        rotate.addEventListeners()
      }, options.transitionSpeed / 2)
    },

    reset: function () {
      images[currentIndex].element.style.transition = images[currentIndex].transition + ', left ' + options.transitionSpeed + 'ms ease, top ' + options.transitionSpeed + 'ms ease'
      images[currentIndex].element.style.left = null
      images[currentIndex].element.style.top = null

      setTimeout(function () {
        images[currentIndex].element.style.transition = images[currentIndex].transition
      }, options.transitionSpeed)

      img.transform({
        scale: 1,
        rotate: 0
      })
    },

    click: function (event) {
      menu.div.classList.remove('visible')

      event.preventDefault()
    },

    wheel: function (event) {
      if (event.wheelDelta === 120) {
        images[currentIndex].scale += images[currentIndex].scaleRatio
      } else {
        if (images[currentIndex].scale >= 0.4) {
          images[currentIndex].scale -= images[currentIndex].scaleRatio
        }
      }

      img.transform({
        scale: images[currentIndex].scale
      })

      event.preventDefault()
    },

    mousedown: function (event) {
      images[currentIndex].offx = event.clientX - images[currentIndex].element.offsetLeft
      images[currentIndex].offy = event.clientY - images[currentIndex].element.offsetTop

      window.addEventListener('mousemove', img.mousemove)

      event.preventDefault()
    },

    mousemove: function (event) {
      var move = function () {
        images[currentIndex].element.style.left = event.clientX - images[currentIndex].offx + 'px'
        images[currentIndex].element.style.top = event.clientY - images[currentIndex].offy + 'px'
      }

      window.requestAnimationFrame(move)
    },

    mouseup: function (event) {
      window.removeEventListener('mousemove', img.mousemove)
    },

    addEventListeners: function () {
      images[currentIndex].element.addEventListener('mousedown', img.mousedown)
      images[currentIndex].element.addEventListener('click', img.click)

      window.addEventListener('wheel', img.wheel)
      window.addEventListener('mouseup', img.mouseup)

      if (options.coverScreen) {
        window.addEventListener('resize', img.size)
      }
    },

    removeEventListeners: function () {
      images[currentIndex].element.removeEventListener('mousedown', img.mousedown)
      images[currentIndex].element.removeEventListener('click', img.click)

      window.removeEventListener('wheel', img.wheel)
      window.removeEventListener('mouseup', img.mouseup)

      if (options.coverScreen) {
        window.removeEventListener('resize', img.size)
      }
    }
  }

  var close = {
    element: document.createElement('a'),

    append: function () {
      overlay.element.appendChild(close.element)

      close.element.id = 'kuvaify-close-button',
      close.element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M10 40l30-30M40 40L10 10"/></g></svg>'
    },

    visibility: function (what) {
      if (what === 'show') {
        close.element.classList.add('visible')
      }
      if (what === 'hide') {
        close.element.classList.remove('visible')
      }
    },

    close: function () {
      overlay.visibility('hide')
      closeDiv.visibility('hide')
      img.visibility('hide')
      close.visibility('hide')
      menu.visibility('hide')
      navigation.visibility('hide')
      spinner.visibility('hide')

      overlay.removeEventListeners()
      closeDiv.removeEventListeners()
      img.removeEventListeners()
      menu.removeEventListeners()
      reset.removeEventListeners()
      zoom.removeEventListeners()
      rotate.removeEventListeners()
      navigation.removeEventListeners()
    },

    closeEvent: function (event) {
      close.close()

      event.preventDefault()
    },

    keydown: function (event) {
      if (event.keyCode === 27) {
        close.closeEvent(event)
      }
    },

    addEventListeners: function () {
      close.element.addEventListener('click', close.closeEvent)

      window.addEventListener('keydown', close.keydown)
    },

    removeEventListeners: function () {
      close.element.removeEventListener('click', close.closeEvent)

      window.removeEventListener('keydown', close.keydown)
    }
  }

  var menu = {
    button: document.createElement('a'),
    div: document.createElement('div'),
    help: document.createElement('p'),

    append: function () {
      overlay.element.appendChild(menu.button)
      overlay.element.appendChild(menu.div)

      menu.button.id = 'kuvaify-menu-button'
      menu.button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M10 11h30M10 25h30M10 39h30"/></g></svg>'
      menu.div.id = 'kuvaify-menu-div'
      menu.help.id = 'kuvaify-help'
      menu.help.innerHTML = 'Desktop users can use the <strong>left</strong> and <strong>right</strong> keys to navigate; <strong>up</strong> and <strong>down</strong> or <strong>scroll</strong> to zoom; <strong>page up</strong> and <strong>page down</strong> to rotate; <strong>click</strong> and <strong>drag</strong> to move; <strong>home</strong> to reset; and <strong>esc</strong> to close.'

      rotate.append()
      zoom.append()
      reset.append()

      if (options.showShortcuts && screenWidth > 1280) {
        menu.div.appendChild(menu.help)
      }
    },

    visibility: function (what) {
      if (what === 'show') {
        menu.button.classList.add('visible')
      }
      if (what === 'hide') {
        menu.button.classList.remove('visible')
        menu.div.classList.remove('visible')
      }
    },

    click: function (event) {
      if (!menu.div.classList.contains('visible')) {
        menu.div.classList.add('visible')
      } else {
        menu.div.classList.remove('visible')
      }

      event.preventDefault()
    },

    divClick: function (event) {
      menu.div.classList.remove('visible')

      event.preventDefault()
    },

    addEventListeners: function () {
      menu.button.addEventListener('click', menu.click)

      rotate.addEventListeners()
      zoom.addEventListeners()
      reset.addEventListeners()
    },

    removeEventListeners: function () {
      menu.button.removeEventListener('click', menu.click)

      rotate.removeEventListeners()
      zoom.removeEventListeners()
      reset.removeEventListeners()
    }
  }

  var reset = {
    element: document.createElement('a'),

    append: function () {
      menu.div.appendChild(reset.element)

      reset.element.id = 'kuvaify-reset-button',
      reset.element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M21.62 28.38L10.31 39.69M12 28h10v10"/><g><path d="M28.38 21.62L39.69 10.31M38 22H28V12"/></g></g></svg>'
    },

    reset: function (event) {
      img.reset()

      event.preventDefault()
    },

    keydown: function (event) {
      if (event.keyCode === 36) {
        reset.reset(event)
      }
    },

    addEventListeners: function () {
      reset.element.addEventListener('click', reset.reset)

      window.addEventListener('keydown', reset.keydown)
    },

    removeEventListeners: function () {
      reset.element.removeEventListener('click', reset.reset)

      window.removeEventListener('keydown', reset.keydown)
    }
  }

  var zoom = {
    _out: document.createElement('a'),
    _in: document.createElement('a'),

    append: function () {
      menu.div.appendChild(zoom._out)
      menu.div.appendChild(zoom._in)

      zoom._out.id = 'kuvaify-zoom-out-button',
      zoom._out.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><path d="M40 25H10" fill="none" stroke="#fff" stroke-width="2"/></svg>'
      zoom._in.id = 'kuvaify-zoom-in-button',
      zoom._in.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g fill="none" stroke="#fff" stroke-width="2"><path d="M25 40V10M40 25H10"/></g></svg>'
    },

    zoomOut: function (event) {
      if (images[currentIndex].scale >= 0.4) {
        images[currentIndex].scale -= images[currentIndex].scaleRatio
      }

      img.transform({
        scale: images[currentIndex].scale
      })

      event.preventDefault()
    },

    zoomIn: function (event) {
      images[currentIndex].scale += images[currentIndex].scaleRatio

      img.transform({
        scale: images[currentIndex].scale
      })

      event.preventDefault()
    },

    keydown: function (event) {
      if (event.keyCode === 38) {
        zoom.zoomIn(event)
      }
      if (event.keyCode === 40) {
        zoom.zoomOut(event)
      }
    },

    addEventListeners: function () {
      zoom._out.addEventListener('click', zoom.zoomOut)
      zoom._in.addEventListener('click', zoom.zoomIn)

      window.addEventListener('keydown', zoom.keydown)
    },

    removeEventListeners: function () {
      zoom._out.removeEventListener('click', zoom.zoomOut)
      zoom._in.removeEventListener('click', zoom.zoomIn)

      window.removeEventListener('keydown', zoom.keydown)
    }
  }

  var rotate = {
    negative: document.createElement('a'),
    positive: document.createElement('a'),

    append: function () {
      menu.div.appendChild(rotate.negative)
      menu.div.appendChild(rotate.positive)

      rotate.negative.id = 'kuvaify-rotate-negative-button',
      rotate.negative.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M25 39c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14" stroke-linejoin="round"/><path d="M5.03 17.885l5.565 8.308 8.308-5.567"/></g></svg>'
      rotate.positive.id = 'kuvaify-rotate-positive-button',
      rotate.positive.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><g stroke="#fff" fill="none" stroke-width="2"><path d="M25 39c-7.732 0-14-6.268-14-14s6.268-14 14-14 14 6.268 14 14" stroke-linejoin="round"/><path d="M44.97 17.885l-5.565 8.308-8.308-5.567"/></g></svg>'
    },

    negativeRotate: function (event) {
      img.transform({
        rotate: images[currentIndex].rotate - 90
      })

      event.preventDefault()
    },

    positiveRotate: function (event) {
      img.transform({
        rotate: images[currentIndex].rotate + 90
      })

      event.preventDefault()
    },

    keydown: function (event) {
      if (event.keyCode === 33) {
        rotate.positiveRotate(event)
      }
      if (event.keyCode === 34) {
        rotate.negativeRotate(event)
      }
    },

    addEventListeners: function () {
      rotate.negative.addEventListener('click', rotate.negativeRotate)
      rotate.positive.addEventListener('click', rotate.positiveRotate)

      window.addEventListener('keydown', rotate.keydown)
    },

    removeEventListeners: function () {
      rotate.negative.removeEventListener('click', rotate.negativeRotate)
      rotate.positive.removeEventListener('click', rotate.positiveRotate)

      window.removeEventListener('keydown', rotate.keydown)
    }
  }

  var navigation = {
    next: document.createElement('a'),
    prev: document.createElement('a'),

    append: function () {
      overlay.element.appendChild(navigation.next)
      overlay.element.appendChild(navigation.prev)

      navigation.next.id = 'kuvaify-next-button'
      navigation.next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><path d="M14.467 10l20 15-20 15" fill="none" stroke="#fff" stroke-width="2"/></svg>'
      navigation.prev.id = 'kuvaify-prev-button'
      navigation.prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50.000001 50.000001"><path d="M35.533 10l-20 15 20 15" fill="none" stroke="#fff" stroke-width="2"/></svg>'
    },

    visibility: function (what) {
      if (what === 'depends') {
        if (nextIndex === null) {
          navigation.next.classList.remove('visible')
        } else {
          navigation.next.classList.add('visible')
        }
        if (prevIndex === null) {
          navigation.prev.classList.remove('visible')
        } else {
          navigation.prev.classList.add('visible')
        }
      }
      if (what === 'hide') {
        navigation.next.classList.remove('visible')
        navigation.prev.classList.remove('visible')
      }
    },

    getNext: function () {
      if (nextIndex !== null) {
        img.prepare(nextIndex)
      }
    },

    getPrev: function () {
      if (prevIndex !== null) {
        img.prepare(prevIndex)
      }
    },

    nextImg: function (event) {
      navigation.getNext()

      event.preventDefault()
    },

    prevImg: function (event) {
      navigation.getPrev()

      event.preventDefault()
    },

    keydown: function (event) {
      if (event.keyCode === 39) {
        navigation.getNext(event)
      }
      if (event.keyCode === 37) {
        navigation.getPrev(event)
      }
    },

    addEventListeners: function () {
      navigation.next.addEventListener('click', navigation.nextImg)
      navigation.prev.addEventListener('click', navigation.prevImg)

      window.addEventListener('keydown', navigation.keydown)
    },

    removeEventListeners: function () {
      navigation.next.removeEventListener('click', navigation.nextImg)
      navigation.prev.removeEventListener('click', navigation.prevImg)

      window.removeEventListener('keydown', navigation.keydown)
    }
  }

  var spinner = {
    element: document.createElement('div'),

    append: function () {
      spinner.element.id = 'kuvaify-spinner'
      spinner.element.innerHTML = '<div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>'
      spinner.element.style.transition = 'opacity ' + options.transitionSpeed + 'ms ease'
      overlay.element.appendChild(spinner.element)
    },

    visibility: function (what) {
      if (what === 'show') {
        spinner.element.classList.add('visible')
      }
      if (what === 'hide') {
        spinner.element.classList.remove('visible')
      }
    }
  }

  var closeDiv = {
    element: document.createElement('div'),

    append: function () {
      overlay.element.appendChild(closeDiv.element)
      closeDiv.element.id = 'kuvaify-close-div'
    },

    visibility: function (what) {
      if (what === 'show') {
        closeDiv.element.classList.add('visible')
      }
      if (what === 'hide') {
        closeDiv.element.classList.remove('visible')
      }
    },

    click: function (event) {
      close.close()

      event.preventDefault()
    },

    addEventListeners: function () {
      closeDiv.element.addEventListener('click', closeDiv.click)
    },

    removeEventListeners: function () {
      closeDiv.element.removeEventListener('click', closeDiv.click)
    }
  }

  return init
})()
