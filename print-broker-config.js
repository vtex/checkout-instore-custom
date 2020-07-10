window.ORDER_PLACED_HOOK_GLOBAL = {
  url: "http://localhost:6061/invoice-order",
  cancelUrl: "http://localhost:6061/invoice-order",
  invoiceEndpoints: {
    Output: "http://localhost:PORT/pathToInvoice", // this port and path is configured based on the invoicer program
    Input: "http://localhost:PORT/pathToInputInvoice", // this port and path is configured based on the invoicer program
  },
};

window.INSTORE_CONFIG = {
  // ...
  orderPlacedHook: window.ORDER_PLACED_HOOK_GLOBAL,
  printingConfig: {
    printByBroker: true,
  },
  configureDeviceEnabled: true,
};
