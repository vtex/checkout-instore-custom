window.INSTORE_CONFIG = {
  customerValidationRules: {
    params: {
      _fields: 'flagCessado,MotivoBloqueio'
    },
    expectedResult: {
      "flagCessado": false,
      "MotivoBloqueio": null,
    },
    customError: 'Representante está com pendência e deve entrar em contato com a supervisora',
  }
}

function resultMatcher(expectedResult, result) {
  for (let i in expectedResult) {
    if (expectedResult[i] !== result[i]) {
      return false
    }
  }
  return true
}

function dispatchCustomerError(rules) {
  customerErrorEvent = new Event('showModal.error')
  customerErrorEvent.data = {
    errorTitle: 'Cliente Bloqueado',
    error: {
      customMessage: rules.customError,
    }
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
  resultMatcher(expectedResult, clientResult)
  .then((isValid) => {
    if (isValid) {
      return clientResult
    }
    return dispatchCustomerError(rules)
  })
}

function handleCustomerValidations(data) {
  const clientData = data.clientProfileData
  const rules = window.INSTORE_CONFIG.customerValidationRules
  rules.params._where = `email=${clientData.email}`

  window.vtexInstore.getClient(clientData.email, rules.params)
  .then(isValidCustomer)
}

document.addEventListener(
  'clientProfile.updated',
  (e) => handleCustomerValidations(e.data),
  false
)