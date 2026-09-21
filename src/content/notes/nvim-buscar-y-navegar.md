---
title: 'Neovim: buscar en el proyecto y saltar a la definición'
description: 'Los buscadores que uso a diario, las teclas de dentro del picker que no se ven por ningún lado, y cómo llegar al archivo de un import con gf o al símbolo exacto con Ctrl-].'
tags: ['neovim', 'telescope', 'lsp', 'navegacion']
updated: 2026-09-20
order: 5
---

Misma configuración que las otras notas: kickstart sobre Neovim 0.12, tecla líder <kbd>Espacio</kbd>, atajos en secuencia y no a la vez. Aquí va lo que hago cien veces al día y nunca aparece escrito en ningún sitio: encontrar algo en el proyecto y saltar a donde está definido.

## Los buscadores

| Atajo | Qué busca |
|---|---|
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>f</kbd> | Archivos por nombre |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>F</kbd> | Lo mismo, con la palabra bajo el cursor ya escrita en el prompt |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>g</kbd> | Texto en todo el proyecto |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>G</kbd> | Lo mismo, sembrado con la palabra bajo el cursor |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>w</kbd> | La palabra bajo el cursor, directa, sin pasar por el prompt |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>/</kbd> | Texto solo en los archivos que tienes abiertos |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>r</kbd> | Reabre la última búsqueda tal como estaba |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>.</kbd> | Archivos abiertos recientemente |
| <kbd>Espacio</kbd> <kbd>g</kbd> <kbd>s</kbd> | Archivos con cambios de git, con el diff en el preview |

La regla es la misma que en el resto de la configuración: **la minúscula abre en blanco y la mayúscula viene sembrada**. Si ya estás encima de la palabra que ibas a teclear, <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>G</kbd> te ahorra escribirla; si querías buscar otra cosa, la borras con <kbd>Ctrl</kbd>+<kbd>w</kbd> y sigues.

<kbd>Espacio</kbd> <kbd>s</kbd> <kbd>w</kbd> es el caso extremo de eso: ni siquiera abre el prompt, busca ya. Y funciona también **sobre una selección**, así que puedes marcar media línea en modo visual y buscar ese fragmento exacto.

> **<kbd>Espacio</kbd> <kbd>s</kbd> <kbd>r</kbd> ahorra más de lo que parece.** Después de abrir un resultado el picker desaparece. En vez de reescribir la búsqueda, `resume` la devuelve entera: mismo texto, mismos resultados, misma posición.

## Las teclas de dentro del buscador

Esta es la parte que no se ve. Con el picker abierto estás en modo inserción, escribiendo en el prompt, y hay una capa entera de atajos encima:

| Tecla | Qué hace |
|---|---|
| <kbd>Ctrl</kbd>+<kbd>d</kbd> / <kbd>Ctrl</kbd>+<kbd>u</kbd> | Desplaza el **preview** de la derecha, abajo y arriba |
| <kbd>Ctrl</kbd>+<kbd>f</kbd> / <kbd>Ctrl</kbd>+<kbd>k</kbd> | Desplaza el preview **de lado**, para líneas largas |
| <kbd>PageDown</kbd> / <kbd>PageUp</kbd> | Desplaza la **lista de resultados**, que es otra cosa |
| <kbd>Ctrl</kbd>+<kbd>n</kbd> / <kbd>Ctrl</kbd>+<kbd>p</kbd> | Siguiente y anterior resultado |
| <kbd>Ctrl</kbd>+<kbd>r</kbd> <kbd>Ctrl</kbd>+<kbd>w</kbd> | Mete en el prompt la palabra bajo el cursor **de tu archivo** |
| <kbd>Ctrl</kbd>+<kbd>r</kbd> <kbd>Ctrl</kbd>+<kbd>f</kbd> | Lo mismo con el nombre de archivo que haya bajo el cursor |
| <kbd>Ctrl</kbd>+<kbd>w</kbd> | Borra la palabra anterior del prompt |
| <kbd>Tab</kbd> | Marca el resultado; <kbd>Ctrl</kbd>+<kbd>q</kbd> manda lo marcado a la quickfix |
| <kbd>Ctrl</kbd>+<kbd>x</kbd> / <kbd>Ctrl</kbd>+<kbd>v</kbd> / <kbd>Ctrl</kbd>+<kbd>t</kbd> | Abre en ventana horizontal, vertical o pestaña nueva |
| <kbd>Ctrl</kbd>+<kbd>/</kbd> | Lista todos los atajos del picker, ahí mismo |
| <kbd>Ctrl</kbd>+<kbd>c</kbd> | Cierra el buscador |

Las dos primeras filas son la respuesta a "cómo hago scroll en el preview sin tocar el ratón". El preview no es una ventana a la que puedas saltar con <kbd>Ctrl</kbd>+<kbd>w</kbd>: se controla desde el prompt.

> **<kbd>Ctrl</kbd>+<kbd>u</kbd> aquí no borra la línea.** Fuera del picker, en inserción, <kbd>Ctrl</kbd>+<kbd>u</kbd> borra lo escrito; dentro de Telescope está reasignado al preview. Para vaciar el prompt se usa <kbd>Ctrl</kbd>+<kbd>w</kbd>, una palabra cada vez.

