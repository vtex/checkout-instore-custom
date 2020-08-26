function setCustomerIdentification(email) {
  var customEvent = window.document.createEvent('Event')
  customEvent.data = { email: email }
  customEvent.initEvent('setCustomerIdentification', true, true)
  window.document.dispatchEvent(customEvent)
}

function customizeCustomerIdentification() {
  console.log('Ready to customize inStore customer identification')
  // Do any request with global `fetch` or any global listening that needs and then call setCustomerIdentification(email)
}

if (window.customizeCustomerIdentification) {
  customizeCustomerIdentification()
}

document.addEventListener(
  'customizeCustomerIdentification',
  customizeCustomerIdentification,
  false
)
