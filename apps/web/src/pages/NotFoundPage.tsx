import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <Link to="/" className="text-pink-700 underline">
        Volver al inicio
      </Link>
    </main>
  );
}
