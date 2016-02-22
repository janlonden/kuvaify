'use strict'

let mykuvaify = kuvaify({
  linkElement: '#links'
})
let demoButton = document.querySelector('#demo-button')
let demoLink = document.querySelector('#demo-link')

demoButton.addEventListener('click', event => {
  demoLink.click()

  event.preventDefault()
})
