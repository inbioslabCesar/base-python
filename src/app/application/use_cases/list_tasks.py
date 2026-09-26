from app.application.dto.task_dto import TaskDTO
from app.domain.repositories.task_repository import TaskRepository


class ListTasksUseCase:
    def __init__(self, repository: TaskRepository) -> None:
        self._repository = repository

    def execute(self) -> list[TaskDTO]:
        tasks = self._repository.list_all()
        return [TaskDTO(id=t.id, title=t.title, done=t.done) for t in tasks]
