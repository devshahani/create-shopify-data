import {Command, flags} from '@oclif/command'
import { string } from '@oclif/command/lib/flags';

type GeneratorProgress = {
  count: number,
  success: number,
  failure: number,
  message?: string,
}

export default abstract class extends Command {
  static hidden= true

  status: GeneratorProgress = {
    count: 0,
    success: 0,
    failure: 0,
  }

  setStatus = (newStatus: GeneratorProgress) => {
    this.status = {
      ...this.status,
      ...newStatus,
    }
  }

  incrementStatus = (success: boolean = true) => {
    if (success) {
      this.status.success++
    } else {
      this.status.failure++
    }
  }

  static flags = {
    delay: flags.string({
      char: 'd',
      name: 'delay',
      parse: (input) => {
        if (parseFloat(input) < 0.5) {
          return "0.5"
        } else {
          return input
        }
      },
      default: '0.5',
      description: 'Specify the delay (in seconds) between each Shopify API request. Default (and min) is 0.5'}
    )
  }
}
