/* farm example to override data when saving observations */

function notifyInStoreOrderFormSuccess(orderForm) {
  getReduxStore().dispatch({
    type: "instore/order/FORM_SUCCESS",
    payload: {
      orderForm: orderForm
    }
  });
}

function saveOpenTextField(text) {
  window.vtexInstore.fetchers.CheckoutFetcher.saveNote({
    orderFormId: getOrderForm().orderFormId,
    text: text
  }).then(function(orderForm) {
    return notifyInStoreOrderFormSuccess(orderForm);
  });
}

function saveMarketingData(data) {
  window.vtexInstore.fetchers.CheckoutFetcher.setMarketingData(
    getOrderForm().orderFormId,
    data
  ).then(function(orderForm) {
    return notifyInStoreOrderFormSuccess(orderForm);
  });
}

function getVendorByCode(vendorCode) {
  var config = getInstoreConfig() || {};
  var MasterDataConfig = config.MasterDataConfig || {};
  var VendorEntity = MasterDataConfig.VendorEntity;
  var VendorStoreField = MasterDataConfig.VendorStoreField;
  var VendorEntityFields = MasterDataConfig.VendorEntityFields;
  var vendorEntityFields = "code,name";
  var params = {
    _where: "code=".concat(vendorCode),
    _fields: vendorEntityFields
  };
  return window.vtexInstore.fetchers.MasterdataFetcher.searchMasterdata(
    params,
    VendorEntity
  );
}

function overrideObservationTag(vendorText) {
  var originalMessages = Object.assign(
    {},
    {
      locale: window.LOCALE_MESSAGES.locale,
      messages: {
        pt: Object.assign({}, window.LOCALE_MESSAGES.messages.pt),
        en: Object.assign({}, window.LOCALE_MESSAGES.messages.en),
        es: Object.assign({}, window.LOCALE_MESSAGES.messages.es)
      }
    }
  );

  var langMessages =
    window.LOCALE_MESSAGES.messages.en ||
    window.LOCALE_MESSAGES.messages.pt ||
    window.LOCALE_MESSAGES.messages.es;
  langMessages.cartObservation = vendorText;

  setNewLocaleMessages && setNewLocaleMessages();

  window.LOCALE_MESSAGES = originalMessages;
}

function removeWhitespaces(str) {
  return str && str.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
}

function changeVendorCode(event) {
  var vendorCode = event && event.data && event.data.note;

  if (!vendorCode) {
    clearDependencies();
    return;
  }

  vendorCode = removeWhitespaces(vendorCode.split("-")[0]);
  getVendorByCode(vendorCode).then(function(vendor) {
    if (vendor) {
      var vendorText = "".concat(vendor.code, " - ").concat(vendor.name);
      overrideObservationTag(vendorText);
      saveOpenTextField(vendorText);
      saveMarketingData({
        utmiCampaign: "codigodavendedora"
      });
    }
  });
}

function clearDependencies() {
  window.LOCALE_MESSAGES.messages[
    window.LOCALE_MESSAGES.locale
  ] = Object.assign(
    { cartObservation: "Observation" },
    window.LOCALE_MESSAGES.messages[window.LOCALE_MESSAGES.locale]
  );
  setNewLocaleMessages && setNewLocaleMessages();
}

document.addEventListener("note.change", changeVendorCode, false);
document.addEventListener("note.removed", clearDependencies, false);

document.addEventListener("clearDependencies", clearDependencies, false);

/* Example to override labels of observations */

window.LOCALE_MESSAGES = {
  locale: "pt",
  messages: {
    pt: {
      cartObservation: "CPF Vendedor", // título que aparece no carrinho
      cartObservationTitle: "CPF Vendedor", // título que aparece no modal de observação
      observationNote: "Digite o CPF do vendedor" // descrição do modal de observação
    }
  }
};

/* Example on how to listen to when openTextField is visible so you can customize masks and validations */

document.addEventListener(
  "note.visible",
  function() {
    // adicionar a lógica de máscara, validação,  etc
    // exemplo: para pegar o elemento textarea de observação é possível fazer
    // var note = document.getElementById('note')
  },
  false
);
