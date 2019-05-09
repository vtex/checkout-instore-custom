/* ADDING ITEMS (uncomment and run) */

// INSTOREQA
// window.handleBarcodeRead(4902505355769) // pilot preto
// window.handleBarcodeRead(7891360436706) // pilot verde
// window.handleBarcodeRead(4902505355776) // pilot vermelho
// window.handleBarcodeRead(7896261010222) // trimedal
// window.handleBarcodeRead(3000000000069) // Produto Automação Compras

// VTEXGAME1
// window.handleBarcodeRead("9354620758320") // power bank
// window.handleBarcodeRead("9354620758321") // power bank 2
// window.handleBarcodeRead("9354620758322") // power bank 3
// window.handleBarcodeRead("9354620758323") // power bank 4
// window.handleBarcodeRead("9354620758324") // power bank 5

// LOJAFARM
// window.handleBarcodeRead('2741106217P') // vestido amor areia curto p

// VTEXINSTOREDEV
// window.handleBarcodeRead('7891823915731') // viseira
// window.handleBarcodeRead("5019123470107") // mochila
// window.handleBarcodeRead("097855119193") // casaco

/* SIMULATE PAYMENT */

if (!window.WebViewBridge) {
  window.WebViewBridge = {
    init: function(msg) {
      console.log("WebViewJavascriptBridge init", atob(msg));
    },
    send: function(msg) {
      console.log("WebViewJavascriptBridge send", atob(msg));
    },
    onMessage: function() {}
  };
  document.dispatchEvent(new CustomEvent("WebViewBridge"));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

window.acquirerAuthorizationCode = getRandomInt(1, 1000000);

window.WebViewBridge.onMessage(
  btoa(
    JSON.stringify({
      type: "payment-transaction-finished",
      data: {
        transaction: {
          action: "payment",
          acquirerProtocol: "cappta",
          success: true,
          merchantReceipt: "Recibo Bruzzi",
          customerReceipt: "Recibo Bruzzi pro cliente",
          acquirerAuthorizationCode: window.acquirerAuthorizationCode,
          responsecode: 0,
          reason: null
        }
      }
    })
  )
);

console.log("last acquirerAuthorizationCode", window.acquirerAuthorizationCode);

/* SIMULATE REFUND */

if (!window.WebViewBridge) {
  window.WebViewBridge = {
    init: function(msg) {
      console.log("WebViewJavascriptBridge init", atob(msg));
    },
    send: function(msg) {
      console.log("WebViewJavascriptBridge send", atob(msg));
    },
    onMessage: function() {}
  };
  document.dispatchEvent(new CustomEvent("WebViewBridge"));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var refundAcquirerAuthorizationCode = getRandomInt(1, 1000000);

if (window.acquirerAuthorizationCode) {
  window.WebViewBridge.onMessage(
    btoa(
      JSON.stringify({
        type: "payment-reversal-transaction-finished",
        data: {
          transaction: {
            action: "payment-reversal",
            acquirerProtocol: "cappta",
            success: true,
            merchantReceipt: "Recibo Bruzzi estorno",
            customerReceipt: "Recibo Bruzzi estorno pro cliente",
            paymentAcquirerAuthorizationCode: window.acquirerAuthorizationCode,
            acquirerAuthorizationCode: refundAcquirerAuthorizationCode,
            amount: "2,50",
            responsecode: 0,
            reason: null
          }
        }
      })
    )
  );
  console.log(
    "last refund was made",
    window.acquirerAuthorizationCode,
    refundAcquirerAuthorizationCode
  );
}

/* i18n */

// Mudar a lingua
eventBarcode = new Event("changeLocaleMessages");
eventBarcode.data = {
  locale: "en"
};
document.dispatchEvent(eventBarcode);

// Mudar uma palavra de uma lingua
eventBarcode = new Event("changeLocaleMessages");
eventBarcode.data = {
  locale: "pt",
  messages: {
    pt: {
      clientLabel: "Bruzzi"
    }
  }
};
document.dispatchEvent(eventBarcode);
