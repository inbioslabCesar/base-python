import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.application.use_cases.create_task import CreateTaskUseCase
from app.application.use_cases.list_tasks import ListTasksUseCase
from app.infrastructure.repositories.in_memory_task_repository import InMemoryTaskRepository
from app.infrastructure.services.uuid_generator import UuidGenerator
from app.interfaces.http.schemas.task_schema import CreateTaskRequest, TaskResponse

app = FastAPI(title="SOLID Python API", version="0.1.0")


def _load_allowed_origins() -> list[str]:
    raw = os.getenv(
        "CORS_ALLOWED_ORIGINS",
        "http://127.0.0.1:5173,http://localhost:5173",
    )
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


ALLOWED_ORIGINS = _load_allowed_origins()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

repository = InMemoryTaskRepository()
id_generator = UuidGenerator()
create_task_use_case = CreateTaskUseCase(repository=repository, id_generator=id_generator)
list_tasks_use_case = ListTasksUseCase(repository=repository)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": "SOLID Python API running",
        "health": "/health",
        "docs": "/docs",
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/tasks", response_model=TaskResponse, status_code=201)
def create_task(payload: CreateTaskRequest) -> TaskResponse:
    try:
        task = create_task_use_case.execute(payload.title)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return TaskResponse(id=task.id, title=task.title, done=task.done)


@app.get("/tasks", response_model=list[TaskResponse])
def list_tasks() -> list[TaskResponse]:
    tasks = list_tasks_use_case.execute()
    return [TaskResponse(id=t.id, title=t.title, done=t.done) for t in tasks]
