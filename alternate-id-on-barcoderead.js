// You can add an alternate id regex that will capture the real ean to search when an ean is readed on search with the following:
window.INSTORE_CONFIG = {
    // ...
    search: {
        // ...
        alternateIdRegex: '\\d{6}(?:(?:(?:0)(\\d{7}))|(\\d{8}))',
    },
}

