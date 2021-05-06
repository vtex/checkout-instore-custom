# checkout-instore-custom

Custom inStore scripts to go on stores like tbb

## Setup

npm install

## Edit TBB Custom

1. Edit file tbb-checkout-instore-custom.js and commit on this project.
2. Copy the the value of this file on: https://instoretbb.vtexcommercestable.com.br/admin/portal/#/sites/default/code/files/checkout-instore-custom.js

## Doc

> A little explanation about each config.

#### config-frigth-table

In the `ProductPage` we have a freigth table that contains informations about the store that will deliver that product, such as `name`, `cost` and `time to delivery`. We enable the client to config wich columns they wanna show in order to improve the shopping experience.

### enable-regionalization-vtex-intelligent-search

This feature enables regionalization to improve search products prioritizing taking into account the availability of stock in sellers white labels that attends client address.
Only for VTEX Intelligent Search's clients.

### Proxy configuration

In proxy-config-example you can configure a proxy for Electron App that will be used in the normal requests with `fetch`, `splunk` and `EventSource`.
