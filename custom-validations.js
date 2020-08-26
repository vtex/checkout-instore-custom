window.INSTORE_CONFIG = {
  salesChannel: 13,
  customerValidationRules: {
    params: {
      _fields: 'flagCessado,MotivoBloqueio,DataInicioCiclo,email',
    },
    expectedResult: {
      flagCessado: false,
      MotivoBloqueio: null,
    },
    customError:
      'Representante está com pendência e deve entrar em contato com a supervisora',
  },
  cartMinimumValue: 10493,
}

window.cartStatus = {
  get: function () {
    if (this.currentCartStatus !== undefined) {
      return this.currentCartStatus
    }

    const orderForm = getOrderForm()
    return handleCustomerValidations(orderForm).then(
      () => this.currentCartStatus
    )
  },

  set: function (valid) {
    this.currentCartStatus = valid
  },
}

function formatAmount(amount) {
  return (amount / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

function getCartMinimumValueDiff() {
  const orderFormValue = getOrderForm().value
  const diff = window.INSTORE_CONFIG.cartMinimumValue - orderFormValue
  if (diff > 0) {
    return diff
  }
  return 0
}

function generateInvalidCartMessage() {
  const amount = getCartMinimumValueDiff()
  return `Ainda faltam R$ ${formatAmount(
    amount
  )} para alcançar o valor mínimo da compra`
}

function dispatchCartValidation(isValid) {
  const cartValidationEvent = new Event('cart.validated')
  cartValidationEvent.data = {
    error: !isValid,
    errorMessage: isValid ? undefined : generateInvalidCartMessage(),
  }
  document.dispatchEvent(cartValidationEvent)
}

function handleCartValidations() {
  const valid = window.cartStatus.get()
  dispatchCartValidation(valid)
  return valid
}

function setCartStatus(valid) {
  window.cartStatus.set(valid)
  return valid
}

function hasValidCampaigns(campaigns) {
  return campaigns.some((c) => c.name === 'CARRINHOLIBERADO')
}

function handleResponse(data) {
  if (data && data.status === 200) {
    return data.json()
  }
  return []
}

function getMatchCampaigns(clientResult) {
  if (!clientResult) {
    return []
  }

  const payload = {
    id: null,
    isShoppingCart: true,
    origin: 'Marketplace',
    profileId: null,
    email: clientResult.email,
    salesChannel: window.INSTORE_CONFIG.salesChannel,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utmi_campaign: null,
    forcePurchasedHistoryFrom: clientResult.DataInicioCiclo,
    forcePurchasedHistoryTo: new Date().toISOString(),
    params: [],
  }

  return fetch('/api/rnb/pub/match-campaigns', {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(payload),
  }).then(handleResponse)
}

function isValidCustomerCart(clientResult) {
  return getMatchCampaigns(clientResult)
    .then(hasValidCampaigns)
    .then(setCartStatus)
    .then(handleCartValidations)
}

function resultMatcher(expectedResult, result) {
  for (const i in expectedResult) {
    if (expectedResult[i] !== result[i]) {
      return false
    }
  }
  return true
}

function dispatchCustomerError(rules) {
  const customerErrorEvent = new Event('showModal.error')
  customerErrorEvent.data = {
    errorTitle: 'Cliente Bloqueado',
    error: {
      customMessage: rules.customError,
    },
  }
  document.dispatchEvent(customerErrorEvent)
  return Promise.resolve()
}

function isValidCustomer(clientResult) {
  const rules = window.INSTORE_CONFIG.customerValidationRules
  if (!clientResult) {
    return dispatchCustomerError(rules)
  }

  const expectedResult = rules.expectedResult
  const match = resultMatcher(expectedResult, clientResult)
  if (match) {
    return clientResult
  }
  return dispatchCustomerError(rules)
}

function handleCustomerValidations(data) {
  const clientData = data.clientProfileData
  const rules = window.INSTORE_CONFIG.customerValidationRules
  rules.params._where = `email=${clientData.email}`

  return window.vtexInstore
    .getClient(clientData.email, rules.params)
    .then(isValidCustomer)
    .then(isValidCustomerCart)
}

document.addEventListener(
  'clientProfile.updated',
  (e) => handleCustomerValidations(e.data),
  false
)

document.addEventListener('cart.change', handleCartValidations, false)
