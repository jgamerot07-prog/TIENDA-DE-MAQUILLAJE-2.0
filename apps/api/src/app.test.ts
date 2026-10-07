import { healthResponseSchema } from '@tienda/shared';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

describe('GET /api/health', () => {
  it('responde 200 con status ok', async () => {
    const res = await request(createApp()).get('/api/health');

    expect(res.status).toBe(200);
    expect(healthResponseSchema.parse(res.body).status).toBe('ok');
  });

  it('responde 404 en rutas /api desconocidas', async () => {
    const res = await request(createApp()).get('/api/no-existe');

    expect(res.status).toBe(404);
  });
});
