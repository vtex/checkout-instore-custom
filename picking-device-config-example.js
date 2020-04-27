window.INSTORE_CONFIG_BY_ACCOUNT = {
  lojafarmgavea: {
    printingConfig: {
      remotePrinterOptions: {
        deviceName: "Impressora Gavea", // Or don't define and it will use system default printer
      },
    },
  },
  lojafarmrdl: {
    printingConfig: {
      remotePrinterOptions: {
        deviceName: "Impressora Leblon", // Or don't define and it will use system default printer
      },
    },
  },
  lojafarmipanema: {
    printingConfig: {
      remotePrinterOptions: {
        deviceName: "Impressora Ipanema", // Or don't define and it will use system default printer
      },
    },
  },
};

window.INSTORE_CONFIG = {
  // ...
  printingConfig: {
    printByBroker: true,
  },
  accounts: window.INSTORE_CONFIG_BY_ACCOUNT,
};
