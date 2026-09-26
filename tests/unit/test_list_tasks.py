from app.application.use_cases.create_task import CreateTaskUseCase
from app.application.use_cases.list_tasks import ListTasksUseCase
from app.infrastructure.repositories.in_memory_task_repository import InMemoryTaskRepository
from app.infrastructure.services.uuid_generator import UuidGenerator


def test_list_tasks_returns_created_items() -> None:
    repository = InMemoryTaskRepository()
    creator = CreateTaskUseCase(repository=repository, id_generator=UuidGenerator())
    lister = ListTasksUseCase(repository=repository)

    creator.execute("Primera tarea")
    creator.execute("Segunda tarea")

    tasks = lister.execute()

    assert len(tasks) == 2
    assert tasks[0].title == "Primera tarea"
    assert tasks[1].title == "Segunda tarea"
