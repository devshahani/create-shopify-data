import Shop from '../../shop'
import { ShopifyAPIResourceName } from '../../shop/api';
import { DeleteContext, CreateOrdersContext } from '../../types/commands';
import * as Listr from 'listr'
import { IPublicShopifyConfig } from 'shopify-api-node';
import Generator from '../../generator';

export default {
  async downloadLatestProducts(ctx: CreateOrdersContext, task: Listr.ListrTaskWrapper) {
    ctx.variants = await ctx.API.variants()
    if (ctx.variants.length <= 0) {
      throw new Error("Cannot create orders without existing products")
    }
    task.title = `${ctx.variants.length} variants downloaded`
  },
  async generateOrdersData(ctx: CreateOrdersContext, task: Listr.ListrTaskWrapper) {
    ctx.customers = Generator.createCustomers(ctx.quantity)
    ctx.orders = Generator.createOrders(ctx.quantity, ctx.variants!, ctx.customers, ctx.backdate)
  },
  async sendOrdersCalls(ctx: CreateOrdersContext, task: Listr.ListrTaskWrapper) {
    await ctx.API.uploadOrders(ctx.orders!, task)
  }
}
