// El PIN vive en process.env, que se lee en runtime.
//
// El fallback a import.meta.env existe solo porque `astro dev` no popula
// process.env: Vite carga el .env unicamente en import.meta.env. Va detras de
// import.meta.env.DEV para que el bundler elimine la rama al construir; si se
// referenciara sin esa guarda, Vite reemplazaria import.meta.env.ADMIN_PIN por
// su valor literal y el PIN quedaria escrito en texto plano dentro del bundle.
const devPin = import.meta.env.DEV ? import.meta.env.ADMIN_PIN : undefined;

export const ADMIN_PIN = process.env.ADMIN_PIN ?? devPin;

export const COOKIE_NAME = 'notes_pin';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: import.meta.env.PROD,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 365,
} as const;
