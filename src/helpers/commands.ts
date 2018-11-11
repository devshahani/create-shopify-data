import Shop from '../shop'
import { ShopifyAPIResourceName } from '../shop/api';
import { DeleteContext } from '../types/commands';
import * as Listr from 'listr'
import { IPublicShopifyConfig } from 'shopify-api-node';

import TaskManager from '../utilities/taskmanager'

export default {
  apiInitializer(interval: number) {
    return async (ctx: DeleteContext, task: Listr.ListrTaskWrapper) => {
      const config: IPublicShopifyConfig = {
        shopName: ctx.myshopifyDomain,
        accessToken: ctx.accessToken,
      }
      if (interval) {
        config.autoLimit = {
          bucketSize: 1,
          interval: interval,
          calls: 1,
        }
      }
      ctx.API = new Shop.API(config)
    }
  },
  async validateActiveShop(ctx: DeleteContext, task: Listr.ListrTaskWrapper) {
    const {accessToken, myshopifyDomain} = await Shop.validateActiveIdentity()
    task.title = `Validate access token for ${myshopifyDomain}`
    ctx.myshopifyDomain = myshopifyDomain
    ctx.accessToken = accessToken
  },
  async checkDependencies(ctx: DeleteContext, task: Listr.ListrTaskWrapper) {
    const taskManager = new Listr([], {
      concurrent: true,
    })
    const resourceName = ctx.resourceName
    switch(resourceName) {
      case ShopifyAPIResourceName.Customers:
        taskManager.add([{
          title: 'Ensure no orders exist',
          task: async () => {
            const ordersCount = await ctx.API.shopifyAPI.order.count()
            if (ordersCount > 0) {
              throw new Error(`${ordersCount} orders found. Delete all orders before deleting customers`)
            }
          }
        }])
        break;
      default:
        break;
    }
    return taskManager
  }
}
