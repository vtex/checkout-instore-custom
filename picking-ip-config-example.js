// To configure invoice notifier to allow Picking invoices: https://docs.google.com/document/d/1w8UYTs1m3SH2uWcXduP75d96txjMuA9uokYnKcgPFxk/edit

// The following configurations are to print the order invoices

window.INSTORE_CONFIG_BY_ACCOUNT = {
  lojafarmgavea: {
    deviceConfig: {
      endpoint: "http://IP_DA_GAVEA:6061",
    },
    printingConfig: {
      remotePrinterOptions: {
        deviceName: "Impressora gavea", // Or don't define and it will use system default printer
      },
    },
  },
  lojafarmrdl: {
    deviceConfig: {
      endpoint: "http://IP_DO_LEBLON:6061",
    },
    printingConfig: {
      remotePrinterOptions: {
        deviceName: "Impressora leblon", // Or don't define and it will use system default printer
      },
    },
  },
  lojafarmipanema: {
    deviceConfig: {
      endpoint: "http://IP_DE_IPANEMA:6061",
    },
    printingConfig: {
      remotePrinterOptions: {
        deviceName: "Impressora ipanema", // Or don't define and it will use system default printer
      },
    },
  },
};

window.INSTORE_CONFIG = {
  // ...
  picking: true, // Allow to show picking option on menu
  deviceConfig: {
    endpoint: "http://localhost:6061",
  },
  printingConfig: {
    remotePrinterOptions: {
      deviceName: "PDFwriter",
    },
  },
  accounts: window.INSTORE_CONFIG_BY_ACCOUNT,
};
