import * as Listr from 'listr'

type Task = {
  title: string;
  task(): void;
}

export default class {
  tasks: Task[] = []

  addTask(title: string, task: any) {
    this.tasks.push({
      title,
      task
    })
    return this;
  }

  execute() {
    return new Listr(this.tasks).run()
  }
}
