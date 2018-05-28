const IP_GLOBAL = '10.1.13.81'
const IP_BRUZZI = '10.1.12.215'
const IP_ARLINDO = '200.162.48.237'

window.ORDER_PLACED_HOOK_GLOBAL = {
  url: 'http://' + IP_GLOBAL + ':6061/invoice-order',
  cancelUrl: 'http://' + IP_GLOBAL + ':6061/invoice-order',
  invoiceEndpoints: {
    Output: 'http://' + IP_GLOBAL + ':6060/api/vtex/order',
    Input: 'http://' + IP_GLOBAL + ':6060/api/vtex/cancela',
  },
  //  printImmediately: false, // If should print or not
}

window.INSTORE_CONFIG = {
  orderPlacedHook: window.ORDER_PLACED_HOOK_GLOBAL,
}

var vendorConfig = {
  'guibruzzi@gmail.com': {
    orderPlacedHook: {
      url: 'http://' + IP_BRUZZI + ':6061/invoice-order',
      cancelUrl: 'http://' + IP_BRUZZI + ':6061/invoice-order',
      invoiceEndpoints: {
        Output: 'http://' + IP_BRUZZI + ':6060/api/vtex/order',
        Input: 'http://' + IP_BRUZZI + ':6060/api/vtex/cancela',
      },
    },
  },
  'arlindorodrigues@gmail.com': {
    orderPlacedHook: {
      url: 'http://' + IP_ARLINDO + ':6061/invoice-order',
      cancelUrl: 'http://' + IP_ARLINDO + ':6061/invoice-order',
      invoiceEndpoints: {
        Output: 'http://' + IP_ARLINDO + ':6060/api/vtex/order',
        Input: 'http://' + IP_ARLINDO + ':6060/api/vtex/cancela',
      },
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
