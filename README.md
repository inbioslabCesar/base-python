# Solid Python Starter

Proyecto base en Python con arquitectura limpia y enfoque SOLID.

## Uso como plantilla

Este repositorio ya esta listo para clonarse y reutilizarse como base de nuevos proyectos.

### Setup rapido en una maquina nueva (Windows)

```powershell
git clone <TU_REPO>
cd timereal
"C:\Users\inbio\AppData\Local\Programs\Python\Python312\python.exe" -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -e .[dev]
Copy-Item .env.example .env
.\.venv\Scripts\pre-commit.exe install
```

### Comandos de calidad

```powershell
.\.venv\Scripts\python.exe -m pytest
.\.venv\Scripts\python.exe -m ruff check src tests
.\.venv\Scripts\python.exe -m mypy src
```

## Estructura

```text
src/app/
  domain/          # Entidades y contratos (abstracciones)
  application/     # Casos de uso
  infrastructure/  # Implementaciones concretas (repos, servicios)
  interfaces/      # Adaptadores de entrada/salida (HTTP)
  main.py          # Punto de entrada
```

## Principios SOLID aplicados

1. S (Single Responsibility): cada clase tiene una responsabilidad concreta.
2. O (Open/Closed): los casos de uso trabajan contra interfaces y aceptan nuevas implementaciones.
3. L (Liskov Substitution): cualquier implementación de repositorio se puede intercambiar sin romper reglas.
4. I (Interface Segregation): interfaces pequeñas (`TaskRepository`, `IdGenerator`).
5. D (Dependency Inversion): `CreateTaskUseCase` depende de abstracciones, no de clases concretas.

## Levantar proyecto

```powershell
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --app-dir src
```

## Testing

```powershell
.\.venv\Scripts\Activate.ps1
pytest
```

## Levantar con Docker

```powershell
docker compose up --build
```

Modo produccion (sin reload y con imagen mas liviana):

```powershell
docker compose -f docker-compose.prod.yml up --build -d
```

Ver estado incluyendo health:

```powershell
docker compose -f docker-compose.prod.yml ps
```

Endpoints:

1. API: http://127.0.0.1:8000
2. Swagger: http://127.0.0.1:8000/docs

Para detener:

```powershell
docker compose down
```

Para detener modo produccion:

```powershell
docker compose -f docker-compose.prod.yml down
```

## Extras de productividad incluidos

1. Hooks de pre-commit en [.pre-commit-config.yaml](.pre-commit-config.yaml).
2. Tareas de VS Code en [.vscode/tasks.json](.vscode/tasks.json).
3. CI de GitHub Actions en [.github/workflows/ci.yml](.github/workflows/ci.yml).
4. Lock de dependencias reproducible en [requirements.lock](requirements.lock).
5. Contenedorizacion con [Dockerfile](Dockerfile), [docker-compose.yml](docker-compose.yml), [docker-compose.prod.yml](docker-compose.prod.yml) y [.dockerignore](.dockerignore).
6. Hardening de produccion: contenedor no-root + healthcheck + restart policy.
