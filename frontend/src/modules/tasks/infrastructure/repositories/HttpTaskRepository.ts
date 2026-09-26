import { HttpClient } from '@/core/http/httpClient'
import type { Task } from '@/modules/tasks/domain/entities/Task'
import type { TaskRepository } from '@/modules/tasks/domain/repositories/TaskRepository'

export class HttpTaskRepository implements TaskRepository {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async listAll(): Promise<Task[]> {
    return this.httpClient.get<Task[]>('/tasks')
  }

  async create(title: string): Promise<Task> {
    return this.httpClient.post<Task>('/tasks', { title })
  }
}
