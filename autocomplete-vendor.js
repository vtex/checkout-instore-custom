;(function() {
  console.log('auto-complete vendor login customization')
  var isLoaded = false
  function onload() {
    if (!isLoaded) {
      customizeAuthentication()
      isLoaded = true
    }
  }
  function customizeAuthentication() {
    function autocompleteVendor() {
      var emailInput = document.querySelector('#loginform-email')
      if (emailInput) {
        emailInput.value = 'cantina.vtex@gmail.com'
        emailInput.dispatchEvent(
          new Event('input', { target: emailInput, bubbles: true })
        )
      }
      var passwordInput = document.querySelector('#loginform-password')
      if (passwordInput) {
        passwordInput.value = 'Abcd1234'
        passwordInput.dispatchEvent(
          new Event('input', { target: passwordInput, bubbles: true })
        )
      }
    }
    document.addEventListener(
      'path.updated',
      function(e) {
        setTimeout(function() {
          var path = e.data.path
          if (path === 'vendor/login') {
            autocompleteVendor(path)
          }
        }, 0)
      },
      false
    )
    autocompleteVendor()
  }
  document.addEventListener('load.instore', onload)
  onload()
})()