> **<kbd>Tab</kbd> no autocompleta, marca.** Es selección múltiple. Sirve para escoger seis archivos de la lista y mandarlos de golpe a la quickfix con <kbd>Ctrl</kbd>+<kbd>q</kbd>, y de ahí recorrerlos con `:cnext`.

Si algún día no recuerdas una de estas, <kbd>Ctrl</kbd>+<kbd>/</kbd> dentro del picker las lista todas. Es el `which-key` del buscador.

## Ir al archivo de un import

Es el Ctrl+clic de VS Code, y son dos teclas: **`gf`**, de *go to file*. Pones el cursor encima de la ruta —en cualquier letra, dentro o fuera de las comillas— y pulsas `g` y luego `f`.

| Tecla | Dónde lo abre |
|---|---|
| `gf` | En la misma ventana |
| <kbd>Ctrl</kbd>+<kbd>w</kbd> `f` | En una ventana partida, para ver los dos a la vez |
| <kbd>Ctrl</kbd>+<kbd>w</kbd> `gf` | En una pestaña nueva |
| `gF` | Igual que `gf`, pero si la ruta lleva `:número` salta a esa línea |

<kbd>Ctrl</kbd>+<kbd>o</kbd> te devuelve a donde estabas, siempre.

No hace falta escribir la extensión: Neovim prueba las que correspondan al tipo de archivo. En TypeScript son `.ts`, `.d.ts`, `.tsx`, `.js`, `.jsx`, `.cjs` y `.mjs`, así que un `import { x } from './lib/util'` resuelve aunque el archivo sea `util.ts`.

> **En `.astro` funciona incluso con el alias.** Neovim 0.12 trae un ftplugin propio de Astro que define un `includeexpr` y deja `path` en `.,,,src/**,public/**`. Resultado: `gf` sobre `'@/layouts/NotesLayout.astro'` abre el archivo de verdad, sin configurar nada. En `.ts` ese mismo alias falla con `E447` si no hay servidor, porque Vim no lee el `tsconfig.json`.

En Python pasa lo mismo que en Astro y por el mismo motivo: su ftplugin convierte los puntos en carpetas, así que `gf` sobre `from utilidades import ayuda` abre `utilidades.py`.

## Ir a la definición exacta

`gf` te deja en el archivo. Cuando lo que quieres es **la función concreta**, eso ya lo contesta el servidor de lenguaje:

| Atajo | Qué hace |
|---|---|
| <kbd>Ctrl</kbd>+<kbd>]</kbd> | Salta a la definición del símbolo bajo el cursor |
| <kbd>Ctrl</kbd>+<kbd>o</kbd> | Vuelve; <kbd>Ctrl</kbd>+<kbd>i</kbd> avanza otra vez |
| `grd` | Las definiciones, listadas en el buscador |
| `grr` | Todos los sitios donde se usa |
| `gri` | Las implementaciones |
| `grn` | Renombrar en todo el proyecto |

Cuando un servidor se engancha al archivo, Neovim le asigna el `tagfunc` automáticamente. Por eso <kbd>Ctrl</kbd>+<kbd>]</kbd> —que en Vim de toda la vida iba a los tags de ctags— pasa a ser "ir a la definición" sin mapear nada. Y como la documentación define `<C-LeftMouse>` como equivalente de <kbd>Ctrl</kbd>+<kbd>]</kbd>, el **Ctrl+clic del ratón** hace lo mismo.

> **En macOS el Control+clic suele ser clic derecho.** Si en tu terminal abre un menú en vez de saltar, no es cosa de Neovim: usa <kbd>Ctrl</kbd>+<kbd>]</kbd> desde el teclado, que además no te obliga a soltar las manos.

### Qué funciona en cada tipo de archivo

| Archivo | Al archivo del import | A la definición exacta |
|---|---|---|
| `.ts` `.tsx` `.js` `.jsx` | `gf` en rutas relativas | Sí, con `ts_ls` — resuelve los alias del `tsconfig` |
| `.astro` | `gf`, incluso con alias | No: ahí solo responde emmet |
| `.py` | `gf` en módulos locales | No, salvo que instales un servidor de Python |
| `.lua` | `gf` | Sí, con `lua_ls` |

La regla corta para el día a día: **en TypeScript, <kbd>Ctrl</kbd>+<kbd>]</kbd>; en Astro, `gf`**. Y <kbd>Ctrl</kbd>+<kbd>o</kbd> para volver en los dos casos.

> **El servidor solo arranca dentro de un proyecto.** `ts_ls` busca un `tsconfig.json` o un `package.json` para decidir la raíz. En un `.ts` suelto, fuera de cualquier proyecto, no se engancha y <kbd>Ctrl</kbd>+<kbd>]</kbd> no hace nada. La primera vez que abres un repo grande también tarda un poco: está indexando.

## Cuándo usar cuál

| Quiero… | Uso |
|---|---|
| Un archivo cuyo nombre recuerdo | <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>f</kbd> |
| Todos los sitios donde aparece este texto | <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>g</kbd> |
| Lo mismo, pero ya estoy encima de la palabra | <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>w</kbd> |
| Abrir el archivo que importa esta línea | `gf` |
| Ver cómo está escrita esta función | <kbd>Ctrl</kbd>+<kbd>]</kbd> |
| Saber quién llama a esta función | `grr` |
| Volver de donde vine | <kbd>Ctrl</kbd>+<kbd>o</kbd> |
