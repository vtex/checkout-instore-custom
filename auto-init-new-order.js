const TIME_TO_RESET = 300000 // 5 min
document.addEventListener('path.updated', (event) => {
  const path = event && event.data && event.data.path
  console.log('path', path)
  if (!path || path !== 'orderplaced') {
    return
  }
  setTimeout(() => {
    document.querySelector('#new-order').click()
  }, TIME_TO_RESET)
}, false)
