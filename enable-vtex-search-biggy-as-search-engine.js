// You can enable by accounts (see custom-account-configuration.js) and vendors (see custom-vendor-configuration.js) also
window.INSTORE_CONFIG = {
  search: {
    vtexSearch: true,
  },
}

// Example by account and vendor

var accountsConfig = {
  ceatab: {
    search: {
      vtexSearch: true,
    },
  },
}

var vendorsConfig = {
  'instorevendedor@gmail.com': {
    search: {
      vtexSearch: true,
    },
  },
}

window.INSTORE_CONFIG = {
  // ...
  vendors: vendorsConfig,
  accounts: accountsConfig,
  // ...
}
