import Shop from '../../shop'
import { ShopifyAPIResourceName } from '../../shop/api';
import { DeleteContext, CreateOrdersContext } from '../../types/commands';
import * as Listr from 'listr'
import { IPublicShopifyConfig } from 'shopify-api-node';

export default {
  async downloadLatestProducts(ctx: CreateOrdersContext, task: Listr.ListrTaskWrapper) {
    ctx.variants = await ctx.API.variants()
    if (ctx.variants.length <= 0) {
      throw new Error("Cannot create orders without existing products")
    }
    task.title = `${ctx.variants.length} variants downloaded`
  },
  async generateOrdersData(ctx: CreateOrdersContext, task: Listr.ListrTaskWrapper) {
    throw new Error(`${ctx.interval}`)
  },
  async sendOrdersCalls(ctx: CreateOrdersContext, task: Listr.ListrTaskWrapper) {

  }
}
