import {Command, flags} from '@oclif/command'
import BaseCommand from '../base'
import Shop from '../../shop'
import TaskManager from '../../utilities/taskmanager'
import { ListrTask } from 'listr'

import API from '../../shop/api'
import {ShopifyAPIResourceName} from '../../shop/api'

type DeleteContext = {
  myshopifyDomain: string,
  accessToken: string,
  resources?: any[],
  API: API,
}

export default class DeleteProducts extends Command {
  static description = 'Delete all products from your Shopify store.'

  static flags = {
    ...BaseCommand.flags,
  }
  async run() {
    const {flags} = this.parse(DeleteProducts)
    const {delay} = flags
    const taskManager = new TaskManager()
    taskManager
      .addTask('Validate access token for active shop', async (ctx: DeleteContext, task: ListrTask) => {
        const {accessToken, myshopifyDomain} = await Shop.validateActiveIdentity()
        task.title = `Validate access token for ${myshopifyDomain}`
        ctx.myshopifyDomain = myshopifyDomain
        ctx.accessToken = accessToken
      })
      .addTask('Initialize Shopify API', async (ctx: DeleteContext, task: ListrTask) => {
        ctx.API = new Shop.API({
          shopName: ctx.myshopifyDomain,
          accessToken: ctx.accessToken,
        })
      })
      .addTask(`Download resource ids`, async (ctx: DeleteContext, task: ListrTask) => {
        const { API } = ctx
        ctx.resources = await API.allResources(ShopifyAPIResourceName.Products)
      })
      .addTask('Delete resources', async (ctx:
        DeleteContext, task: ListrTask) => {
        let completedCount = 0
        const increment = () => {
          completedCount++
          task.title = `Delete resources | ${completedCount} completed`
        }
        await ctx.API.deleteAllResources(ShopifyAPIResourceName.Products, ctx.resources!, increment)
      })
      .execute()
//       .then(_ => {
//         this.log(`
// Completed deleting orders.
//         `)
//       })
      .catch((reason) => {
        this.log(reason)
      })
  }
}
