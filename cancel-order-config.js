window.INSTORE_CONFIG = {
  cancelOrderConfig: {
    saveFiscalNote: false, // if inStore client should save the xml on master data and OMS (inStore middleware should do it)
    cancelOMSOrder: false, // if inStore client should make a cancel request to OMS (this should not be necessary on normal cenarius)
  },
}
