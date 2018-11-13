import {flags} from '@oclif/command'
import TaskManager from '../utilities/taskmanager'
import { ListrTask, ListrTaskWrapper } from 'listr'
import Base from './base';
import CommandHelpers from '../helpers/commands'
import {ShopifyAPIResourceName} from '../shop/api'
import { CreateOrdersContext } from '../types/commands';
import Generator from '../generator'
export default class Orders extends Base {
  static description = 'Create orders using preexisting products'
  static hidden= false

  static flags = {
    ...Base.flags,
    quantity: flags.string({
      char: 'q',
      default: '20',
      description: 'The number of orders you would like to create'},
    ),
    backdate: flags.string({
      char: 'b',
      default: "0",
      description: 'The max number of months order creation time can be backdated by. Defaults to 0 (no backdate)'
    }),
  }

  async run() {
    const {flags} = this.parse(Orders)
    const {interval, backdate, quantity} = parseFlags(flags)

    const taskManager = new TaskManager()
    const context = {
      interval,
      backdate,
      quantity,
    }
    taskManager
      .addTask('Validate access token for active shop', CommandHelpers.validateActiveShop)
      .addTask('Initialize Shopify API', CommandHelpers.apiInitializer(interval))
      .addTask('Download latest products', CommandHelpers.orders.downloadLatestProducts)
      .addTask('Create order data', CommandHelpers.orders.generateOrdersData)
      .addTask(`Send API requests`, CommandHelpers.orders.sendOrdersCalls)
      .execute(context)
      .then(_ => {
        this.log(`
Completed creating orders.
        `)
      })
      .catch(_ => {
      })
  }
}

function parseFlags(flags: any) {
  let {
    backdate,
    // customers,
    interval,
    // locations,
    quantity,
    // variants,
  } = flags

  backdate = parseInt(backdate)
  // customers = customers ? customers.split(",") : []
  interval = parseInt(interval)
  // locations = locations.split(",")
  quantity = parseInt(quantity)
  // variants = variants ? variants.split(",") : []
  return {
    backdate,
    // customers,
    interval,
    // locations,
    quantity,
    // variants,
  }
}
