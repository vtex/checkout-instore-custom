window.INSTORE_CONFIG = {
  auth: {
    showLoginAndPassword: true, // always show login and password (default: true). Set to false to hide login and password form
    showSaml: true, // always show saml if it is configured on VTEX ID (default: true). Set to false to hide any saml button option
    oAuthProviderName: 'Google', // always show oauth this oauth if it is also configured on VTEX ID (default: undefined, to not show). Set to an valid oauth provider to VTEX ID knowledge and it will show it if there is no saml login also
  },
}
