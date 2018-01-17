window.INSTORE_CONFIG = {
  salesChannel: 1, // Default salesChannel is on masterdata, this will override it
}

// Override per vendor
var vendorConfig = {
  'guibruzzi@gmail.com': {
    salesChannel: 2,
  },
  'arlindorodrigues@gmail.com': {
    salesChannel: 4,
  },
  'veruska@outlook.com': {
    salesChannel: 3,
  },
}

function setSalesChannel(vendor) {
  const email = vendor && vendor.username
  if (email && vendorConfig[email] && vendorConfig[email].salesChannel) {
    window.INSTORE_CONFIG.salesChannel = vendorConfig[email].salesChannel
  } else {
    window.INSTORE_CONFIG.salesChannel = undefined
  }
}

function getGlobalVendor() {
  const vendorState = window.flux.getStore('VendorStore').getState()
  return vendorState.toJS().vendor
}

function onVendorChange(vendor) {
  setSalesChannel(vendor)
}

document.addEventListener(
  'vendorIdentified',
  function(event) {
    const data = event.data
    const vendor = data.vendor
    onVendorChange(vendor)
  },
  false,
)

onVendorChange(getGlobalVendor())
