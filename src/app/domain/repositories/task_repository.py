from abc import ABC, abstractmethod

from app.domain.entities.task import Task


class TaskRepository(ABC):
    @abstractmethod
    def save(self, task: Task) -> Task:
        raise NotImplementedError

    @abstractmethod
    def list_all(self) -> list[Task]:
        raise NotImplementedError
