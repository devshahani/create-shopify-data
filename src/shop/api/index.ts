import * as ShopifyAPI from 'shopify-api-node'
import * as _ from 'lodash'
import { ListrTask, ListrTaskWrapper } from 'listr';
import { __await } from 'tslib';
import { rejects } from 'assert';
import { resolve } from 'path';

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

  async deleteAllResources(resourceName: ShopifyAPIResourceName, resources: any[], task: ListrTaskWrapper) {
    const Resource = this.shopifyAPI[resourceName]
    const promises: any[] = []

    let completedCount = 0
    let failedCount = 0
    let lastErrorMessage = ""

    resources.forEach(resource => {
      promises.push(
        new Promise((resolve, reject) => {
          Resource.delete(resource.id)
          .then(data => {
            completedCount++
            task.title = `Send API requests | ${completedCount} completed, ${failedCount} failed ${lastErrorMessage}`
            resolve(data)
          })
          .catch(error => {
            failedCount++
            lastErrorMessage = `(${error.statusMessage})`
            task.title = `Send API requests | ${completedCount} completed, ${failedCount} failed ${lastErrorMessage}`
            resolve()
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

  async uploadOrders(orders: any[], task: ListrTaskWrapper) {
    let completedCount = 0
    let failedCount = 0
    let lastErrorMessage = ""
    let promises = orders.map(order => {
      return new Promise((resolve, reject) => {
        this.shopifyAPI.order.create(order)
        .then(_ => {
          completedCount++
          task.title = `Send API requests | ${completedCount} completed, ${failedCount} failed ${lastErrorMessage}`
          resolve()
        })
        .catch(error => {
          failedCount++
          lastErrorMessage = `(${error.statusMessage})`
          task.title = `Send API requests | ${completedCount} completed, ${failedCount} failed ${lastErrorMessage}`
          resolve()
        })
      })
    })

    await Promise.all(promises)
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
