---
title: 'Neovim: formatear un trozo y plegar el código'
description: 'Qué hace Espacio f según lo que tengas seleccionado, en qué lenguajes funciona de verdad, y cómo moverse por los pliegues que calcula treesitter.'
tags: ['neovim', 'prettier', 'formato', 'plegado']
updated: 2026-08-28
order: 4
---

Misma configuración que la nota de git: kickstart sobre Neovim 0.12, tecla líder <kbd>Espacio</kbd>, atajos en secuencia y no a la vez. Aquí van las dos cosas que uso a diario y se olvidan igual de rápido: formatear **solo lo seleccionado** y plegar el código para leer un archivo largo.

## Formatear

<kbd>Espacio</kbd> <kbd>f</kbd> hace las dos cosas según dónde estés:

| Dónde | Qué formatea |
|---|---|
| Modo normal | El archivo entero |
| Modo visual | Solo las líneas seleccionadas |

**Nada se formatea al guardar.** El formateo automático está apagado a propósito, así que un `:w` nunca te mueve el archivo bajo los pies —importa cuando compartes el repo con un agente y quieres que el diff sea solo lo que él cambió.

### Qué funciona en cada lenguaje

No todos los lenguajes llegan igual de lejos, y conviene saberlo antes de pelearse con la tecla:

| Lenguaje | Archivo entero | Selección |
|---|---|---|
| JS, JSX, TS, TSX, JSON | prettier | prettier por rango |
| CSS, SCSS, LESS | prettier | `rangeFormatting` del LSP |
| HTML | prettier | LSP de html, y prettier aparte si caes dentro de un `<script>` o `<style>` |
| Markdown, YAML | prettier | nada |
| Lua, Astro, Liquid | nada | nada |

Las dos últimas filas son las que sorprenden, así que van explicadas abajo.

### Por qué la selección se reparte entre prettier y el LSP

Prettier solo respeta `--range-start` / `--range-end` con los parsers de **js, ts y json**. Comprobado con la CLI 3.8.1: en css, scss, html, markdown y yaml acepta los argumentos sin protestar y devuelve el texto **exactamente igual que entró**.

Por eso el atajo reparte el trabajo: en css, scss, less y html la selección se la queda el `rangeFormatting` del servidor LSP, que sí sabe formatear un trozo. En markdown y yaml no hay LSP a quien pasarle el relevo, así que ahí formatear una selección no hace nada; si necesitas ordenar una tabla de markdown, formatea el archivo entero desde modo normal.

> **Hay un parche debajo que conviene conocer.** conform calcula los límites del rango en **bytes** y prettier los cuenta en **caracteres**. En un archivo ASCII da igual, pero en cuanto hay acentos el rango se desplaza y prettier acaba formateando otro trozo del archivo: medido, 478 bytes de desfase en las 18 primeras líneas de un archivo con comentarios en español, y el formateo cayó 20 líneas más abajo. La configuración convierte el offset antes de pasarlo, así que ya no pasa —pero si algún día vuelves a ver un formateo "en el sitio equivocado", el sospechoso es ese.

### El caso del `.html` con JavaScript o CSS dentro

Dentro de un `.html` el filetype es `html`, así que quien formatea es el servidor de html, y sobre el JS o el CSS incrustado se queda a medias: indenta y mete algún espacio, pero no parte las líneas largas.

Para esos casos el atajo hace otra cosa: le pregunta a treesitter qué lenguaje hay realmente bajo el cursor, saca el fragmento del buffer, se lo pasa a prettier con el parser de verdad (`babel`, `typescript`, `css`, `scss`) y lo devuelve ya indentado contra la etiqueta que abre el bloque.

> **Selecciona bloques completos.** Si el fragmento no es válido por sí solo —media función, una regla CSS a medias— prettier falla, no se toca nada y sale un aviso en pantalla. No corrompe el archivo, pero tampoco formatea.

### Cuando pulsas y no pasa nada

Tres motivos, por orden de probabilidad:

1. **El lenguaje no tiene formateador.** Mira la tabla de arriba. Lua y Astro no formatean hoy; en Lua está instalado stylua, pero no está enganchado al atajo, y en Astro no hay ni formateador ni servidor.
2. **Es una selección en markdown o yaml.** Formatea el archivo entero desde normal.
3. **prettier no está en el PATH.** No viene de Mason: es un global de npm que vive dentro de la versión de node activa. Si cambias de versión con nvm, `npm i -g prettier` otra vez.

`:ConformInfo` responde a la primera y a la tercera de un vistazo: dice qué formateadores están asignados a ese buffer y cuáles encuentra en el sistema. Los avisos de error están silenciados (`notify_on_error = false`), así que el silencio no significa que todo haya ido bien.

## Plegar

Los pliegues los calcula **treesitter**, no la indentación ni marcadores en comentarios. Se pliega lo que el árbol considera un bloque: funciones, objetos, etiquetas de HTML, secciones de un markdown. No hay que configurar nada por lenguaje, pero sí hay dos consecuencias:

