# Arquitectura

## Monorepo con npm workspaces

- `packages/shared` (`@tienda/shared`): esquemas Zod y tipos TypeScript usados por la web y la API.
  Se compila a `dist/` con `tsc`; por eso `npm run dev` y `npm run build` lo compilan primero.
- `apps/api` (`@tienda/api`): API REST con Express. Todas las rutas viven bajo `/api`.
- `apps/web` (`@tienda/web`): SPA con React. En desarrollo, Vite reenvía `/api` a la API.

## Por qué un paquete compartido

La misma definición Zod valida los datos en el servidor y en el navegador. Ejemplo actual:
`healthResponseSchema` define la respuesta de `GET /api/health`; la API la usa como tipo de su
respuesta y la web la usa para validar lo que recibe.

## Base de datos

- PostgreSQL 17 en Docker para desarrollo (`docker-compose.yml`), expuesto solo en `127.0.0.1`.
- Prisma 7: el esquema está en `prisma/schema.prisma` y la configuración en `prisma.config.ts`
  (Prisma 7 ya no lee `.env` por sí solo; lo cargamos ahí).
- El cliente se genera en `apps/api/src/generated/prisma` (ignorado por Git).
- Aún no hay modelos: se definirán en la siguiente fase.

## Seguridad aplicada desde la Fase 1

- `helmet` (cabeceras de seguridad) y `x-powered-by` desactivado.
- CORS limitado a `WEB_ORIGIN`.
- Límite de tamaño del cuerpo JSON (100 kB).
- Variables de entorno validadas con Zod al arrancar: si faltan o son inválidas, la API no inicia.
- Manejador de errores que no expone detalles internos al cliente.
- `.env` excluido de Git; `.env.example` solo contiene nombres de variables.

## Fases

1. **Base del monorepo e infraestructura** ← actual
2. Modelo de datos (Prisma)
3. Catálogo público
4. Carrito, checkout como invitado y pedidos
5. Inicio de sesión con Google y direcciones
6. Pagos (sandbox)
7. Panel administrativo
8. Correos, WhatsApp y SEO
9. Endurecimiento de seguridad y despliegue
