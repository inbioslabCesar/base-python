import type { Task } from '@/modules/tasks/domain/entities/Task'

export interface TaskRepository {
  listAll(): Promise<Task[]>
  create(title: string): Promise<Task>
}
