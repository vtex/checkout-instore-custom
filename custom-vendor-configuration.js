// Instore can have a different configuration for each vendor
// All instore_config can be replaced by the vendor config
// Follows an example where the payment methods and the topBarTitle are replaced for instorevendor@gmail.com

window.INSTORE_CONFIG = {
  vendors: {
    'instorevendedor@gmail.com': {
      topbarTitle: 'myVendor',
      payments: {
        filters: [
          '45', // Cartão de crédito
          '201', // Dinheiro
        ],
      },
    },
  },
}
