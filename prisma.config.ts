import { existsSync } from 'node:fs';
import { defineConfig } from 'prisma/config';

// Prisma 7 no carga el .env automáticamente.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Vacío permite `prisma generate` sin base de datos (p. ej. en CI).
    url: process.env.DATABASE_URL ?? '',
  },
});
