// No lado do checkout adicionar o código abaixo em checkout-footer (sem a parte de comentários JS /* e */)
// Repare que você pode escolher o momento do redirectno trecho: if (location.href.indexOf('/checkout/#/payment') !== -1)
// E você pode escolher entre entrega em casa (isCheckedIn=false), pagamento ser pra levar na hora (isCheckedIn=true) e se cai direto pro pagamento ou outra rota (payment) na parte: ?next=payment&isCheckedIn=false

// Se deseja usar o inStore apenas para a etapa de pagamento colocar em checkout-footer:
<span style="visibility: hidden;">
<<SCRIPT>
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

      if (!window.WebViewBridge) {
        console.error('Not on inStore App (check window.WebViewBridge): ' + window.WebViewBridge);
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
        if (location.href.indexOf('/checkout/#/shipping') !== -1) {
          // garantir que escolheu o método de entrega
          countShipping++;
        }
        if (location.href.indexOf('/checkout/#/payment') !== -1) {
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
    init();
  } catch (e) {
    console.error('Error on custom script', e);
  }
//<</SCRIPT>
</span>

// Para redirecionar em qualquer parte do carrinho, colocar no checkout-footer:
<span style="visibility: hidden;">
<<SCRIPT>
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

      if (!window.WebViewBridge) {
        console.error('Not on inStore App (check window.WebViewBridge): ' + window.WebViewBridge);
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
//<</SCRIPT>
</span>

// Em checkout-instore-custom.js

window.INSTORE_CONFIG = {
  homeUrl: 'https://vtexinstoredev.vtexcommercestable.com.br', // Define o e-commerce como inicio do fluxo
  orderPlacedUrl: 'https://vtexinstoredev.vtexcommercestable.com.br/checkout/orderPlaced/', // Define outro orderPlaced (se for entrega em casa, as vezes o ecommerce pode querer usar o order placed dele)
}
