from app.domain.entities.task import Task
from app.domain.repositories.task_repository import TaskRepository


class InMemoryTaskRepository(TaskRepository):
    def __init__(self) -> None:
        self._items: dict[str, Task] = {}

    def save(self, task: Task) -> Task:
        self._items[task.id] = task
        return task

    def list_all(self) -> list[Task]:
        return list(self._items.values())
