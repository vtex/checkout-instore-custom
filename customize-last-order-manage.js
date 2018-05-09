function setCookie(key, value, expires, path, domain, secure) {
  path = path || '/'
  if (!key || !value) return false
  if (!key || /^(?:expires|max-age|path|domain|secure)$/.test(key)) {
    return
  }

  var sExpires = ''
  if (expires) {
    switch (typeof expires) {
      case 'number':
        sExpires = `; max-age=${expires}`
        break
      case 'string':
        sExpires = `; expires=${expires}`
        break
      case 'object':
        if (expires.hasOwnProperty('toGMTString')) {
          sExpires = `; expires=${expires.toGMTString()}`
        }
        break
    }
  }

  document.cookie = `${key}=${value}${sExpires}${
    domain ? `; domain=${domain}` : ''
  }${path ? `; path=${path}` : ''}${secure ? '; secure' : ''}`
}

function getOneDayExpirationDate() {
  var now = new Date()
  var time = now.getTime()
  time += 24 * 3600 * 1000
  now.setTime(time)
  return now
}

function getCookie(name) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift()
  }
}

function getAccountName() {
  var hostname = window.location.hostname
  return hostname.split('.')[0]
}

var customerOpenOrderLink = {
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

    /* My Orders need this cookie */
    setCookie(
      'VtexIdclientAutCookie_' + getAccountName(),
      getCookie('VtexIdclientAutCookie'),
      getOneDayExpirationDate()
    )

    var myOrdersUrl = '/account/orders#/' + orderId

    console.log('Redirecting to: ' + myOrdersUrl)

    window.location.href = myOrdersUrl
  },
}

window.INSTORE_CONFIG = {
  // ...
  customerOpenOrderLink: customerOpenOrderLink,
}
