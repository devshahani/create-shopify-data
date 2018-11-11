import {Command, flags} from '@oclif/command'


type DeleteContext = {
  myshopifyDomain: string,
  accessToken: string,
  resources?: any[],
}


export default class DeleteCustomers extends Command {
  static description = 'Delete all customers'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(DeleteCustomers)
    this.exit(1)
  }
}
