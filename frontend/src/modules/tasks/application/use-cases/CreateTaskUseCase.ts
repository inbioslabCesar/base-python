import type { Task } from '@/modules/tasks/domain/entities/Task'
import type { TaskRepository } from '@/modules/tasks/domain/repositories/TaskRepository'

export class CreateTaskUseCase {
  private readonly repository: TaskRepository

  constructor(repository: TaskRepository) {
    this.repository = repository
  }

  async execute(title: string): Promise<Task> {
    const cleanTitle = title.trim()
    if (!cleanTitle) {
      throw new Error('La tarea no puede estar vacia')
    }

    return this.repository.create(cleanTitle)
  }
}
