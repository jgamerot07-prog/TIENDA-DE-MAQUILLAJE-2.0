# Tienda de maquillaje (Colombia)

Tienda online de maquillaje para Colombia. Monorepo con frontend, backend y paquete compartido.

> **Estado: Fase 1 — base del proyecto.** Aún no hay productos, usuarios, carrito, pagos ni panel
> administrativo. Solo existe la infraestructura y una ruta de prueba (`GET /api/health`).

## Tecnologías

| Parte         | Stack                                                        |
| ------------- | ------------------------------------------------------------ |
| Frontend      | React 19, TypeScript, Vite 8, React Router 7, Tailwind CSS 4 |
| Backend       | Node.js 22, TypeScript, Express 5, Zod 4, Helmet, CORS       |
| Base de datos | PostgreSQL 17 (Docker) + Prisma ORM 7                        |
| Calidad       | ESLint 9, Prettier 3, Vitest, GitHub Actions                 |

## Requisitos

- Node.js **22.12 o superior** (ver `.nvmrc`)
- npm 10+
- Docker y Docker Compose (para PostgreSQL local)

## 1. Instalar dependencias

```bash
npm install
```

Instala las dependencias de todos los workspaces y genera el cliente de Prisma (`postinstall`).

## 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Completa `.env` con tus valores locales (usuario, contraseña y nombre de la base de datos, y el
`DATABASE_URL` correspondiente). **`.env` nunca se sube a Git.**

## 3. Iniciar PostgreSQL

```bash
npm run db:up      # levanta PostgreSQL en Docker (puerto 5432, solo localhost)
npm run db:logs    # ver logs
npm run db:down    # detener
```

## 4. Iniciar el proyecto

```bash
npm run dev        # frontend + backend a la vez
npm run dev:api    # solo backend  → http://localhost:4000/api/health
npm run dev:web    # solo frontend → http://localhost:5173
```

En desarrollo, Vite reenvía las peticiones `/api/*` al backend (proxy), así el frontend y la API
comparten origen y no hay problemas de CORS.

## Scripts útiles (desde la raíz)

| Script                    | Qué hace                                         |
| ------------------------- | ------------------------------------------------ |
| `npm run check`           | Formato + lint + verificación de tipos           |
| `npm run lint`            | ESLint en todo el repo                           |
| `npm run format`          | Formatea con Prettier                            |
| `npm run typecheck`       | Verifica tipos de todos los paquetes             |
| `npm test -w @tienda/api` | Tests del backend                                |
| `npm run build`           | Compila shared, api y web para producción        |
| `npm run start:api`       | Ejecuta la API compilada                         |
| `npm run prisma:validate` | Valida el esquema de Prisma                      |
| `npm run prisma:migrate`  | Crea/aplica migraciones (cuando existan modelos) |
| `npm run prisma:studio`   | Abre Prisma Studio                               |

## Estructura del proyecto

```
/
├── apps/
│   ├── web/                 # Frontend (React + Vite + Tailwind)
│   │   ├── src/pages/       # Páginas (rutas)
│   │   ├── src/router.tsx   # Definición de rutas (React Router)
│   │   └── vite.config.ts   # Vite + proxy /api
│   └── api/                 # Backend (Express)
│       ├── src/app.ts       # Configuración de Express (middlewares, rutas)
│       ├── src/server.ts    # Punto de entrada (escucha el puerto)
│       ├── src/config/      # Variables de entorno validadas con Zod
│       └── src/routes/      # Rutas REST
├── packages/
│   └── shared/              # Tipos y esquemas Zod compartidos (web + api)
├── prisma/
│   └── schema.prisma        # Esquema de base de datos (sin modelos todavía)
├── docs/                    # Documentación del proyecto
├── .github/workflows/ci.yml # CI: formato, lint, tipos, tests y build
├── docker-compose.yml       # PostgreSQL local
├── prisma.config.ts         # Configuración de Prisma 7
├── eslint.config.js         # ESLint (flat config)
├── tsconfig.base.json       # Opciones de TypeScript comunes
├── tsconfig.json            # Referencias a los proyectos TypeScript
└── .env.example             # Nombres de variables de entorno (sin valores secretos)
```

Más detalles en [`docs/arquitectura.md`](docs/arquitectura.md).
