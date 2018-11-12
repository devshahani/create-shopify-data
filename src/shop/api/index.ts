import * as ShopifyAPI from 'shopify-api-node'
import * as _ from 'lodash'
import { ListrTask } from 'listr';

export enum ShopifyAPIResourceName {
  Products = "product",
  Orders = "order",
  Customers = "customer",
}

export default class API {
  shopifyAPI: ShopifyAPI

  constructor(config: ShopifyAPI.IPublicShopifyConfig) {
    if (config.autoLimit === undefined) {
      config.autoLimit = {
        bucketSize: 1,
        interval: 500,
        calls: 1,
      }
    }
    this.shopifyAPI = new ShopifyAPI(config)
  }

  async deleteAllResources(resourceName: ShopifyAPIResourceName, resources: any[], callback: any) {
    const Resource = this.shopifyAPI[resourceName]
    const promises: any[] = []

    resources.forEach(resource => {
      promises.push(
        new Promise((resolve, reject) => {
          Resource.delete(resource.id)
          .then(data => {
            callback()
            resolve(data)
          })
          .catch(error => {
            callback(false)
          })
        })
      )
    })

    await Promise.all(promises)
  }

  async variants() {
    const api = this.shopifyAPI["product"]
    const products = await api.list({
      limit: 250,
      fields: 'variants'
    })
    const variants = _.map(products, 'variants')
    return _.flattenDeep(variants)
  }

  async allResources(resourceName: ShopifyAPIResourceName) {
    const Resource = this.shopifyAPI[resourceName]
    const queryParams = resourceName === ShopifyAPIResourceName.Orders ? {status: 'any'} : '';

    const resourceParams = {
      ...queryParams,
      limit: 250,
    }
    // @ts-ignore
    const resourceCount = await Resource.count(resourceParams)

    const pages = Math.ceil(resourceCount / 250);
    const promises: any[] = []

    for (let index = 1; index <= pages; index++) {
      promises.push(
        Resource.list({
          page: index,
          limit: 250,
          fields: 'id',
        })
      )
    }

    const data = await Promise.all(promises)

    return _.flattenDeep(data)
  }
}
