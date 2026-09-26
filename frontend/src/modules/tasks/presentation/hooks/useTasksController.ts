import { useCallback, useMemo, useState } from 'react'

import { HttpClient } from '@/core/http/httpClient'
import { CreateTaskUseCase } from '@/modules/tasks/application/use-cases/CreateTaskUseCase'
import { ListTasksUseCase } from '@/modules/tasks/application/use-cases/ListTasksUseCase'
import type { Task } from '@/modules/tasks/domain/entities/Task'
import { HttpTaskRepository } from '@/modules/tasks/infrastructure/repositories/HttpTaskRepository'

export function useTasksController() {
  const [items, setItems] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dependencies = useMemo(() => {
    const repository = new HttpTaskRepository(new HttpClient())
    return {
      listTasksUseCase: new ListTasksUseCase(repository),
      createTaskUseCase: new CreateTaskUseCase(repository),
    }
  }, [])

  const loadTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await dependencies.listTasksUseCase.execute()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron cargar tareas')
    } finally {
      setLoading(false)
    }
  }, [dependencies])

  const createTask = useCallback(
    async (title: string) => {
      setError(null)
      try {
        const created = await dependencies.createTaskUseCase.execute(title)
        setItems((prev) => [...prev, created])
        return true
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudo crear la tarea')
        return false
      }
    },
    [dependencies],
  )

  return {
    items,
    loading,
    error,
    loadTasks,
    createTask,
  }
}
