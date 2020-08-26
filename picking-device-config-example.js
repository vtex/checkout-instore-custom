// To configure invoice notifier to allow Picking invoices: https://docs.google.com/document/d/1w8UYTs1m3SH2uWcXduP75d96txjMuA9uokYnKcgPFxk/edit

// The following configurations are to print the order invoices

window.INSTORE_CONFIG_BY_ACCOUNT = {
  lojafarmgavea: {
    printingConfig: {
      remotePrinterOptions: {
        deviceName: 'Impressora Gavea', // Or don't define and it will use system default printer
      },
    },
  },
  lojafarmrdl: {
    printingConfig: {
      remotePrinterOptions: {
        deviceName: 'Impressora Leblon', // Or don't define and it will use system default printer
      },
    },
  },
  lojafarmipanema: {
    printingConfig: {
      remotePrinterOptions: {
        deviceName: 'Impressora Ipanema', // Or don't define and it will use system default printer
      },
    },
  },
}

window.INSTORE_CONFIG = {
  // ...
  picking: true, // Allow to show picking option on menu
  printingConfig: {
    printByBroker: true,
  },
  accounts: window.INSTORE_CONFIG_BY_ACCOUNT,
}
