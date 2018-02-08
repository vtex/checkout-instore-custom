// This is all the settings that you can customize to use a custom inStore login:

window.INSTORE_CONFIG = {
  MasterDataConfig: {
    VendorEntity: 'vendors', // DEFAULT: 'VN'
    VendorEntityFields: 'store_linked,store,name,user', // THIS IS THE DEFAULT
    VendorStoreField: 'store_linked', // THIS IS THE DEFAULT
    StoreEntity: 'stores', // DEFAULT: 'SO'
    StoreEntityFields: 'name,tradePolicy',
    ClientEntity: 'CL', // THIS IS THE DEFAULT
    ClientEntityFields: 'email', // THIS IS THE DEFAULT
    DefaultSchema: 'v1',
  },
}
