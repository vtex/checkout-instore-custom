window.PAYMENTS_FILTER_GLOBAL = {
  filters: [
    '16', // Vale presente
    '44', // Cartão de débito
    '45', // Cartão de crédito
    '64', // Credit Control
    '201', // Dinheiro
  ],
  removeFilters: [],
}

window.INSTORE_CONFIG = {
  payments: window.PAYMENTS_FILTER_GLOBAL,
}

const vendorConfig = {
  'guibruzzi@gmail.com': {
    // No money or credit on this vendor
    payments: {
      removeFilters: [
        '64', // Credit Control
        '201', // Dinheiro
      ],
    },
  },
}

function hasVendorConfig(vendor) {
  const email = vendor && vendor.username
  return (
    email &&
    vendorConfig[email] &&
    vendorConfig[email].payments &&
    (vendorConfig[email].payments.filters ||
      vendorConfig[email].payments.removeFilters)
  )
}

function setPaymentsFilter(vendor) {
  const email = vendor && vendor.username
  if (hasVendorConfig(vendor)) {
    const pFilters = vendorConfig[email].payments
    if (pFilters.filters) {
      window.INSTORE_CONFIG.payments.filters = pFilters.filters
    }
    if (pFilters.removeFilters) {
      window.INSTORE_CONFIG.payments.removeFilters = pFilters.removeFilters
    }
  } else {
    window.INSTORE_CONFIG.payments = window.PAYMENTS_FILTER_GLOBAL
  }
}

function getGlobalVendor() {
  const vendorState = window.flux.getStore('VendorStore').getState()
  return vendorState.toJS().vendor
}

function onVendorChange(vendor) {
  setPaymentsFilter(vendor)
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
