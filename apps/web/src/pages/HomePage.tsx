import { healthResponseSchema, type HealthResponse } from '@tienda/shared';
import { useEffect, useState } from 'react';

type ApiState =
  { kind: 'loading' } | { kind: 'ok'; data: HealthResponse } | { kind: 'error'; message: string };

export function HomePage() {
  const [api, setApi] = useState<ApiState>({ kind: 'loading' });

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/health', { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setApi({ kind: 'ok', data: healthResponseSchema.parse(await res.json()) });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setApi({
          kind: 'error',
          message: err instanceof Error ? err.message : 'Error desconocido',
        });
      });

    return () => controller.abort();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-pink-50 p-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-pink-700">React está funcionando ✅</h1>
        <p className="mt-2 text-gray-600">
          Fase 1: base del proyecto (React + TypeScript + Vite + React Router + Tailwind CSS).
        </p>

        <div className="mt-6 rounded-lg border border-gray-200 p-4 text-sm">
          <span className="font-semibold">Estado de la API: </span>
          {api.kind === 'loading' && <span className="text-gray-500">comprobando…</span>}
          {api.kind === 'ok' && (
            <span className="text-green-700">conectada ({api.data.status})</span>
          )}
          {api.kind === 'error' && (
            <span className="text-red-700">sin conexión ({api.message})</span>
          )}
        </div>
      </section>
    </main>
  );
}
