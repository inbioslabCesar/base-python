import pytest

from app.application.use_cases.create_task import CreateTaskUseCase
from app.infrastructure.repositories.in_memory_task_repository import InMemoryTaskRepository
from app.infrastructure.services.uuid_generator import UuidGenerator


def test_create_task_success() -> None:
    use_case = CreateTaskUseCase(
        repository=InMemoryTaskRepository(),
        id_generator=UuidGenerator(),
    )

    created = use_case.execute("Comprar insumos")

    assert created.id
    assert created.title == "Comprar insumos"
    assert created.done is False


def test_create_task_empty_title_raises_error() -> None:
    use_case = CreateTaskUseCase(
        repository=InMemoryTaskRepository(),
        id_generator=UuidGenerator(),
    )

    with pytest.raises(ValueError, match="title cannot be empty"):
        use_case.execute("  ")
