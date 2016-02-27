'use strict'

import setup from './setup'
import overlay from './overlay'
import img from './img'
import close from './close'
import menu from './menu'
import reset from './reset'
import zoom from './zoom'
import rotate from './rotate'
import navigation from './navigation'
import spinner from './spinner'
import closeDiv from './close-div'
import prototype from './prototype'

let kuvaify = function (settings = {}) {
  this.images = []
  this.currentIndex = null
  this.nextIndex = null
  this.prevIndex = null
  this.oldIndex = null
  this.body = document.body
  this.screenWidth = this.body.clientWidth
  this.screenHeight = this.body.clientHeight
  this.closed = false
  this.systemsReady = false
  this.options = setup.opt(settings)
  this.links = setup.links.call(this)

  this.overlay = overlay.call(this)
  this.closeDiv = closeDiv.call(this)
  this.img = img.call(this)
  this.close = close.call(this)
  this.menu = menu.call(this)
  this.reset = reset.call(this)
  this.zoom = zoom.call(this)
  this.rotate = rotate.call(this)
  this.navigation = navigation.call(this)
  this.spinner = spinner.call(this)
}

kuvaify.prototype.pushImage = prototype.pushImage
kuvaify.prototype.setCurrent = prototype.setCurrent

let init = settings => {
  new kuvaify(settings)
}

window.kuvaify = init