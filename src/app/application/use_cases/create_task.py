from app.application.dto.task_dto import TaskDTO
from app.domain.entities.task import Task
from app.domain.repositories.task_repository import TaskRepository
from app.domain.services.id_generator import IdGenerator


class CreateTaskUseCase:
    def __init__(self, repository: TaskRepository, id_generator: IdGenerator) -> None:
        self._repository = repository
        self._id_generator = id_generator

    def execute(self, title: str) -> TaskDTO:
        clean_title = title.strip()
        if not clean_title:
            raise ValueError("title cannot be empty")

        task = Task(id=self._id_generator.new_id(), title=clean_title)
        saved = self._repository.save(task)
        return TaskDTO(id=saved.id, title=saved.title, done=saved.done)
