window.ORDER_PLACED_HOOK = window.ORDER_PLACED_HOOK_GLOBAL = {
  url: 'http://10.1.13.159:6060/api/vtex/pedido', // Notebook teste do inStore
}

const usernamePrinterEndpoint = {
  'guibruzzi@gmail.com': 'http://10.1.12.215:6060/api/vtex/pedido',
  'arlindorodrigues@gmail.com': 'http://200.162.48.237:6060/api/vtex/pedido',
}

function setPrinter(vendor) {
  const email = vendor && vendor.username
  if (email && usernamePrinterEndpoint[email]) {
    window.ORDER_PLACED_HOOK = {
      url: usernamePrinterEndpoint[email],
    }
  } else {
    window.ORDER_PLACED_HOOK = window.ORDER_PLACED_HOOK_GLOBAL
  }
}

function getGlobalVendor() {
  const vendorState = window.flux.getStore('VendorStore').getState()
  return vendorState.toJS().vendor
}

document.addEventListener(
  'vendorIdentified',
  function(event) {
    const data = event.data
    const vendor = data.vendor
    setPrinter(vendor)
  },
  false
)

setPrinter(getGlobalVendor())
