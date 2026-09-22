---
title: 'Terminal: copiar la salida de un comando'
description: 'pbcopy, pbpaste y la función cpy de mi zshrc para mandar al portapapeles lo que imprime un comando sin seleccionar nada con el ratón.'
tags: ['zsh', 'terminal', 'macos', 'pbcopy']
updated: 2026-09-21
order: 6
---

En macOS el portapapeles se maneja desde la terminal con dos comandos: `pbcopy` lee de la entrada estándar y lo guarda, `pbpaste` lo imprime. Sobre eso tengo una función, `cpy`, definida en `zsh/zshrc` de mis dotfiles.

## cpy

| Uso | Qué hace |
|---|---|
| `cpy pwd` | Ejecuta el comando, muestra la salida y la copia |
| `git log -1 \| cpy` | Copia lo que le llega por la tubería y lo muestra |
| `cpy git rev-parse HEAD` | Cualquier comando con sus argumentos, tal cual |

Tres detalles que la hacen más cómoda que `| pbcopy` a secas:

- **Ves lo que copiaste.** `pbcopy` se traga la salida; `cpy` la imprime además de copiarla.
- **Copia sin el salto de línea final.** Al pegar una ruta en otra terminal no se manda un <kbd>Enter</kbd> sin querer.
- **Respeta el código de salida.** Si el comando falla, `cpy` devuelve ese mismo error, así que `cpy make && algo` se comporta como `make && algo`.

> **Solo copia la salida estándar.** Los errores salen por `stderr` y se ven en pantalla, pero no llegan al portapapeles. Para copiarlos también: `cpy sh -c 'comando 2>&1'`, o por tubería, `comando 2>&1 | cpy`.

## pbcopy y pbpaste a pelo

| Comando | Qué hace |
|---|---|
| `comando \| pbcopy` | Copia la salida sin mostrarla |
| `pbcopy < archivo.txt` | Copia el contenido de un archivo |
| `pbpaste` | Imprime lo que hay en el portapapeles |
| `pbpaste > archivo.txt` | Vuelca el portapapeles a un archivo |
| `pbpaste \| jq .` | Pasa lo copiado por otro comando, aquí para formatear un JSON |

`pbpaste | comando` es la pareja menos conocida y la más útil: copias un JSON o un log del navegador y lo procesas en la terminal sin crear un archivo temporal.

## Por qué no `pwd -c` ni `cc`

- **Un sufijo como `pwd-c` o `pwd -cp` no funciona.** zsh buscaría un programa llamado `pwd-c`, o le pasaría `-cp` a `pwd` como opción desconocida. Habría que envolver cada comando uno por uno.
- **`cc` ya estaba ocupado.** En mi `zshrc` es el alias de `claude`, y además es el nombre clásico del compilador de C.

`cpy` estaba libre. Para comprobar un nombre antes de usarlo: `whence -w nombre`. Si responde `none`, está disponible.

> **Cuidado con lo que copias.** El portapapeles lo pueden leer otras aplicaciones y los gestores de historial del sistema. Nada de pasar tokens o contraseñas por `cpy` si luego no vas a pegarlos de inmediato.
