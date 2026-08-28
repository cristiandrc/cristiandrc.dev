---
title: 'Neovim: revisar lo que cambió un agente'
description: 'El ciclo de revisar hunk por hunk y hacer git add sin salir del editor: por qué el margen se vacía al stagear, cómo recorrer los cambios y qué hacer cuando nada se refresca.'
tags: ['neovim', 'git', 'atajos', 'agentes']
updated: 2026-08-27
order: 3
---

Estos atajos corresponden a mi configuración: kickstart sobre Neovim 0.12 con Telescope, gitsigns y neo-tree. La tecla líder es <kbd>Espacio</kbd>, así que todo lo que aquí aparece como <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>d</kbd> se teclea en secuencia, no a la vez.

El escenario es el de siempre: Neovim arriba, el agente abajo, el mismo repo. Él escribe, yo reviso, y lo que ya me convence lo mando al índice con `git add` antes de pedir el siguiente cambio.

## El ciclo

1. **Ver qué tocó** — <kbd>Espacio</kbd> <kbd>g</kbd> <kbd>s</kbd> abre la lista de archivos con cambios y el diff en el panel de preview.
2. **Abrir uno** — <kbd>Enter</kbd> sobre el archivo.
3. **Recorrer los cambios** — <kbd>]</kbd> <kbd>c</kbd> salta al siguiente, <kbd>[</kbd> <kbd>c</kbd> al anterior.
4. **Mirar el detalle** — <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>i</kbd> muestra el diff inline, <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>d</kbd> abre el diff en ventana partida.
5. **Aprobar** — <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>s</kbd> stagea ese hunk, <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>S</kbd> el archivo entero.
6. **Volver al paso 1.** Lo que acabas de stagear ya no aparece.

Ese último punto no es un efecto secundario: es el mecanismo.

## Por qué el margen se vacía al hacer git add

Gitsigns compara **contra el índice**, no contra el último commit. Un hunk stageado deja de ser una diferencia respecto al índice, así que desaparece del margen y <kbd>]</kbd> <kbd>c</kbd> deja de pararse en él.

En la práctica: lo que queda pintado es exactamente lo que aún no has revisado. La lista se vacía sola conforme apruebas, y no hay que llevar la cuenta a mano.

Cuando sí quieres ver todo lo cambiado desde el último commit —staged y sin stagear— alterna la base:

| Base | Qué muestra el margen | Cuándo |
|---|---|---|
| Índice *(por defecto)* | Solo lo que falta por revisar | Durante la sesión de trabajo |
| `HEAD` | Todo lo que cambió desde el último commit | Antes de commitear, para leer el conjunto |

Alterna con <kbd>Espacio</kbd> <kbd>t</kbd> <kbd>g</kbd>. Avisa por pantalla contra qué está comparando, así que no hay que adivinar en qué modo quedó.

## Ver qué archivos tocó

| Atajo | Qué hace |
|---|---|
| <kbd>Espacio</kbd> <kbd>g</kbd> <kbd>s</kbd> | Archivos con cambios sin commitear, con diff en el preview |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>.</kbd> | Archivos abiertos recientemente |
| <kbd>Espacio</kbd> <kbd>Espacio</kbd> | Archivos ya abiertos en esta sesión |
| <kbd>Espacio</kbd> <kbd>e</kbd> | Abre o cierra el árbol lateral |
| <kbd>\\</kbd> | Abre el árbol y salta al archivo actual dentro de él |

<kbd>Espacio</kbd> <kbd>g</kbd> <kbd>s</kbd> es el equivalente al panel de cambios de VS Code, y trae un extra: con <kbd>Tab</kbd> sobre un archivo lo stageas o lo sacas del índice sin salir del picker. Sirve para aprobar de golpe los archivos que ya diste por buenos y quedarte solo con los dudosos.

> **Los archivos nuevos entran por aquí.** Un archivo recién creado ya se pinta en el margen —está activado `attach_to_untracked`— pero al no tener versión anterior aparece como un bloque entero añadido, no como hunks sueltos. Para esos, la lista de <kbd>Espacio</kbd> <kbd>g</kbd> <kbd>s</kbd> es más clara que ir saltando con <kbd>]</kbd> <kbd>c</kbd>.

