let pushImage = function (link) {
  let img = {
    element: document.createElement('img'),
    href: link.pathname,
    smallHref: link.getAttribute('data-kuvaify-small') || null,
    mediumHref: link.getAttribute('data-kuvaify-medium') || null,
    caption: null,
    scale: 1,
    scaleRatio: this.options.zoomRatio,
    rotate: 0,
    offx: 0,
    offy: 0,
    transition: `width ${this.options.transitionSpeed}ms ease, height ${this.options.transitionSpeed}ms ease, transform ${this.options.transitionSpeed}ms ease, opacity ${this.options.transitionSpeed}ms ease, visibility ${this.options.transitionSpeed}ms ease`,
    loaded: false
  }

  img.element.style.transition = img.transition
  img.element.style.left = null
  img.element.style.top = null
  img.element.classList.add('kuvaify-img')

  if (link.getAttribute('data-kuvaify-caption')) {
    img.caption = document.createElement('div')
    img.caption.innerHTML = `<p>${link.getAttribute('data-kuvaify-caption').replace(/<[^>]+>/ig,'')}</p>`
    img.caption.className = 'kuvaify-caption'
    img.caption.style.transition = `opacity ${this.options.transitionSpeed}ms ease, visibility ${this.options.transitionSpeed}ms ease`
  }

  this.images.push(img)
}

let setCurrent = function (index) {
  let img = this.images[index]

  this.currentIndex = this.images.indexOf(img)

  if (this.images[this.currentIndex + 1]) {
    this.nextIndex = this.currentIndex + 1
  } else {
    this.nextIndex = null
  }
  if (this.images[this.currentIndex - 1]) {
    this.prevIndex = this.currentIndex - 1
  } else {
    this.prevIndex = null
  }
}

export default {
  pushImage,
  setCurrent
}