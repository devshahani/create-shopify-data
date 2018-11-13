import {flags} from '@oclif/command'
import TaskManager from '../../utilities/taskmanager'
import Base from '../base';
import CommandHelpers from '../../helpers/commands'
import { ListrTaskWrapper } from 'listr';
import { CreateProductPresetContext } from '../../types/commands';
import { PresetProductTypes } from '../../types/generator';
import { ShopifyAPIResourceName } from '../../shop/api';

export default class ProductsApparel extends Base {
  static description = 'Create products using the apparel preset'
  static hidden= false

  static flags = {
    ...Base.flags,
  }

  async run() {
    const {flags} = this.parse(ProductsApparel)
    const {interval} = parseFlags(flags)

    const taskManager = new TaskManager()

    taskManager
      .addTask('Validate access token for active shop', CommandHelpers.validateActiveShop)
      .addTask('Initialize Shopify API', CommandHelpers.apiInitializer(interval))
      .addTask('Load products', (ctx: CreateProductPresetContext, task: ListrTaskWrapper) => {
        ctx.products = CommandHelpers.products.loadPreset(PresetProductTypes.Apparel)
      })
      .addTask(`Send API requests`, async (ctx: CreateProductPresetContext, task: ListrTaskWrapper) => {
        await ctx.API.uploadItems(ctx.products!, task, ShopifyAPIResourceName.Products)
      })
      .execute()
      .then(_ => {
        this.log(`
Completed creating products.
        `)
      })
      .catch(_ => {
      })
  }
}

function parseFlags(flags: any) {
  let {
    interval,
  } = flags
  interval = parseInt(interval)
  return {
    interval,
  }
}
