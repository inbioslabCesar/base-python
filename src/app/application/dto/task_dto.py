from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class TaskDTO:
    id: str
    title: str
    done: bool