- **Sin parser no hay pliegues.** En un filetype que treesitter no conoce, <kbd>z</kbd> <kbd>a</kbd> contesta `E490: No fold found`.
- **Los archivos se abren desplegados.** `foldlevel` está en 99, así que al abrir ves todo. Para empezar cerrado, <kbd>z</kbd> <kbd>M</kbd>.

No hay columna de flechitas a la izquierda, y la línea plegada conserva su resaltado de sintaxis en vez de convertirse en una fila de puntos.

### Los atajos

| Atajo | Qué hace |
|---|---|
| <kbd>z</kbd> <kbd>a</kbd> | Abre o cierra el pliegue bajo el cursor |
| <kbd>z</kbd> <kbd>c</kbd> / <kbd>z</kbd> <kbd>o</kbd> | Cierra / abre ese pliegue |
| <kbd>z</kbd> <kbd>A</kbd> <kbd>C</kbd> <kbd>O</kbd> | Lo mismo, pero arrastrando también los pliegues anidados dentro |
| <kbd>z</kbd> <kbd>M</kbd> | Cierra todo el archivo |
| <kbd>z</kbd> <kbd>R</kbd> | Abre todo el archivo |
| <kbd>z</kbd> <kbd>r</kbd> / <kbd>z</kbd> <kbd>m</kbd> | Abre / cierra **un nivel** de anidamiento en todo el archivo |
| <kbd>z</kbd> <kbd>j</kbd> / <kbd>z</kbd> <kbd>k</kbd> | Salta al principio del siguiente pliegue / al final del anterior |
| <kbd>[</kbd> <kbd>z</kbd> / <kbd>]</kbd> <kbd>z</kbd> | Va al principio / al final del pliegue en el que estás |
| <kbd>z</kbd> <kbd>v</kbd> | Abre lo justo para ver la línea del cursor |
| <kbd>z</kbd> <kbd>x</kbd> | Recalcula los pliegues y deja a la vista la línea del cursor |
| <kbd>z</kbd> <kbd>i</kbd> | Apaga y enciende el plegado entero |

<kbd>z</kbd> <kbd>a</kbd> es el 90% del uso: es la flechita de VS Code. Los demás valen cuando quieres una vista de conjunto.

### Leer un archivo largo que tocó un agente

<kbd>z</kbd> <kbd>M</kbd> lo cierra todo y deja el archivo como un índice: una línea por función. Desde ahí, <kbd>z</kbd> <kbd>j</kbd> baja de bloque en bloque y <kbd>z</kbd> <kbd>a</kbd> abre el que te interesa. Es más rápido que desplazarse cuando el archivo tiene treinta funciones y solo dos cambiaron.

Combina bien con el margen de git: <kbd>]</kbd> <kbd>c</kbd> te lleva al siguiente cambio aunque esté dentro de un pliegue cerrado —Neovim lo abre solo al saltar—, así que puedes tener todo plegado y recorrer únicamente lo que el agente movió.

Después de que el agente reescriba el archivo por debajo, <kbd>z</kbd> <kbd>x</kbd> vuelve a calcular los pliegues sobre el contenido nuevo.

### Dos trampas

> **<kbd>z</kbd> <kbd>m</kbd> parece que no hace nada.** Cierra un nivel restando 1 a `foldlevel`, y como aquí arranca en 99, harían falta unas noventa pulsaciones para ver el primer efecto. La forma de ir nivel a nivel es al revés: <kbd>z</kbd> <kbd>M</kbd> para cerrar todo y luego <kbd>z</kbd> <kbd>r</kbd> abriendo un nivel cada vez. <kbd>z</kbd> <kbd>R</kbd> sí funciona de golpe, porque baja directamente al nivel máximo real del archivo.

> **`zf` no crea pliegues:** contesta `E350`. Los límites los pone treesitter, no se dibujan a mano. Si de verdad quieres plegar un trozo arbitrario, `:setlocal foldmethod=manual` en ese buffer y `zf` vuelve a funcionar, pero pierdes los automáticos hasta que lo devuelvas a `expr`.

**Y algo que no es una trampa pero se olvida:** los pliegues no se guardan. Cierras el archivo, lo vuelves a abrir y está todo desplegado otra vez.

### Parejas que se confunden

| Atajos | Diferencia |
|---|---|
| <kbd>z</kbd> <kbd>a</kbd> y <kbd>z</kbd> <kbd>i</kbd> | `za` alterna un pliegue. `zi` apaga el plegado del archivo entero. |
| <kbd>z</kbd> <kbd>c</kbd> y <kbd>z</kbd> <kbd>C</kbd> | Minúscula cierra un nivel. Mayúscula cierra también todo lo anidado dentro. |
| <kbd>z</kbd> <kbd>M</kbd> y <kbd>z</kbd> <kbd>m</kbd> | Mayúscula cierra el archivo entero. Minúscula, un nivel (y con `foldlevel` en 99 no se nota). |
| <kbd>z</kbd> <kbd>v</kbd> y <kbd>z</kbd> <kbd>x</kbd> | `zv` solo abre lo necesario para ver la línea. `zx` además recalcula los pliegues. |

Aquí la mayúscula vuelve a ser la versión amplia, igual que en los atajos de git.
