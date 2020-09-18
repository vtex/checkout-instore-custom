// You can add extra params to applinking on one account by editing its checkout-instore-custom.js and add the following:
window.INSTORE_CONFIG = {
  // ...
  applinkingPayloadExtraFields: {
    skipReceipt: 'true', // this param will be passed with the normal applinking params
  },
}
