/* Go to Beta environment (set VTEX_APP_VERSION=beta on the URL) */

var locationParts = location.href.split('#')
var firstPart =
  locationParts[0].indexOf('?') !== -1
    ? locationParts[0]
    : `${locationParts[0]}?apiEnv=stable`
var newAddress = `${firstPart}&VTEX_APP_VERSION=beta#${locationParts[1]}`
location.href = newAddress

/* ADDING ITEMS (uncomment and run) */

// INSTORE
// window.handleBarcodeRead('7891000092606') // Lollo

// INSTOREQA
// window.handleBarcodeRead('4902505355769') // pilot preto
// window.handleBarcodeRead('7891360436706') // pilot verde
// window.handleBarcodeRead('4902505355776') // pilot vermelho
// window.handleBarcodeRead('7896261010222') // trimedal
// window.handleBarcodeRead('3000000000069') // Produto Automação Compras
// window.handleBarcodeRead('7898526152722') // Deo Colônia Eudora Soul 95ml 15272.

// VTEXGAME1
// window.handleBarcodeRead('9354620758320') // power bank
// window.handleBarcodeRead('9354620758321') // power bank 2
// window.handleBarcodeRead('9354620758322') // power bank 3
// window.handleBarcodeRead('9354620758323') // power bank 4
// window.handleBarcodeRead('9354620758324') // power bank 5

// LOJAFARM
// window.handleBarcodeRead('2741106217P')   // vestido amor areia curto p
// window.handleBarcodeRead('2794270013M')   // Top Reto Alcas Largas Preto - M
// window.handleBarcodeRead('2780031700P')   // Top Dupla Face Mix Folhagem Bahia Est Folhagem Bahia_Vermelho Pimenta - P

// VTEXINSTOREDEV
// window.handleBarcodeRead('7891823915731') // viseira
// window.handleBarcodeRead('5019123470107') // mochila
// window.handleBarcodeRead('097855119193')  // jaqueta
// window.handleBarcodeRead('7891033295159') // Trio de sabonetes
// window.handleBarcodeRead('7898526265637') // Deo Colônia Trip
// window.handleBarcodeRead('7898526152722') // Deo Colônia Eudora Soul 95ml 15272.
// window.handleBarcodeRead('7898526155327') // Loção Tônica Adstringente Eudora
// window.handleBarcodeRead('7891823915739') // ean not found

/* SIMULATE PAYMENT */

