// This config enables the use of the new payment architecture in the inStore.
// To enable it, set the "newPaymentArchitectureEnabled" property to true.

// In addition, it is also required to implement the "getNewPaymentArchitectureExecute" function.
// The payment flow will not work if the function is not well implemented.

// Here is an example of the function in the "vtexinstoredev" account. Altough it receives the "account" parameter
// the appkey and apptoken are constant, thus being a function specific to the "vtexinstoredev".
function getNewPaymentArchitectureExecute({ account, paymentSystem }) {
  const paymentType =
    paymentSystem === 45 ? 'credit' : paymentSystem === 44 ? 'debit' : ''
  return {
    callbackUrl: `https://${account}.vtexpayments.com.br:443/api/pub/instore/{paymentId}/callback`,
    mobileLinkingUrl: `vtex-payment://payment?action=payment&installmentsInterestRate={installmentsInterestRate}&merchantName={sellerName}&installments={installments}&paymentType=${paymentType}&amount={amount}&paymentId={paymentId}&transactionId={transactionId}&appKey=d60c7397d4b143abaaae2cf76a19ce16_0618f8f90a234b988dcf2ad1cd4e3206&appToken=f3d93325bf8b73ee6e09bff258e60907479294ba83eb5618c3f88ef9860ba3f56532ad72862d5dcfc9349150e614ebde4f81ef58a70a5f7fa5133e18a5a2ae65&shouldNotifyConnector=true`,
  }
}

// The "getNewPaymentArchitectureExecute" should be added in the "payments" property of the instore config.
// Here is an example of a INSTORE_CONFIG with the new payment architecture enabled.
window.INSTORE_CONFIG = {
  payments: { getNewPaymentArchitectureExecute },
  newPaymentArchitectureEnabled: true,
}
