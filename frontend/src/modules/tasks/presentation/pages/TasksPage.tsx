import { useEffect } from 'react'

import { TaskForm } from '@/modules/tasks/presentation/components/TaskForm'
import { TaskList } from '@/modules/tasks/presentation/components/TaskList'
import { useTasksController } from '@/modules/tasks/presentation/hooks/useTasksController'

export function TasksPage() {
  const { items, loading, error, loadTasks, createTask } = useTasksController()

  useEffect(() => {
    void loadTasks()
  }, [loadTasks])

  return (
    <main className="page-shell">
      <header className="hero">
        <h1 className="title">Frontend Base SOLID</h1>
        <p className="subtitle">
          Esta base separa dominio, casos de uso, infraestructura y presentacion para escalar
          cualquier proyecto frontend sin acoplar la UI a la capa de datos.
        </p>
      </header>

      <section className="panel" aria-label="Task module">
        <TaskForm onSubmit={createTask} />
        {error && <p className="error">{error}</p>}
        <TaskList items={items} loading={loading} />
      </section>
    </main>
  )
}
