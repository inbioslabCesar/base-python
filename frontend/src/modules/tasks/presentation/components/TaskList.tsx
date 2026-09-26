import type { Task } from '@/modules/tasks/domain/entities/Task'

type Props = {
  items: Task[]
  loading: boolean
}

export function TaskList({ items, loading }: Props) {
  if (loading) {
    return <p>Cargando tareas...</p>
  }

  if (!items.length) {
    return <p>No hay tareas todavia. Crea la primera arriba.</p>
  }

  return (
    <div className="tasks">
      {items.map((task) => (
        <article className="task-item" key={task.id}>
          <p className="task-title">{task.title}</p>
          <span className="task-tag">{task.done ? 'Hecha' : 'Pendiente'}</span>
        </article>
      ))}
    </div>
  )
}
