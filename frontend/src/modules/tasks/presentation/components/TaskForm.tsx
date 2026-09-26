import { type FormEvent, useState } from 'react'

type Props = {
  onSubmit: (title: string) => Promise<boolean>
}

export function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const created = await onSubmit(title)
    if (created) {
      setTitle('')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-title">Nueva tarea</label>
      <input
        id="task-title"
        className="input"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ej: Diseñar modulo de pagos"
      />
      <button className="button" type="submit">
        Crear tarea
      </button>
    </form>
  )
}
