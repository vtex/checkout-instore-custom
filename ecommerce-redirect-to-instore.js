function init() {
  console.log('running custom script')
  function getCookie(name) {
    var value = '; ' + document.cookie
    var parts = value.split('; ' + name + '=')
    if (parts.length === 2) {
      return parts
        .pop()
        .split(';')
        .shift()
    }
  }
  function checkIn() {
    var orderFormId = getCookie('checkout.vtex.com').replace('__ofid=', '')
    fetch(`/api/checkout/pub/orderForm/${orderFormId}/checkIn`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        expectedOrderFormSections: [
          'items',
          'gifts',
          'totalizers',
          'clientProfileData',
          'shippingData',
          'paymentData',
          'sellers',
          'messages',
          'marketingData',
          'clientPreferencesData',
          'storePreferencesData',
          'openTextField',
        ],
        isCheckedIn: false,
      }),
    })
  }
  checkIn()
  function redirectToInstore() {
    var orderFormId = getCookie('checkout.vtex.com').replace('__ofid=', '')
    var paymentPath =
      'https://vtexinstoredev.vtexcommercebeta.com.br/checkout/instore#/cart-change/' +
      orderFormId +
      '?next=payment&isCheckedIn=false' /* preencher no smartcheckout e só pagar no inStore, isCheckedIn=true|false define se a compra é pra loja física ou pra entrega em casa */
    window.location.href = paymentPath
  }
  window.addEventListener(
    'hashchange',
    () => {
      if (location.href.indexOf('/checkout/#/payment') !== -1) {
        // redirecionar no pagamento
        redirectToInstore()
      }
    },
    false
  )
  window.checkIn = checkIn
}
try {
  init()
} catch (e) {
  console.error('error on custom script', e)
}
