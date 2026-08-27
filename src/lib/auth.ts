// El PIN se lee en runtime desde process.env (Vercel) y cae a import.meta.env
// en `astro dev`, donde Vite es quien carga el archivo .env.
export const ADMIN_PIN = process.env.ADMIN_PIN ?? import.meta.env.ADMIN_PIN;

export const COOKIE_NAME = 'notes_pin';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: import.meta.env.PROD,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 365,
} as const;
