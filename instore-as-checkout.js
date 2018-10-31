/* Simulando o inStore as checkout no Google Chrome */
// Você deve mudar o user agent do chrome para custom e colocar o valor do user agent do inStore
// Como mudar user agent do chrome: https://winaero.com/blog/change-user-agent-chrome/
// Valor de exemplo do user agent do inStore: inStore/2.16.7 Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Mobile Safari/537.36
// Repare que no caso do redirect em qualquer lugar do carrinho, ainda assim tem que seguir até a etapa de pedir email
// Repare também que no inStore você assim que logar tem que iniciar uma nova venda pra redirecionar pro ecommerce

// Repare que nas opções abaixo: Você pode escolher entre entrega em casa (isCheckedIn=false), pagamento ser pra levar na hora (isCheckedIn=true) e se cai direto pro pagamento ou outra rota (payment) na parte: ?next=payment&isCheckedIn=false

/* Para redirecionar em qualquer parte do carrinho, colocar em checkout6-custom.js ou checkout5-custom.js */
function init() {
  console.log('Running custom script')

  function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2) {
      return parts
        .pop()
        .split(';')
        .shift();
    }
  }

  function redirectToInstore() {
    var orderFormId = getCookie('checkout.vtex.com').replace('__ofid=', '');

    /* Verifica orderFormId válido e se está rodando dentro do inStore */

    if (!orderFormId) {
      console.error('No orderFormId: ' + orderFormId);
      return;
    }

    if (navigator.userAgent.indexOf('inStore') === -1) {
      console.error('Not on inStore App (check navigator.userAgent): ' + navigator.userAgent);
      return;
    }

    /* Redirect */

    var instoreDomain = '';
    var paymentPath =
      instoreDomain + '/checkout/instore#/cart-change/' +
      orderFormId +
      '?forceIdentification=true&isCheckedIn=false'; /* Ir pro fluxo do inStore de identificação e depois entrega em casa */
    window.location.href = paymentPath;
  }

  window.addEventListener(
    'hashchange',
    () => {
      if (location.href.indexOf('#/email') !== -1) {
        // redirecionar no email se não conseguiu de primeira
        redirectToInstore();
      }
    },
    false
  );

  redirectToInstore();
}

try {
  init();
} catch (e) {
  console.error('Error on custom script', e);
}

/* Se deseja usar o inStore apenas para a etapa de pagamento colocar em checkout6-custom.js ou checkout5-custom.js */
function init() {
  console.log('Running custom script')

  function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts
        .pop()
        .split(';')
        .shift();
    }
  }

  // If need to go back to delivery to home
  // function checkIn() {
  //   var orderFormId = getCookie('checkout.vtex.com').replace('__ofid=', '')
  //   fetch(`/api/checkout/pub/orderForm/${orderFormId}/checkIn`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: 'same-origin',
  //     body: JSON.stringify({
  //       expectedOrderFormSections: [
  //         'items',
  //         'gifts',
  //         'totalizers',
  //         'clientProfileData',
  //         'shippingData',
  //         'paymentData',
  //         'sellers',
  //         'messages',
  //         'marketingData',
  //         'clientPreferencesData',
  //         'storePreferencesData',
  //         'openTextField'
  //       ],
  //       isCheckedIn: false
  //     })
  //   })
  // }
  // checkIn()

  function redirectToInstore() {
    var orderFormId = getCookie('checkout.vtex.com').replace('__ofid=', '');

    /* Verifica orderFormId válido e se está rodando dentro do inStore */

    if (!orderFormId) {
      console.error('No orderFormId: ' + orderFormId);
      return;
    }

    if (navigator.userAgent.indexOf('inStore') === -1) {
      console.error('Not on inStore App (check navigator.userAgent): ' + navigator.userAgent);
      return;
    }

    /* Redirect */

    var instoreDomain = '';
    var paymentPath =
      instoreDomain + '/checkout/instore#/cart-change/' +
      orderFormId +
      '?next=payment&isCheckedIn=false'; /* Ir pro fluxo do inStore de pagamento dentro de entrega em casa */
    window.location.href = paymentPath;
  }

  function redirectToCheckoutShipping() {
    window.location.hash = '#/shipping';
  }

  var countShipping = 0;

  window.addEventListener(
    'hashchange',
    () => {
      if (location.href.indexOf('#/shipping') !== -1) {
        // garantir que escolheu o método de entrega
        countShipping++;
      }
      if (location.href.indexOf('#/payment') !== -1) {
        // redirecionar no pagamento
        if (countShipping === 0) {
          redirectToCheckoutShipping();
        } else {
          redirectToInstore();
        }
      }
    },
    false
  );
}

try {
  if (navigator.userAgent.indexOf('inStore') !== -1) {
    init();
  }
} catch (e) {
  console.error('Error on custom script', e);
}

/* Em checkout-instore-custom.js */

window.INSTORE_CONFIG = {
  homeUrl: 'https://vtexinstoredev.vtexcommercestable.com.br', // Define o e-commerce como inicio do fluxo
  orderPlacedUrl: 'https://vtexinstoredev.vtexcommercestable.com.br/checkout/orderPlaced/', // Define outro orderPlaced (se for entrega em casa, as vezes o ecommerce pode querer usar o order placed dele)
}
