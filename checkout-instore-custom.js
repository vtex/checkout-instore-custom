(function(){
    var isLoaded = false;
    var maxRetries = 3, countRetries = 0;

    function onload() {
        if (!isLoaded) {
            addCustomizationLinksToMenu();
            customizeIdentification();
            isLoaded = true;
        }
    }

    function addCustomizationLinksToMenu(){
        window.dispatchEvent(new CustomEvent('addCustomLink.instore', {
            detail: [
                {title: 'Abertura', href: '/caixa-instore#abertura', 'section': 'Caixa'},
                {title: 'Sangria', href: '/caixa-instore#sangria', 'section': 'Caixa'},
                {title: 'Reforco', href: '/caixa-instore#reforco', 'section': 'Caixa'},
                {title: 'Fechamento', href: '/caixa-instore#fechamento', 'section': 'Caixa'},
                {title: 'Cancelamento', href: '/caixa-instore#cancelamento', 'section': 'Caixa'},
                {title: 'Cadastro', href: '/cadastro-instore', 'section': 'Fidelidade'}
            ]
        }));
    }

    function customizeIdentification() {
        function useIdentificationOnlyWithCPF() {
            var identificationInput = document.getElementById('identification');
            if (identificationInput) {
                identificationInput.setAttribute('placeholder', 'CPF');
                identificationInput.setAttribute('type', 'tel');
            } else {
              countRetries++;
              if (countRetries <= maxRetries) {
                setTimeout(function(){
                  useIdentificationOnlyWithCPF();
                , 100);
              }
            }
        }

        window.document.addEventListener('path.updated', function (e) {
            countRetries = 0;
            setTimeout(function(){
                var path = e.data.path;
                if (path === '/') {
                    useIdentificationOnlyWithCPF(path);
                }
            }, 0)
        }, false)

        useIdentificationOnlyWithCPF()
    }

    window.document.addEventListener('load.instore', onload);
    if(window.inStoreIsLoaded) {
        onload();
    }
})();
