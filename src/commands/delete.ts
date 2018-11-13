import TaskManager from '../utilities/taskmanager'
import { ListrTask, ListrTaskWrapper } from 'listr'
import Base from './base';
import CommandHelpers from '../helpers/commands'
import {ShopifyAPIResourceName} from '../shop/api'
import { DeleteContext } from '../types/commands';

export default class Delete extends Base {
  static description = 'Delete all orders from your Shopify store.'
  static hidden= false

  static flags = {
    ...Base.flags,
  }

  static args = [
    {
      name: 'resource',
      required: true,
      options: ['customers', 'orders', 'products']
    },
  ]
  async run() {
    const {args, flags} = this.parse(Delete)
    const {resource} = args
    const {interval} = flags

    const taskManager = new TaskManager()
    taskManager
      .addTask('Validate request', setResourceName(resource))
      .addTask('Validate access token for active shop', CommandHelpers.validateActiveShop)
      .addTask('Initialize Shopify API', CommandHelpers.apiInitializer(parseInt(interval!)))
      .addTask('Check dependencies', CommandHelpers.checkDependencies)
      .addTask(`Download ${resource} ids`, async (ctx: DeleteContext, task: ListrTask) => {
        const { API } = ctx
        ctx.resources = await API.allResources(ctx.resourceName)

        this.setStatus({
          count: ctx.resources.length,
          success: 0,
          failure: 0,
        })

        task.title = `Download ${resource} ids | ${this.status.count} downloaded`
      })
      .addTask('Delete resources', async (ctx:
        DeleteContext, task: ListrTaskWrapper) => {
        if (ctx.resources!.length <= 0) {
          task.skip(`No items available`)
        }
        await ctx.API.deleteAllResources(ctx.resourceName, ctx.resources!, task)
      })
      .execute()
      .then(_ => {
        this.log(`
Completed deleting ${resource}.
        `)
      })
      .catch(_ => {
        // this.exit(1)
      })
  }
}

function setResourceName(resource: string) {
  return async (ctx: DeleteContext, task: ListrTask) => {
    ctx.resourceName = (function(resource) {
      switch(resource) {
        case 'products':
          return ShopifyAPIResourceName.Products
        case 'orders':
          return ShopifyAPIResourceName.Orders
        case 'customers':
          return ShopifyAPIResourceName.Customers
        default:
          throw new Error(`${resource} is not supported`)
      }
    })(resource)
  }
}

