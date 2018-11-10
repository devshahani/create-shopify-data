import {Command, flags} from '@oclif/command'

export default abstract class extends Command {
  // static description = 'base class'

  //   static examples = [
  //     `$ create-shopify-data hello
  // hello world from ./src/hello.ts!
  // `
  //   ]

  // method to check whether active shop has valid access token

  static flags = {
    delay: flags.help({char: 'd', description: 'Specify the delay (in seconds) between each Shopify API request. Default (and min) is 0.5'})
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'})
  }

  static args = [{name: 'file'}]

}
