// Include corporate form with toggle link so it can be optional
window.INSTORE_CONFIG = {
  customerProfile: {
    isCorporate: {
      optional: true,
    },
  },
}

// Include corporate form as mandatory
window.INSTORE_CONFIG = {
  customerProfile: {
    isCorporate: true,
  },
}
