import {Command, flags} from '@oclif/command'
import BaseCommand from './base'
import Shop from '../shop'
import TaskManager from '../utilities/taskmanager'
import Generator from '../generator'
import { ListrTask } from 'listr';

type CreateProductsContext = {
  myshopifyDomain: string,
  accessToken: string,
  products?: any[],
}
export default class Products extends Command {
  static description = 'Create dummy products for your shopify store'

  static flags = {
    ...BaseCommand.flags,
    help: flags.help({char: 'h'}),
    quantity: flags.string({
      char: 'q',
      name: 'quantity',
      description:
        'Specify the number of products the generator should create'
    }),
    variants: flags.string({
      char: 'v',
      description: 'max number of variants per product'
    })
  }

  async run() {
    const {args, flags} = this.parse(Products)
    const {quantity, variants} = flags
    const taskManager = new TaskManager()
    taskManager
      .addTask('Validate access token for active shop', async (ctx: CreateProductsContext, task: ListrTask) => {
        const {accessToken, myshopifyDomain} = await Shop.validateActiveIdentity()
        task.title = `Validated ${myshopifyDomain}`
        ctx.myshopifyDomain = myshopifyDomain
        ctx.accessToken = accessToken
      })
      .addTask(`Create ${quantity} products`, (ctx: CreateProductsContext) => {
        ctx.products = Generator.createProducts()
      })
      .addTask('Shopify API calls', async (ctx: CreateProductsContext, task: ListrTask) => {
        const API = new Shop.API({
          shopName: ctx.myshopifyDomain,
          accessToken: ctx.accessToken,
        })
        ctx.products = await API.request.product.list()
        task.title = `Downloaded ${ctx.products ? ctx.products.length : 0} products`
      })
      .execute()
      .then(_ => {
        this.log(`
Completed creating x products.
13 requests failed. View logs:
        `)
      })
      .catch((reason) => {
        // this.log(reason)
      })
  }
}
