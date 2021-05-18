// See also `fulfillment-ip-config-example.js` and `fulfillment-device-config-example.js`

window.INSTORE_CONFIG = {
  // ...
  fulfillment: {
    enabled: true, // Allow fulfillment menu option
    features: { // Feature configs for instore fulfillment module
      shipFromStore: { // Enable ship from store order fulfillment
        enabled: true,
      },
      pickupInStore: { // Enable pickup in store order fulfillment
        enabled: true,
      },
      partialPicking: { // Enable partial picking (default true)
        enabled: true,
      },
    },
  },
}
