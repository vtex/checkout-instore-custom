// To fix login problems on old webviews like Payment hardwares with Android built in, you can force cookies from JS side with:
window.INSTORE_CONFIG = {
  // ...
  auth: {
    forceJSCookie: true, // Old webviews still needs it
  },
}
