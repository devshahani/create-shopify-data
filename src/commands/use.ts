import {Command, flags} from '@oclif/command'
import TaskManager from '../utilities/taskmanager';
import Shop from '../shop';

type UseContext = {
  myshopifyDomain: string
}

export default class Use extends Command {
  static description =
    'Enter your myshopify domain (e.g ping-pong-shop-2) along with an access token (https://help.shopify.com/en/api/getting-started/authentication/private-authentication). Once authenticated, your credentials persist over usage sessions.'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [
    {name: 'shop', required: true},
    {name: 'access_token', required: true}
  ]

  async run() {
    const {args, flags} = this.parse(Use)
    const {shop, access_token: accessToken} = args
    const taskManager = new TaskManager();

    taskManager
      .addTask(
        'Validate myshopify domain',
        (ctx: UseContext) => {
          ctx.myshopifyDomain = Shop.validateAndCleanDomain(shop)
        }
      )
      .addTask('Authenticate access token', async (ctx: UseContext) => {
        await Shop.validateAccessToken(ctx.myshopifyDomain, accessToken)
      })
      .addTask('Save credentials', async (ctx: UseContext) => {
        await Shop.addToKeychain(ctx.myshopifyDomain, accessToken)
      })
      .addTask('Set active shop', function(ctx: UseContext) {
        Shop.setActiveShop(ctx.myshopifyDomain)
      })
      .execute()
      .then(_ => {
        this.log(`
Successfully added ${shop}.
        `)
        this.exit(0)
      })
      .catch(error => {})

  }
}
