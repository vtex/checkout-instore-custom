// The following configuration enable printing on remote servers that the customer will handle the request and take care of the print

window.INSTORE_CONFIG = {
  // ...
  printingConfig: {
    remoteLabelUrl: 'https://...', // Here you put a custom URL only for Label of the packing step
    remoteInvoiceUrl: 'https://...', // Here for invoice
    remoteAuthorizationToken: '', // Here you can pass a authorization header if the customer wants that
  },
}
