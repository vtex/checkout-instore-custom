// Add the following code to checkout-instore-custom.js
function addMenuItems() {
  window.dispatchEvent(
    new CustomEvent('addCustomLink.instore', {
      detail: [
        {
          title: 'Charles Proxy',
          href: 'http://www.charlesproxy.com/getssl',
          section: 'dev',
        },
      ],
    })
  )
}

function instoreLoaded() {
  // etc...
  addMenuItems()
}

document.addEventListener(
  'load.instore',
  function () {
    setTimeout(instoreLoaded)
  },
  false
)

if (window.inStoreIsLoaded) {
  setTimeout(instoreLoaded)
}
