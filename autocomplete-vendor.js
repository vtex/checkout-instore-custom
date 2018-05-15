;(function() {
  var LOGIN = 'instorevendedor@gmail.com'
  var PASSWORD = '<SENHA ISNTORE VENDEDOR>'
  var userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.indexOf(' electron/') !== -1) {
    LOGIN = 'cantina.vtex@gmail.com'
    PASSWORD = '<SENHA CANTINA>'
  }
  var isLoaded = false
  function onload() {
    if (!isLoaded) {
      customizeAuthentication()
      isLoaded = true
    }
  }
  function customizeAuthentication() {
    function autocompleteVendor() {
      var customEvent = window.document.createEvent('Event')
      customEvent.data = {
        email: LOGIN,
        password: PASSWORD,
        shouldAutoSubmit: false,
      }
      customEvent.initEvent('vendor.autologin', true, true)
      window.document.dispatchEvent(customEvent)
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
