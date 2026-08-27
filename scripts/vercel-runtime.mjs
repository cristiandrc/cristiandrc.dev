/**
 * Fija el runtime de las funciones generadas por @astrojs/vercel.
 *
 * Por que existe: el adapter v7 (unico compatible con Astro 4) solo conoce
 * Node 18 y 20. Vercel construye este proyecto con Node 24, asi que el adapter
 * cae a su fallback y escribe `nodejs18.x`, un runtime que Vercel ya retiro y
 * que hace fallar el deploy.
 *
 * Cuando el proyecto migre a Astro 5 + @astrojs/vercel v8, este script sobra:
 * borrarlo y quitarlo del script `build` de package.json.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const RUNTIME = 'nodejs22.x';
const FUNCTIONS_DIR = '.vercel/output/functions';

if (!existsSync(FUNCTIONS_DIR)) {
  console.log('[vercel-runtime] sin funciones que parchear, se omite.');
  process.exit(0);
}

let patched = 0;

for (const entry of readdirSync(FUNCTIONS_DIR)) {
  const configPath = join(FUNCTIONS_DIR, entry, '.vc-config.json');
  if (!existsSync(configPath)) continue;

  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  if (config.runtime === RUNTIME) continue;

  console.log(`[vercel-runtime] ${entry}: ${config.runtime} -> ${RUNTIME}`);
  config.runtime = RUNTIME;
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
  patched += 1;
}

console.log(`[vercel-runtime] ${patched} funcion(es) actualizada(s).`);
