/* Global configurations */

window.INSTORE_CONFIG = {
  topbarTitle: "Forma turismo",
  enableIdentificationTypes: {
    QRCode: false,
    CPF: false,
    Email: false,
    Custom: true
  },
  payments: {
    filters: [
      "16", // Vale presente
      "44", // Cartão de débito
      "45", // Cartão de crédito
      "64", // Credit Control
      "202" // Dinheiro
    ]
  }
};

window.LOCALE_MESSAGES = {
  locale: "pt",
  messages: {
    pt: {}
  }
};

function setNewLocaleMessages() {
  var eventLocale = new Event("changeLocaleMessages");
  eventLocale.data = window.LOCALE_MESSAGES;
  document.dispatchEvent(eventLocale);
}

if (window.inStoreIsLoaded) {
  setNewLocaleMessages();
} else {
  document.addEventListener(
    "load.instore",
    function() {
      setNewLocaleMessages();
    },
    false
  );
}

if (!window.inStorn) {
  class InStorn {
    constructor() {
      this.credentials1 =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2YWxpZCI6dHJ1ZSwiaWQiOjU2MCwiZXhwIjoxNTYxMDY2MjI2MTcwLCJub21lIjoiZm9ybWF0aSIsInVzdWFyaW9JZCI6MSwiaWF0IjoxNTYwOTc5ODI2fQ.RS0udQ7OM7QxWwufGb-24phKHh8v-FtHx8aTp2MQnCc";

      this.credentials2 =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2YWxpZCI6dHJ1ZSwiaWQiOjU2MCwiZXhwIjoxNTYxNTYxNTE1MjQ5LCJub21lIjoiZm9ybWF0aSIsInVzdWFyaW9JZCI6MSwiaWF0IjoxNTYxNDc1MTE1fQ.8qqhqeRDh2wgQnBVM8RNhWFz6_mBTxaO61TVHcVCKmc";

      this.errorIdentificationNotFound = "Pulseira não encontrada";

      this.errorOwnerNotFound = "Responsável não encontrado";

      this.errorMasterData = "Erro ao salvar dados do cliente na VTEX";

      this.validCodeLength = 16;

      this.diffToAutomaticallySubmit = 300;

      this.onFocus = this.onFocus.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    customizeIdentification() {
      this.lastTimeTextChanged = null;
      this.value = "";

      this.listen();

      setTimeout(() => {
        this.setPlaceholderOnInput();
        this.setLabelOnInput();
      }, 100);
    }

    listen() {
      document.addEventListener("customInputFocus", this.onFocus, false);
      document.addEventListener("customInputChange", this.onChange, false);
      document.addEventListener("customInputSubmit", this.onSubmit, false);

      window.vtexInstore.identification.validations.validateCustom = this.onValidate.bind(
        this
      );
    }

    unlisten() {
      document.removeEventListener("customInputFocus", this.onFocus, false);
      document.removeEventListener("customInputChange", this.onChange, false);
      document.removeEventListener("customInputSubmit", this.onSubmit, false);
    }

    removeWhiteSpace(text) {
      return text.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    }

    sendEvent(type, data) {
      var customEvent = window.document.createEvent("Event");
      customEvent.data = data || {};
      customEvent.initEvent(type, true, true);
      window.document.dispatchEvent(customEvent);
    }

    sendError(errorMessage) {
      this.sendEvent("customInputErrorMessage", { error: errorMessage });
    }

    clearError() {
      this.sendError("");
    }

    fetch(url, { headers, data, method, options }) {
      return window.vtexInstore.fetchers.jsonFetch({
        url,
        headers,
        data,
        method: method || "get",
        options: Object.assign(
          {},
          {
            crossdomain: true
          },
          options
        )
      });
    }

    onValidate(text) {
      text = this.removeWhiteSpace(text);
      return text.length === this.validCodeLength;
    }

    onChange(e) {
      const event = e.data;

      this.clearError();

      this.value = event.target.value;

      const diffTime = this.lastTimeTextChanged
        ? new Date() - this.lastTimeTextChanged
        : 0;
      this.lastTimeTextChanged = new Date(); // init time to input text

      // can automatically send code
      if (
        diffTime < this.diffToAutomaticallySubmit &&
        this.value.length === this.validCodeLength
      ) {
        this.onSubmit();
      }
    }

    onSubmit() {
      this.sendrfid(this.value);
    }

    onFocus() {
      this.sendEvent("customInputInitialValue", { value: "" });
    }

    startLoading() {
      this.sendEvent("customInputLoading", { loading: true });
    }

    stopLoading() {
      this.sendEvent("customInputLoading", { loading: false });
    }

    setPlaceholderOnInput() {
      this.sendEvent("customInputPlaceholder", { placeholder: "" });
    }

    setLabelOnInput() {
      this.sendEvent("customInputLabel", { label: "Código" });
    }

    decryptValue(value) {
      var array = value.split("");
      var size = array.length;
      var array2 = [];
      for (var i = 1; i < size; i += 2) {
        array2.push(array[i - 1] + array[i]);
      }
      array2 = array2.reverse();
      array2 = array2.join();
      return array2.replace(/(,)/g, "");
    }

    setCustomerIdentification(email) {
      this.sendEvent("setCustomerIdentification", { email: email });
    }

    saveCustomerOnMasterData(data) {
      return vtexInstore.fetchers.MasterdataFetcher.createDocument(
        data,
        "CL",
        "patch"
      ).catch(err => {
        err.message = this.errorMasterData;
        return Promise.reject(err);
      });
    }

    getPaxId(value) {
      return this.fetch(
        `https://saga-t.formaturismo.com.br/pulseiras?pulseira=${value}`,
        {
          headers: {
            authorization: this.credentials1
          }
        }
      )
        .then(myBlob => {
          if (myBlob.length === 0) {
            return Promise.reject({ message: errorIdentificationNotFound });
          }

          const paxId = myBlob[0].paxId;

          return Promise.resolve(paxId);
        })
        .catch(err => {
          err.message = err.message || this.errorIdentificationNotFound;
          return Promise.reject(err);
        });
    }

    validateFinancialOwner(paxId) {
      return this.fetch(
        `https://ry-u.formaturismo.com.br/pax/${paxId}/respFinanceiro`,
        {
          headers: {
            authorization: this.credentials1
          }
        }
      )
        .then(myBlob => {
          if (myBlob.length !== 0) {
            return Promise.reject({ message: errorOwnerNotFound });
          }
        })
        .catch(err => {
          err.message = err.message || this.errorIdentificationNotFound;
          return Promise.reject(err);
        });
    }

    getOwnerData(paxId) {
      return this.fetch(`https://ry-u.formaturismo.com.br/pax/${paxId}/resp`, {
        headers: {
          authorization: this.credentials2
        }
      }).then(myBlob => {
        const name = myBlob[0].nome;
        const firstName = name.split(" ")[0].trim();
        const lastName = name.replace(firstName, "").trim();
        return Promise.resolve({
          email: myBlob[0].respEmail,
          firstName,
          lastName,
          document: myBlob[0].cpf,
          homePhone:
            myBlob[0].respTelCom ||
            myBlob[0].respTelCom2 ||
            myBlob[0].respTel ||
            "21999999999"
        });
      });
    }

    finish() {
      this.unlisten();
      this.stopLoading();
    }

    sendrfid(value) {
      this.startLoading();

      value = this.decryptValue(value);

      return this.getPaxId(value)
        .then(paxId => {
          return Promise.all([
            this.validateFinancialOwner(paxId),
            this.getOwnerData(paxId)
          ]).then(responses => {
            const data = responses[1];
            this.saveCustomerOnMasterData(data).then(() => {
              return this.setCustomerIdentification(data.email);
            });
          });
        })
        .catch(err => {
          const errorMessage = err.message || err.toString();
          this.sendError(errorMessage);
          console.error("Integration error", err);
          return Promise.reject(err); // This will make log the error on inStore backend
        })
        .finally(() => {
          this.finish();
        });
    }
  }

  window.inStorn = new InStorn();

  if (window.customizeCustomerIdentification) {
    window.inStorn.customizeIdentification();
  }

  document.addEventListener(
    "customizeCustomerIdentification",
    () => {
      window.inStorn.customizeIdentification();
    },
    false
  );
}
