var customerClusters = [{ label: 'Cliente VIP' }, { label: 'Multi Plus' }]

var customerCustomCard = {
  title: 'Descontos do cliente',
  data: [
    {
      tags: [{ text: 'Cliente VIP' }],
      contents: [
        { text: 'COMPRE JUNTO: COMPRE DUAS COM 10% DE DESCONTO' },
        { text: 'até 26/05/2018' },
      ],
    },
    {
      tags: [{ text: 'Multi Plus' }],
      contents: [
        { text: 'BODIES: 2 COM 15%, 3 COM 20% E 4 COM 25%' },
        { text: 'até 26/05/2018' },
      ],
    },
  ],
}

window.INSTORE_CONFIG = {
  // ...
  customerClusters: customerClusters,
  customerCustomCard: customerCustomCard,
}
