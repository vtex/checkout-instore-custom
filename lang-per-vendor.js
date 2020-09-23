function setLang(vendor) {
  const email = vendor && vendor.username
  if (email && vendorsConfig[email] && vendorsConfig[email].locale) {
    const locale = vendorsConfig[email].locale
    eventBarcode = new Event('changeLocaleMessages')
    eventBarcode.data = {
      locale,
    }
    document.dispatchEvent(eventBarcode)
  }
}

function onVendorChange(vendor) {
  setLang(vendor)
}

document.addEventListener(
  'vendorIdentified',
  function (event) {
    onVendorChange(event && event.data && event.data.vendor)
  },
  false
)

onVendorChange(getVendor())
