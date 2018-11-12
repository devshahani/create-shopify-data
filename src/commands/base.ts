import {Command, flags} from '@oclif/command'
import { string } from '@oclif/command/lib/flags';
import { ListrTask, ListrTaskWrapper } from 'listr';

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

  incrementStatus = (task: ListrTaskWrapper) => {
    return (success: boolean = true) => {
      if (success) {
        this.status.success++
      } else {
        this.status.failure++
      }
      task.title = `${this.status.count} resources | ${this.status.success} completed, ${this.status.failure} failed`
    }
  }

  static flags = {
    interval: flags.string({
      char: 'i',
      name: 'interval',
      default: '500',
      description: 'Specify the interval (in ms) between each Shopify API request. Default (and min) is 500'}
    ),
  }
}
