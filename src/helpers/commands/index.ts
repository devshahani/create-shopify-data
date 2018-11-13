import Shop from '../../shop'
import { ShopifyAPIResourceName } from '../../shop/api';
import { DeleteContext, CreateOrdersContext, CreateProductPresetContext } from '../../types/commands';
import * as Listr from 'listr'
import { IPublicShopifyConfig } from 'shopify-api-node';

import TaskManager from '../../utilities/taskmanager'
import OrderHelpers from './orders'
import ProductHelpers from './products'

export default {
  orders: OrderHelpers,
  products: ProductHelpers,
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
  async validateActiveShop(ctx: DeleteContext | CreateOrdersContext | CreateProductPresetContext, task: Listr.ListrTaskWrapper) {
    const {accessToken, myshopifyDomain} = await Shop.validateActiveIdentity()
    task.title = `Validate access token for ${myshopifyDomain}`
    ctx.myshopifyDomain = myshopifyDomain
    ctx.accessToken = accessToken
  },
  async checkDependencies(ctx: DeleteContext | CreateOrdersContext | CreateProductPresetContext, task: Listr.ListrTaskWrapper) {
    const taskManager = new TaskManager()

    const resourceName = ctx.resourceName
    switch(resourceName) {
      case ShopifyAPIResourceName.Customers:
        taskManager.addTask(
          'Ensure no orders exist',
          async () => {
            const ordersCount = await ctx.API.shopifyAPI.order.count()
            if (ordersCount > 0) {
              throw new Error(`${ordersCount} orders found. Delete all orders before deleting customers`)
            }
          }
        )
        break;
      default:
        task.title = "No dependencies detected"
        break;
    }
    // if (taskManager.tasks.length > 0) {
      return taskManager._execute()
    // }
  },
}