## Revisar cambio por cambio

| Atajo | Qué hace |
|---|---|
| <kbd>]</kbd> <kbd>c</kbd> / <kbd>[</kbd> <kbd>c</kbd> | Siguiente y anterior cambio del archivo |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>i</kbd> | Diff inline, dentro del propio buffer |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>p</kbd> | Diff en ventana flotante |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>d</kbd> | Diff en ventana partida contra el índice |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>D</kbd> | Diff en ventana partida contra el último commit |
| <kbd>Espacio</kbd> <kbd>t</kbd> <kbd>w</kbd> | Resalta la palabra exacta que cambió dentro de la línea |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>b</kbd> | Blame completo de la línea del cursor |
| <kbd>Espacio</kbd> <kbd>t</kbd> <kbd>b</kbd> | Blame permanente al final de cada línea |

Las tres formas de ver un diff resuelven cosas distintas. <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>i</kbd> es la más rápida para un cambio de una o dos líneas porque no abre nada ni te mueve el cursor. <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>p</kbd> flota encima y se cierra al mover el cursor. <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>d</kbd> parte la ventana y se queda: es la buena cuando el cambio es grande y quieres desplazarte comparando los dos lados. Se cierra con `:q` en cualquiera de los dos paneles.

<kbd>Espacio</kbd> <kbd>t</kbd> <kbd>w</kbd> vale la pena cuando el agente reescribe una línea larga y no es evidente qué movió: en vez de resaltar la línea entera, resalta solo el fragmento distinto.

### Ver la lista completa antes de recorrerla

| Atajo | Qué hace |
|---|---|
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>q</kbd> | Manda a la quickfix todos los cambios de este archivo |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>Q</kbd> | Manda a la quickfix todos los cambios del repo |

Sirve para saber de antemano cuánto hay antes de empezar a aprobar. Una vez cargada, `:copen` la muestra y `:cnext` / `:cprev` la recorren. Como la base sigue siendo el índice, la quickfix solo lista lo que falta por revisar.

### Seleccionar un hunk como texto

`ih` es un objeto de texto: `vih` selecciona el hunk bajo el cursor, `dih` lo borra. Útil cuando quieres quedarte con parte de un cambio y no con todo.

## Aprobar o descartar

| Atajo | Qué hace |
|---|---|
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>s</kbd> | Stagea el hunk bajo el cursor |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>S</kbd> | Stagea el archivo completo |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>r</kbd> | Descarta el hunk y deja la versión anterior |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>R</kbd> | Descarta todos los cambios del archivo |

En modo visual, <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>s</kbd> y <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>r</kbd> trabajan sobre las líneas seleccionadas. Es la forma de aprobar media función cuando el hunk mezcla algo correcto con algo que aún hay que discutir: seleccionas las líneas buenas, las stageas, y lo que queda sin stagear es justo lo que le pides al agente que siga trabajando.

> **`r` y `R` sí borran trabajo.** Stagear es reversible: <kbd>Tab</kbd> en <kbd>Espacio</kbd> <kbd>g</kbd> <kbd>s</kbd> lo saca del índice otra vez. Descartar no: un hunk sin stagear que reseteas no está en ningún sitio, ni en el índice ni en un commit, y no hay `undo` de Git que lo recupere. El `u` de Neovim solo ayuda si el buffer sigue abierto y no has salido. Con la mano en <kbd>Shift</kbd>, <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>R</kbd> está a una tecla de <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>r</kbd> y se lleva el archivo entero.

## Buscar

| Atajo | Qué busca |
|---|---|
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>f</kbd> | Archivos por nombre |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>g</kbd> | Texto en todo el proyecto (grep) |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>w</kbd> | La palabra bajo el cursor, en todo el proyecto |
| <kbd>Espacio</kbd> <kbd>/</kbd> | Texto dentro del archivo actual |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>/</kbd> | Texto solo en los archivos abiertos |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>r</kbd> | Reabre la última búsqueda con sus resultados |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>d</kbd> | Errores y avisos del proyecto |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>k</kbd> | Atajos, por si no recuerdas uno |
| <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>n</kbd> | Archivos de configuración de Neovim |

<kbd>Espacio</kbd> <kbd>s</kbd> <kbd>/</kbd> encaja bien con el flujo del agente: cuando ya tienes abiertos los cuatro o cinco archivos de la tarea, busca solo ahí en vez de en las miles de coincidencias del repo entero.

<kbd>Espacio</kbd> <kbd>s</kbd> <kbd>r</kbd> ahorra más de lo que parece. Después de abrir un resultado y perder el picker, recupera la búsqueda tal cual estaba en vez de obligarte a reescribirla.

## Moverte entre archivos y ventanas

| Atajo | Qué hace |
|---|---|
| <kbd>Espacio</kbd> <kbd>1</kbd>…<kbd>9</kbd> | Va al archivo con ese número en la barra de arriba |
| <kbd>Espacio</kbd> <kbd>Espacio</kbd> | Lista de archivos abiertos, con búsqueda |
| <kbd>Espacio</kbd> <kbd>x</kbd> | Cierra todos los archivos menos el actual |
| <kbd>Espacio</kbd> <kbd>X</kbd> | Cierra todos los archivos |
| <kbd>Ctrl+h</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd> | Mueve el foco entre ventanas partidas |

<kbd>Espacio</kbd> <kbd>x</kbd> es el barrido de después de un commit: quedan abiertos los quince archivos de la tarea anterior, los cierras todos menos en el que estás y la barra vuelve a ser legible. Los que tengan cambios sin guardar preguntan antes de cerrarse.

## Cuando nada parece actualizarse

Es el problema clásico de tener el editor y el agente en el mismo repo: él escribe en disco, pero el buffer de arriba sigue mostrando lo de antes. Neovim solo mira el disco cuando algo se lo pide, y desde otro pane nadie se lo pide.

La configuración ya lo resuelve sola: comprueba el disco al volver al terminal, al cambiar de archivo y cuando el cursor lleva un rato quieto. Si un archivo se recarga, avisa con el nombre en pantalla para que no pase desapercibido. El árbol lateral vigila el disco por su cuenta, así que los archivos que el agente crea o borra aparecen y desaparecen solos.

Queda el empujón manual para el resto de casos:

| Atajo | Qué refresca |
|---|---|
| <kbd>Espacio</kbd> <kbd>r</kbd> | Buffers desde disco, margen de git y árbol de archivos |

Es el que quieres después de un commit, un `checkout` o un `rebase`, cuando el cambio no es el contenido de un archivo sino la referencia contra la que se compara todo. Un commit vacía el índice, y hasta que gitsigns lo relee el margen sigue pintando hunks que ya no existen.

## Recordar los atajos sin salir del editor

Deja pulsado <kbd>Espacio</kbd> un momento y aparece un menú con los grupos disponibles: `s` para buscar, `h` para hunks de git, `g` para git, `t` para alternar cosas. Es la salida rápida cuando sabes que el atajo empieza por una letra pero no recuerdas la segunda.

Si ni eso, <kbd>Espacio</kbd> <kbd>s</kbd> <kbd>k</kbd> busca entre todos los atajos por su descripción.

## Parejas que se confunden

| Atajos | Diferencia |
|---|---|
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>s</kbd> y <kbd>Espacio</kbd> <kbd>g</kbd> <kbd>s</kbd> | `hs` stagea el hunk actual. `gs` abre la lista de archivos cambiados. |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>d</kbd> y <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>D</kbd> | Minúscula compara contra el índice. Mayúscula, contra el último commit. |
| <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>r</kbd> y <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>R</kbd> | Minúscula descarta un hunk. Mayúscula, el archivo entero. |
| <kbd>Espacio</kbd> <kbd>x</kbd> y <kbd>Espacio</kbd> <kbd>X</kbd> | Minúscula deja abierto el archivo actual. Mayúscula no deja ninguno. |
| <kbd>Espacio</kbd> <kbd>q</kbd> y <kbd>Espacio</kbd> <kbd>h</kbd> <kbd>q</kbd> | `q` manda a la quickfix los errores. `hq`, los cambios de git. |

En todos los casos la mayúscula es la versión amplia. Cuando dudes, empieza por la minúscula: hace menos y casi siempre es lo que querías.
