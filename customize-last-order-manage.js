window.INSTORE_CONFIG.customerOpenOrderLink = {
  useCustomHandler: true,
  handleClick: function(params) {
    console.log('Custom handle click received', params)

    var href = params.href

    if (!href) {
      console.log('Not valid href to find orderId: ' + href)
      return
    }

    var orderId = href.split('orders/')[1]
    orderId = orderId.split('&')[0]
    if (!orderId) {
      console.log('Not valid orderId: ' + orderId)
      return
    }

    var myOrdersUrl = '/account/orders#/' + orderId

    console.log('Redirecting to: ' + myOrdersUrl)

    window.location.href = myOrdersUrl
  },
}
