import type { HealthResponse } from '@tienda/shared';
import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  const body: HealthResponse = {
    status: 'ok',
    service: 'api',
    timestamp: new Date().toISOString(),
  };
  res.json(body);
});
