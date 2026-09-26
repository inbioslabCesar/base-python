from uuid import uuid4

from app.domain.services.id_generator import IdGenerator


class UuidGenerator(IdGenerator):
    def new_id(self) -> str:
        return str(uuid4())
