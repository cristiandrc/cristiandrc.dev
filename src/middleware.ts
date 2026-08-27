import { defineMiddleware } from 'astro:middleware';
import { ADMIN_PIN, COOKIE_NAME } from '@/lib/auth';

// Rutas de /notes que no exigen sesion: si no, no habria forma de entrar.
const PUBLIC_PATHS = ['/notes/login', '/notes/logout'];

export const onRequest = defineMiddleware(({ url, cookies, redirect }, next) => {
  if (!url.pathname.startsWith('/notes')) return next();
  if (PUBLIC_PATHS.includes(url.pathname)) return next();
  if (ADMIN_PIN && cookies.get(COOKIE_NAME)?.value === ADMIN_PIN) return next();

  return redirect('/notes/login');
});
