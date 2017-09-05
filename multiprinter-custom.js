const usernamePrinterEndpoint = {
  'guibruzzi@gmail.com': 'http://10.1.12.215:6060/api/vtex/pedido',
}

function setPrinter() {
  setTimeout(function() {
    const vendorState = window.flux.getStore('VendorStore').getState()
    const vendor = vendorState.toJS().vendor || {}
    const username = vendor.username
    if (username && usernamePrinterEndpoint[username]) {
      window.ORDER_PLACED_HOOK = {
        url: usernamePrinterEndpoint[username],
      }
    }
  }, 3000)
}

setPrinter()
