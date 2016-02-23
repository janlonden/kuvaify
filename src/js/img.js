'use strict'

let init = function () {
  let parent = this
  let firefox = (navigator.userAgent.includes('Firefox')) ? true : false

  let img = {
    href () {
      if (parent.screenWidth < parent.options.smallSize) {
        return parent.images[parent.currentIndex].smallHref
      }
      if (parent.screenWidth < parent.options.mediumSize) {
        return parent.images[parent.currentIndex].mediumHref
      }

      return parent.images[parent.currentIndex].href
    },

    size () {
      let imgWidth = parent.images[parent.currentIndex].element.clientWidth
      let imgHeight = parent.images[parent.currentIndex].element.clientHeight
      let what

      parent.screenWidth = parent.body.clientWidth
      parent.screenHeight = parent.body.clientHeight

      if (imgWidth < parent.screenWidth && imgHeight < parent.screenHeight) {
        if (imgWidth > imgHeight) {
          what = 'cover-vertically'
        } else {
          what = 'cover-horizontally'
        }
      } else {
        if (imgWidth < parent.screenWidth) {
          what = 'cover-horizontally'
        }
        if (imgHeight < parent.screenHeight) {
          what = 'cover-vertically'
        }
      }

      parent.images[parent.currentIndex].element.classList.add(what)
    },

    visibility (what) {
      if (what === 'show') {
        parent.images[parent.currentIndex].element.classList.add('visible')

        if (parent.options.transitionScale > 0) {
          this.transform({
            scaleValue: parent.images[parent.currentIndex].scale - parent.options.transitionScale
          })
        }

        if (parent.images[parent.currentIndex].caption) {
          parent.images[parent.currentIndex].caption.classList.add('visible')
        }
      }
      if (what === 'hide') {
        parent.images[parent.currentIndex].element.classList.remove('visible')

        if (parent.images[parent.currentIndex].caption) {
          parent.images[parent.currentIndex].caption.classList.remove('visible')
        }
      }
      if (what === 'measure') {
        parent.images[parent.currentIndex].element.classList.add('measure')
      }
      if (what === 'measured') {
        parent.images[parent.currentIndex].element.classList.remove('measure')
      }
    },

    show () {
      this.visibility('measure')

      if (parent.options.transitionScale > 0) {
        this.transform({
          scaleValue: parent.images[parent.currentIndex].scale + parent.options.transitionScale
        })
      }
      if (parent.options.coverScreen) {
        this.size()
      }

      setTimeout(() => {
        this.visibility('show')

        setTimeout(() => {
          this.visibility('measured')
        }, 50)
      }, parent.options.transitionSpeed * parent.options.transitionOverlap)
    },

    prepare (index) {
      this.visibility('hide')

      parent.navigation.removeEventListeners()
      parent.setCurrent(index)
      parent.navigation.visibility('depends')

      this.addEventListeners()

      if (!parent.images[parent.currentIndex].element.src) {
        ;(index => {
          let thisIndex = index

          parent.spinner.visibility('show')
          parent.overlay.element.appendChild(parent.images[thisIndex].element)

          if (parent.images[thisIndex].caption) {
            parent.overlay.element.appendChild(parent.images[thisIndex].caption)
          }

          parent.images[thisIndex].element.src = this.href()

          parent.images[thisIndex].element.addEventListener('load', () => {
            parent.images[thisIndex].loaded = true
            parent.spinner.visibility('hide')

            setTimeout(() => {
              if (thisIndex === parent.currentIndex && !parent.closed) {
                this.show()
              }
            }, 200)
          })
        })(parent.currentIndex)
      } else {
        if (parent.images[parent.currentIndex].loaded) {
          parent.spinner.visibility('hide')

          this.show()
        } else {
          parent.spinner.visibility('show')
        }
      }
      setTimeout(() => {
        parent.navigation.addEventListeners()
      }, parent.options.transitionSpeed + 50)
    },

    transform ({ scaleValue = parent.images[parent.currentIndex].scale, rotateValue = parent.images[parent.currentIndex].rotate }) {
      parent.rotate.removeEventListeners()

      let transformString

      if (arguments.rotateValue === 0) {
        rotateValue = 0
      }

      transformString = `translate(-50%, -50%) scale(${scaleValue}) rotate(${rotateValue}deg)`

      parent.images[parent.currentIndex].scale = scaleValue
      parent.images[parent.currentIndex].rotate = rotateValue
      parent.images[parent.currentIndex].element.style.webkitTransform = transformString
      parent.images[parent.currentIndex].element.style.msTransform = transformString
      parent.images[parent.currentIndex].element.style.transform = transformString

      setTimeout(() => {
        parent.rotate.addEventListeners()
      }, parent.options.transitionSpeed / 2)
    },

    reset () {
      parent.images[parent.currentIndex].element.style.transition = parent.images[parent.currentIndex].transition + `, left ${parent.options.transitionSpeed}ms ease, top ${parent.options.transitionSpeed}ms ease`
      parent.images[parent.currentIndex].element.style.left = null
      parent.images[parent.currentIndex].element.style.top = null

      setTimeout(() => {
        parent.images[parent.currentIndex].element.style.transition = parent.images[parent.currentIndex].transition
      }, parent.options.transitionSpeed)

      this.transform({
        scaleValue: 1,
        rotateValue: 0
      })
    },

    click (event) {
      parent.menu.div.classList.remove('visible')

      event.preventDefault()
    },

    dblclick (event) {
      parent.img.reset()

      event.preventDefault()
    },

    wheel (event) {
      let delta = firefox ? event.detail : event.wheelDelta

      if ((Math.sign(delta) === 1)) {
        parent.images[parent.currentIndex].scale += parent.images[parent.currentIndex].scaleRatio
      }
      if ((Math.sign(delta) === -1)) {
        if (parent.images[parent.currentIndex].scale >= 0.4) {
          parent.images[parent.currentIndex].scale -= parent.images[parent.currentIndex].scaleRatio
        }
      }

      parent.img.transform({
        scaleValue: parent.images[parent.currentIndex].scale
      })

      event.preventDefault()
    },

    mousedown (event) {
      parent.images[parent.currentIndex].offx = event.clientX - parent.images[parent.currentIndex].element.offsetLeft
      parent.images[parent.currentIndex].offy = event.clientY - parent.images[parent.currentIndex].element.offsetTop

      window.addEventListener('mousemove', parent.img.mousemove)

      event.preventDefault()
    },

    mousemove (event) {
      let move = () => {
        parent.images[parent.currentIndex].element.style.left = event.clientX - parent.images[parent.currentIndex].offx + 'px'
        parent.images[parent.currentIndex].element.style.top = event.clientY - parent.images[parent.currentIndex].offy + 'px'
      }

      window.requestAnimationFrame(move)
    },

    mouseup (event) {
      window.removeEventListener('mousemove', parent.img.mousemove)
    },

    addEventListeners () {
      parent.images[parent.currentIndex].element.addEventListener('mousedown', this.mousedown)
      parent.images[parent.currentIndex].element.addEventListener('click', this.click)
      parent.images[parent.currentIndex].element.addEventListener('dblclick', this.dblclick)

      if (firefox) {
        window.addEventListener('DOMMouseScroll', this.wheel)
      } else {
        window.addEventListener('mousewheel', this.wheel)
      }
      window.addEventListener('mouseup', this.mouseup)

      if (parent.options.coverScreen) {
        window.addEventListener('resize', this.size)
      }
    },

    removeEventListeners () {
      parent.images[parent.currentIndex].element.removeEventListener('mousedown', this.mousedown)
      parent.images[parent.currentIndex].element.removeEventListener('click', this.click)
      parent.images[parent.currentIndex].element.removeEventListener('dblclick', this.dblclick)

      if (firefox) {
        window.removeEventListener('DOMMouseScroll', this.wheel)
      } else {
        window.removeEventListener('mousewheel', this.wheel)
      }
      window.removeEventListener('mouseup', this.mouseup)

      if (parent.options.coverScreen) {
        window.removeEventListener('resize', this.size)
      }
    }
  }

  return img
}

export default init