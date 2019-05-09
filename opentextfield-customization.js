/* farm example to override data when saving observations */

function notifyInStoreOrderFormSuccess(orderForm) {
  getReduxStore().dispatch({
    type: "instore/order/FORM_SUCCESS",
    payload: { orderForm }
  });
}

function saveOpenTextField(text) {
  window.vtexInstore.fetchers.CheckoutFetcher.saveNote({
    orderFormId: getOrderForm().orderFormId,
    text: "0000 - Ecommerce"
  }).then(orderForm => notifyInStoreOrderFormSuccess(orderForm));
}

function saveMarketingData(data) {
  window.vtexInstore.fetchers.CheckoutFetcher.setMarketingData(
    getOrderForm().orderFormId,
    data
  ).then(orderForm => notifyInStoreOrderFormSuccess(orderForm));
}

function getVendorByCode(vendorCode) {
  const {
    MasterDataConfig: { VendorEntity, VendorStoreField, VendorEntityFields }
  } = getInstoreConfig();
  const vendorEntityFields = "code,name";
  const params = {
    _where: `code=${vendorCode}`,
    _fields: vendorEntityFields
  };
  return window.vtexInstore.fetchers.MasterdataFetcher.searchMasterdata(
    params,
    VendorEntity
  );
}

function removeWhitespaces(str) {
  return str && str.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
}

function changeVendorCode(event) {
  let vendorCode = event && event.data && event.data.note;
  if (!vendorCode) {
    return;
  }
  vendorCode = removeWhitespaces(vendorCode.split("-")[0]);
  getVendorByCode(vendorCode).then(vendor => {
    if (vendor) {
      saveOpenTextField(`${vendor.code} - ${vendor.name}`);
      saveMarketingData({ utmiCampaign: "codigodavendedora" });
    }
  });
}
document.addEventListener("note.change", changeVendorCode, false);

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
