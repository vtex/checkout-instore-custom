// farm example
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
