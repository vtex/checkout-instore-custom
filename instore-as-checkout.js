// No lado do checkout adicionar o código abaixo em checkout-footer (sem a parte de comentários JS /* e */)
// Repare que você pode escolher o momento do redirectno trecho: if (location.href.indexOf('/checkout/#/payment') !== -1)
// E você pode escolher entre entrega em casa (isCheckedIn=false), pagamento ser pra levar na hora (isCheckedIn=true) e se cai direto pro pagamento ou outra rota (payment) na parte: ?next=payment&isCheckedIn=false

/*
<span style="visibility: hidden;">
<<SCRIPT>
function init() {
  console.log('running custom script')
  function getCookie(name) {
    var value = '; ' + document.cookie
    var parts = value.split('; ' + name + '=')
    if (parts.length == 2)
      return parts
        .pop()
        .split(';')
        .shift()
  }
  function checkIn() {
    var orderFormId = getCookie('checkout.vtex.com').replace('__ofid=', '')
    fetch(`/api/checkout/pub/orderForm/${orderFormId}/checkIn`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
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
          'openTextField'
        ],
        isCheckedIn: false
      })
    })
  }
  checkIn()
  function redirectToInstore() {
    var orderFormId = getCookie('checkout.vtex.com').replace('__ofid=', '')
    var instoreDomain = ''
    var paymentPath =
      instoreDomain + '/checkout/instore#/cart-change/' +
      orderFormId +
      '?next=payment&isCheckedIn=false'
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
//<</SCRIPT>
</span>
*/

// Em checkout-instore-custom.js

window.INSTORE_CONFIG = {
  homeUrl: 'https://vtexinstoredev.vtexcommercestable.com.br', // Define o e-commerce como inicio do fluxo
  orderPlacedUrl: 'https://vtexinstoredev.vtexcommercestable.com.br/checkout/orderPlaced/', // Define outro orderPlaced (se for entrega em casa, as vezes o ecommerce pode querer usar o order placed dele)
}