if (!window.WebViewBridge) {
  window.WebViewBridge = {
    init: function (msg) {
      console.log('WebViewJavascriptBridge init', atob(msg))
    },
    send: function (msg) {
      console.log('WebViewJavascriptBridge send', atob(msg))
    },
    onMessage: function () {},
  }
  document.dispatchEvent(new CustomEvent('WebViewBridge'))
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

window.acquirerAuthorizationCode = getRandomInt(1, 1000000)

window.WebViewBridge.onMessage(
  btoa(
    JSON.stringify({
      type: 'payment-transaction-finished',
      data: {
        transaction: {
          action: 'payment',
          acquirerProtocol: 'cappta',
          success: true,
          merchantReceipt: 'Recibo Bruzzi',
          customerReceipt: 'Recibo Bruzzi pro cliente',
          acquirerAuthorizationCode: window.acquirerAuthorizationCode,
          responsecode: 0,
          reason: null,
        },
      },
    })
  )
)

console.log('last acquirerAuthorizationCode', window.acquirerAuthorizationCode)

/* SIMULATE REFUND */

if (!window.WebViewBridge) {
  window.WebViewBridge = {
    init: function (msg) {
      console.log('WebViewJavascriptBridge init', atob(msg))
    },
    send: function (msg) {
      console.log('WebViewJavascriptBridge send', atob(msg))
    },
    onMessage: function () {},
  }
  document.dispatchEvent(new CustomEvent('WebViewBridge'))
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

var refundAcquirerAuthorizationCode = getRandomInt(1, 1000000)

if (window.acquirerAuthorizationCode) {
  window.WebViewBridge.onMessage(
    btoa(
      JSON.stringify({
        type: 'payment-reversal-transaction-finished',
        data: {
          transaction: {
            action: 'payment-reversal',
            acquirerProtocol: 'cappta',
            success: true,
            merchantReceipt: 'Recibo Bruzzi estorno',
            customerReceipt: 'Recibo Bruzzi estorno pro cliente',
            paymentAcquirerAuthorizationCode: window.acquirerAuthorizationCode,
            acquirerAuthorizationCode: refundAcquirerAuthorizationCode,
            amount: '2,50',
            responsecode: 0,
            reason: null,
          },
        },
      })
    )
  )
  console.log(
    'last refund was made',
    window.acquirerAuthorizationCode,
    refundAcquirerAuthorizationCode
  )
}

/* Simulate e-commerce Payment */

function getPaymentsPayload(
  transactionId,
  orderGroup,
  accountName,
  value,
  paymentSystem
) {
  return [
    {
      ShowConnectorResponses: false,
      allowInstallments: false,
      allowIssuer: false,
      allowNotification: false,
      currencyCode: 'BRL',
      fields: {
        cardNumber: '4282679999996010',
        holderName: 'HENRIQUE L L ROCHA        ',
      },
      id: 'd8262d5e-a624-476b-6492-c92d71353f81',
      installments: 1,
      installmentsInterestRate: 0,
      installmentsValue: value,
      isAvailable: false,
      isCustom: false,
      merchantName: accountName,
      paymentSystem: paymentSystem,
      referenceValue: value,
      requiresAuthentication: false,
      transaction: {
        id: transactionId,
        merchantName: accountName,
        reference: orderGroup,
        value: value,
      },
      value: value,
    },
  ]
}

var accountName = location.host.split('.')[0]
var callbackUrl = location.href

var orderState = getReduxStore().getState().order
var transaction = orderState.transaction
var externalPaymentIndex = orderState.externalPaymentIndex
var paymentSystem =
  transaction.paymentData.payments[externalPaymentIndex].paymentSystem
var transactionId = transaction.id
var orderGroup = transaction.gatewayCallbackTemplatePath.split('/')[3]
var value = transaction.value

var payments = getPaymentsPayload(
  transactionId,
  orderGroup,
  accountName,
  value,
  paymentSystem
)

var publicAccess = true

var promise = Promise.resolve()
promise = vtexInstore.fetchers.GatewayFetcher.sendGatewayPayments(
  transactionId,
  payments,
  accountName,
  callbackUrl,
  publicAccess
)

if (!window.WebViewBridge) {
  window.WebViewBridge = {
    init: function (msg) {
      console.log('WebViewJavascriptBridge init', atob(msg))
    },
    send: function (msg) {
      console.log('WebViewJavascriptBridge send', atob(msg))
    },
    onMessage: function () {},
  }
  document.dispatchEvent(new CustomEvent('WebViewBridge'))
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

window.acquirerAuthorizationCode = getRandomInt(1, 1000000)

function callAppLinking() {
  window.WebViewBridge.onMessage(
    btoa(
      JSON.stringify({
        type: 'payment-transaction-finished',
        data: {
          transaction: {
            action: 'payment',
            acquirerProtocol: 'vtex-payment',
            success: true,
            merchantReceipt: '',
            customerReceipt: '',
            acquirerAuthorizationCode: window.acquirerAuthorizationCode,
            responsecode: 0,
            reason: null,
          },
        },
      })
    )
  )
}

promise
  .then(() => {
    callAppLinking()
  })
  .catch((err) => {
    console.error('Error on send payments request', err)
    callAppLinking()
  })

console.log('last acquirerAuthorizationCode', window.acquirerAuthorizationCode)

/* i18n */

// Change language
eventBarcode = new Event('changeLocaleMessages')
eventBarcode.data = {
  locale: 'en',
}
document.dispatchEvent(eventBarcode)

// Change a word in a language
eventBarcode = new Event('changeLocaleMessages')
eventBarcode.data = {
  locale: 'pt',
  messages: {
    pt: {
      clientLabel: 'Bruzzi',
    },
  },
}
document.dispatchEvent(eventBarcode)

/* Add device in Chrome */

const deviceId = 'bruzzi-mac-vtex'
window.vtexInstore.devices.setDeviceId(deviceId)
