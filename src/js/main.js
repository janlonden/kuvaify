var mykuvaify = kuvaify({
  linkElement: '#links'
})

var demoButton = document.querySelector('#demo-button')
var demoLink = document.querySelector('#demo-link')

demoButton.addEventListener('click', function (event) {
  demoLink.click()

  event.preventDefault()
})