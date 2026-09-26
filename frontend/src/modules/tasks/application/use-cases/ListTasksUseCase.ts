import type { Task } from '@/modules/tasks/domain/entities/Task'
import type { TaskRepository } from '@/modules/tasks/domain/repositories/TaskRepository'

export class ListTasksUseCase {
  private readonly repository: TaskRepository

  constructor(repository: TaskRepository) {
    this.repository = repository
  }

  async execute(): Promise<Task[]> {
    return this.repository.listAll()
  }
}
