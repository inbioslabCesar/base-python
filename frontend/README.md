# Frontend Base SOLID

Base frontend con React + TypeScript + Vite, preparada para escalar proyectos con principios SOLID.

## Objetivo

Separar claramente responsabilidades entre:

1. Dominio
2. Casos de uso
3. Infraestructura (HTTP/repositorios)
4. Presentacion (hooks/componentes/pages)

## Estructura

```text
src/
  core/
    config/
    http/
  modules/
    tasks/
      domain/
      application/
      infrastructure/
      presentation/
```

## Principios SOLID reflejados

1. Single Responsibility: cada clase/modulo tiene una responsabilidad concreta.
2. Open/Closed: puedes cambiar implementaciones (API real, mock) sin tocar casos de uso.
3. Liskov Substitution: cualquier implementacion de repositorio puede sustituir a otra.
4. Interface Segregation: contratos pequenos por modulo (TaskRepository).
5. Dependency Inversion: la capa de aplicacion depende de interfaces, no de fetch/React directo.

## Variables de entorno

1. Copiar [.env.example](.env.example) a `.env`.
2. Ajustar `VITE_API_URL` segun entorno.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Notas de reutilizacion

1. Usa `modules/<modulo>` para cada dominio de negocio nuevo.
2. Mantiene contratos en `domain/repositories` y casos de uso en `application/use-cases`.
3. Evita que componentes React llamen `fetch` directo; usa repositorios inyectados.
