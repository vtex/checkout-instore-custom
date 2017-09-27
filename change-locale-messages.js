window.LOCALE_MESSAGES = {
  locale: 'pt', // can change only language to 'en' (example)
  messages: {
    pt: {
      clientLabel: 'Revendedor(a)',
      identifyClient: 'Identificar',
      clientReceiptDisclaimer:
        'Ao identificar o representante, ele poderá receber o comprovante por email.',
      strikedPriceCurrency: 'REVENDA R$',
      sellingPriceCurrency: 'PAGUE R$',
      discountLabel: 'LUCRE R$',
      productTotalPriceCurrency: 'PAGUE R$',
      productTotalDiscountPrice: 'LUCRE R$',
      cartObservation: 'Consultora',
      cartObservationTitle: 'Consultora',
      observationNote: 'Código da consultora',
    },
  },
}

function setNewLocaleMessages() {
  const localeEvent = new Event('changeLocaleMessages')
  localeEvent.data = window.LOCALE_MESSAGES
  document.dispatchEvent(localeEvent)
}

function instoreLoaded() {
  setNewLocaleMessages()
}

document.addEventListener(
  'load.instore',
  () => setTimeout(instoreLoaded),
  false
)

if (window.inStoreIsLoaded) {
  setTimeout(instoreLoaded)
}
