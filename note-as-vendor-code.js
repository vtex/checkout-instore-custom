// This config enables salespeople to mandatory insert a code identifying them on the sale, so they don't forget about it
// When any of these settings are defined, this feature becomes enabled
// type: the input component type
//   'text': textarea
//   'textarea': textarea
//   'input': a simple input
// skipValidation: define if the masterdata validation should be skipped. By default, the inStore does the validation.
//   true: skip validation
//   false: run validation
// mask: a string field with an regular expression to validate the input content before to proceed
window.INSTORE_CONFIG = {
  noteAsVendorCode: {
    type: 'input',
    skipValidation: true,
    mask: '^(HE|TU)[A-Za-z0-9]{5,8}$', // Example
  },
}
