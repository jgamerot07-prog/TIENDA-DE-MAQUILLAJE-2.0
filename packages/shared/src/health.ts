import { z } from 'zod';

/** Respuesta de GET /api/health. La usan la API (para responder) y la web (para validar). */
export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  service: z.string(),
  timestamp: z.iso.datetime(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
