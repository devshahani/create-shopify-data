import {Command, flags} from '@oclif/command'
import BaseCommand from './base'
import Shop from '../shop'
import TaskManager from '../utilities/taskmanager'

export default class Products extends Command {
  static description = 'Create dummy products for your shopify store'

  static flags = {
    ...BaseCommand.flags,
    help: flags.help({char: 'h'}),
    quantity: flags.string({
      char: 'q',
      description:
        'Specify the number of products the generator should create'
    }),
    variants: flags.string({
      char: 'v',
      description: 'number of variants per product to create (range)'
    })
  }

  async run() {
    const {args, flags} = this.parse(Products)
    const {quantity, variants} = flags
    // this.log(quantity, variants)

    const taskManager = new TaskManager()
    taskManager.addTask('Validate access token', function () {})
    taskManager.addTask(`Generate ${quantity} products`, function () {})
    taskManager.addTask('Shopify API calls', function () {})
    taskManager.execute()
    // this.log(Shop.API)
  }
}
