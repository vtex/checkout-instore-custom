// To make instore create an id for anonymous users and allowing Falco to attach photos to these new users
// Insert on checkout-instore-custom.js
window.INSTORE_CONFIG = {
  // ...
  MasterDataConfig: {
    registerAnonymousUsers: true,
  },
}
