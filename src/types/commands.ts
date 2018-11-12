import API, { ShopifyAPIResourceName } from '../shop/api';

export type DeleteContext = {
  myshopifyDomain: string,
  accessToken: string,
  resources?: any[],
  API: API,
  resourceName: ShopifyAPIResourceName,
}

export type CreateOrdersFlags = {
  backdate?: number,
  interval: number,
  locations: string,
  quantity: number,
  variants?: number,
}

export type CreateOrdersContext = {
  myshopifyDomain: string,
  accessToken: string,
  interval: number,
  backdate: number,
  quantity: number,
  variants?: any[],
  orders?: any[],
  customers?:any[],
  API: API,
}
