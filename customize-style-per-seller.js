// Add a custom class to inStore main div on custom.js
document
  .querySelector("#app-container")
  .classList.add(window.getVendor().franchiseAccount);

// Have on custom.css an override of the same classes of https://github.com/vtex/checkout-instore-custom/blob/master/change-inStore-theme.css
// Example if you have sellerlagoa and selleripanema, you can have diffents styles and even logos (see all classes on the above link):
.sellerlagoa .c-action-primary {
  color: #8d6742;
}
.sellerlagoa .b--action-primary {
  border-color: #8d6742;
}
.sellerlagoa .bg-action-primary {
  background-color: #8d6742;
}
.sellerlagoa .c-on-action-primary {
  color: #fff;
}
.sellerlagoa .title-logo {
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(sellerlagoa.png);
  color: transparent;
  font-size: 40px;
  max-height: 20px;
}

.selleripanema .c-action-primary {
  color: #cdcdcd;
}
.selleripanema .b--action-primary {
  border-color: #cdcdcd;
}
.selleripanema .bg-action-primary {
  background-color: #cdcdcd;
}
.selleripanema .c-on-action-primary {
  color: #f2f2f2;
}
.selleripanema .title-logo {
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(selleripanema.png);
    color: transparent;
    font-size: 40px;
    max-height: 20px;
  }
