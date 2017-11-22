window.INSTORE_CONFIG = {
  splunkConfig: {
    endpoint: 'https://splunk-heavyforwarder-public.vtex.com:8088',
    token: '12e9e11c-6342-43a6-8613-4417c2a044b7',
  },
}

function sendEvent(eventName, data) {
  var customEvent = window.document.createEvent('Event')
  customEvent.data = data
  customEvent.initEvent(eventName, true, true)
  window.document.dispatchEvent(customEvent)
}

function setNewSplunkConfig() {
  if (window.INSTORE_CONFIG.splunkConfig) {
    sendEvent('changeInstoreSplunkConfig', {
      config: window.INSTORE_CONFIG.splunkConfig,
    })
  }
}

try {
  setNewSplunkConfig()
} catch (e) {
  console.error('new splunk config error', e)
}
