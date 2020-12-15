// You can enable by accounts (see custom-account-configuration.js) and vendors (see custom-vendor-configuration.js) also
INSTORE_CONFIG.seller = {
  allowExternalSellers: true,
}

// Example by account and vendor

var accountsConfig = {
  ceatab: {
    seller: {
      allowExternalSellers: true,
    },
  },
}

var vendorsConfig = {
  'instorevendedor@gmail.com': {
    seller: {
      allowExternalSellers: true,
    },
  },
}

window.INSTORE_CONFIG = {
  // ...
  vendors: vendorsConfig,
  accounts: accountsConfig,
  // ...
}
