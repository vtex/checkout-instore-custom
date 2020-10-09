// You can have configuration and name your sellers with the following config:
window.INSTORE_CONFIG_BY_ACCOUNT = {
  lojabruzzi: {
    name: 'Bruzzi',
    orderPlacedHook: window.ORDER_PLACED_HOOK_GLOBAL,
  },
  lojadarlene: {
    name: 'Darlene',
  },
  vtexinstoredev: {
    name: 'E-Commerce',
  },
}

window.INSTORE_CONFIG = {
  // ...
  accounts: window.INSTORE_CONFIG_BY_ACCOUNT,
}
