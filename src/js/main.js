'use strict'

import kuvaify from './kuvaify'

const mykuvaify = kuvaify()
const demoButton = document.querySelector('#demo-button')
const demoLink = document.querySelector('#demo-link')

demoButton.addEventListener('click', event => {
  demoLink.click()

  event.preventDefault()
})
