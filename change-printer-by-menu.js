var IP1 = '192.168.0.111'
var IP2 = '200.162.48.237'

var defaultPrinter = 1

var myPrinters = [
  {
    label: 'Impressora 1',
    hook: {
      url: 'http://' + IP1 + ':6061/invoice-order',
      cancelUrl: 'http://' + IP1 + ':6061/invoice-order',
      invoiceEndpoints: {
        Output: 'http://' + IP1 + ':6060/api/vtex/order',
        Input: 'http://' + IP1 + ':6060/api/vtex/cancela',
      },
    },
  },
  {
    label: 'Impressora 2',
    hook: {
      url: 'http://' + IP2 + ':6061/invoice-order',
      cancelUrl: 'http://' + IP2 + ':6061/invoice-order',
      invoiceEndpoints: {
        Output: 'http://' + IP2 + ':6060/api/vtex/order',
        Input: 'http://' + IP2 + ':6060/api/vtex/cancela',
      },
    },
  },
]

function getPrinterIndex() {
  try {
    var index = localStorage.getItem('MY_PRINTER')
    if (!index) {
      return index
    }
    return parseInt(index, 10)
  } catch (e) {
    console.error('Error on Get Printer')
  }
  return null
}

function getPrinter() {
  try {
    var index = getPrinterIndex()
    if (index !== null && typeof index !== 'undefined') {
      var printerConfig = myPrinters[index]
      if (printerConfig && printerConfig.hook) {
        return printerConfig
      }
    }
    return localStorage.getItem('MY_PRINTER')
  } catch (e) {
    console.error('Error on Get Printer')
  }
  return null
}

var initialGlobalPrinter = getPrinter() || myPrinters[defaultPrinter]

window.ORDER_PLACED_HOOK_GLOBAL = initialGlobalPrinter.hook

window.INSTORE_CONFIG = {
  orderPlacedHook: window.ORDER_PLACED_HOOK_GLOBAL,
}

var vendorConfig = {
  'guibruzzi@gmail.com': {
    orderPlacedHook: myPrinters[0].hook,
  },
  'arlindorodrigues@gmail.com': {
    orderPlacedHook: myPrinters[1].hook,
  },
}

function setPrinter(vendor) {
  const email = vendor && vendor.username
  if (email && vendorConfig[email] && vendorConfig[email].orderPlacedHook) {
    window.INSTORE_CONFIG.orderPlacedHook = vendorConfig[email].orderPlacedHook
  } else {
    window.INSTORE_CONFIG.orderPlacedHook = window.ORDER_PLACED_HOOK_GLOBAL
  }
  const globalPrinter = getPrinter()
  if (globalPrinter) {
    window.INSTORE_CONFIG.orderPlacedHook = globalPrinter.hook
  }
}

var printerChangeLink = {
  title: initialGlobalPrinter.label,
  useCustomHandler: true,
  handleClick: function () {
    console.log('Custom handle click received')
    try {
      var currentPrinter = getPrinter() || initialGlobalPrinter
      if (currentPrinter && currentPrinter.label) {
        var index = getPrinterIndex() || defaultPrinter
        if (typeof index === 'number') {
          var newIndex = 1 - index
          localStorage.setItem('MY_PRINTER', newIndex.toString())
          console.log(
            'printerChangeLink newIndex and newPrinter',
            newIndex,
            getPrinter()
          )
          window.location.reload()
        }
      }
    } catch (e) {
      console.error('Error on change current printer', e)
    }
  },
}

var clearPrinterLink = {
  title: 'Limpar impressora',
  useCustomHandler: true,
  handleClick: function () {
    console.log('Custom handle click received')
    try {
      localStorage.removeItem('MY_PRINTER')
      window.location.reload()
    } catch (e) {
      console.error('Error on change current printer', e)
    }
  },
}

function addCustomLinkToInStore() {
  var eventLink = new Event('addCustomLink.instore')
  eventLink.detail = [printerChangeLink, clearPrinterLink]

  window.dispatchEvent(eventLink)
}

addCustomLinkToInStore()

function onVendorChange(vendor) {
  setPrinter(vendor)
}

document.addEventListener(
  'vendorIdentified',
  function (event) {
    const data = event.data
    const vendor = data.vendor
    onVendorChange(vendor)
  },
  false
)

onVendorChange(getVendor())
