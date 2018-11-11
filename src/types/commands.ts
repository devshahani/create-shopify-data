import API, { ShopifyAPIResourceName } from '../shop/api';

export type DeleteContext = {
  myshopifyDomain: string,
  accessToken: string,
  resources?: any[],
  API: API,
  resourceName: ShopifyAPIResourceName,
}
