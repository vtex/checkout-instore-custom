window.ORDER_PLACED_HOOK_GLOBAL = {
  url: 'http://10.1.13.159:6060/api/vtex/pedido', // Notebook teste do inStore
}

window.INSTORE_CONFIG = {
  orderPlacedHook: window.ORDER_PLACED_HOOK_GLOBAL,
}

var vendorConfig = {
  'guibruzzi@gmail.com': {
    orderPlacedHook: {
      url: 'http://10.1.12.215:6060/api/vtex/pedido',
    },
  },
  'arlindorodrigues@gmail.com': {
    orderPlacedHook: {
      url: 'http://200.162.48.237:6060/api/vtex/pedido',
    },
  },
}

function setPrinter(vendor) {
  const email = vendor && vendor.username
  if (email && vendorConfig[email] && vendorConfig[email].orderPlacedHook) {
    window.INSTORE_CONFIG.orderPlacedHook = vendorConfig[email].orderPlacedHook
  } else {
    window.INSTORE_CONFIG.orderPlacedHook = window.ORDER_PLACED_HOOK_GLOBAL
  }
}

function getGlobalVendor() {
  const vendorState = window.flux.getStore('VendorStore').getState()
  return vendorState.toJS().vendor
}

function onVendorChange(vendor) {
  setPrinter(vendor)
}

document.addEventListener(
  'vendorIdentified',
  function(event) {
    const data = event.data
    const vendor = data.vendor
    onVendorChange(vendor)
  },
  false
)

onVendorChange(getGlobalVendor())
