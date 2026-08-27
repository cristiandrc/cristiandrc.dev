---
title: 'Herdr: atajos de teclado'
description: 'Referencia completa de atajos por categoría: los seis esenciales, workspaces, worktrees, tabs, panes y cómo personalizar sin romper nada.'
tags: ['herdr', 'terminal', 'atajos', 'teclado']
updated: 2026-08-27
order: 2
---

Herdr usa un prefijo estilo tmux. **No mantengas todas las teclas a la vez**: presiona <kbd>Ctrl+b</kbd>, suelta, y después pulsa la tecla de acción. Si cambias el prefijo en la configuración, todas las combinaciones `prefix+...` siguen ese cambio.

Los atajos de abajo corresponden a la configuración predeterminada de Herdr 0.8.0. Confirma los tuyos con <kbd>Ctrl+b</kbd> <kbd>?</kbd> antes de seguir la guía al pie de la letra.

## Los seis que conviene aprender primero

| Acción | Atajo | Para qué |
|---|---|---|
| Ver ayuda | <kbd>Ctrl+b</kbd> <kbd>?</kbd> | Abre la referencia activa con tus bindings reales |
| Buscar y navegar | <kbd>Ctrl+b</kbd> <kbd>g</kbd> | Abre la navegación global de la sesión |
| Ver workspaces | <kbd>Ctrl+b</kbd> <kbd>w</kbd> | Abre el selector principal de espacios |
| Crear tab | <kbd>Ctrl+b</kbd> <kbd>c</kbd> | Añade una vista de trabajo dentro del workspace |
| Dividir pane | <kbd>Ctrl+b</kbd> <kbd>v</kbd> | Crea un terminal a la derecha del actual |
| Salir sin detener | <kbd>Ctrl+b</kbd> <kbd>q</kbd> | Desconecta el cliente y deja los procesos vivos |

## Workspaces

Un workspace organiza la interfaz. Un worktree crea además un checkout separado de Git. El atajo correcto depende de si solo necesitas orden visual o aislamiento de archivos.

| Acción | Atajo | Cuándo usarlo |
|---|---|---|
| Selector de workspaces | <kbd>Ctrl+b</kbd> <kbd>w</kbd> | Para cambiar de contexto sin recordar su posición |
| Navegación global | <kbd>Ctrl+b</kbd> <kbd>g</kbd> | Para localizar rápidamente elementos de la sesión |
| Nuevo workspace | <kbd>Ctrl+b</kbd> <kbd>Shift+n</kbd> | Para crear otro contenedor visual sin aislar Git |
| Nuevo worktree | <kbd>Ctrl+b</kbd> <kbd>Shift+g</kbd> | Para abrir una rama en una carpeta independiente |
| Renombrar workspace | <kbd>Ctrl+b</kbd> <kbd>Shift+w</kbd> | Para mantener nombres cortos y reconocibles |
| Cerrar workspace | <kbd>Ctrl+b</kbd> <kbd>Shift+d</kbd> | Para cerrar el espacio actual, normalmente con confirmación |

## El flujo completo de un worktree

Un worktree es un checkout real de Git en otra carpeta, con su propia rama y sus propios archivos sin commit. Herdr lo abre como un workspace agrupado, así que en pantalla se ve como un espacio más, pero por debajo hay un directorio distinto. Por defecto vive en `~/.herdr/worktrees` y puedes cambiarlo con `[worktrees] directory` en la configuración.

1. **Crear** — <kbd>Ctrl+b</kbd> <kbd>Shift+g</kbd>. Herdr crea la rama, el checkout y el workspace, y te lleva ahí.
2. **Trabajar** — dentro son tabs y panes normales. Los cambios solo afectan a esa carpeta y a esa rama.
3. **Ir y volver** — <kbd>Ctrl+b</kbd> <kbd>w</kbd> abre el selector y saltas entre el repo principal y cada worktree.
4. **Cerrar la vista** — <kbd>Ctrl+b</kbd> <kbd>Shift+d</kbd>. Cierra el workspace, no borra la carpeta ni la rama.
5. **Reabrir** — el checkout sigue en disco. Vuelves con `herdr worktree open --branch <rama>`.
6. **Eliminar al terminar** — ya integrada la rama, `herdr worktree remove --workspace <id>` borra el checkout. La rama se borra aparte con Git.

> **Cerrar no es eliminar.** <kbd>Ctrl+b</kbd> <kbd>Shift+d</kbd> solo quita el workspace de la sesión. La carpeta del worktree, la rama y tus cambios sin commit siguen intactos hasta que ejecutes `remove`. Si crees que perdiste un worktree, lo más probable es que solo cerraras su vista: compruébalo con `herdr worktree list` o `git worktree list`.

### Atajos y comandos por etapa

| Quiero | Atajo | Comando equivalente |
|---|---|---|
| Crear un worktree para una rama nueva | <kbd>Ctrl+b</kbd> <kbd>Shift+g</kbd> | `herdr worktree create --branch feat/auth --base master` |
| Ver los que ya tengo | Sin atajo | `herdr worktree list` |
| Moverme a uno abierto | <kbd>Ctrl+b</kbd> <kbd>w</kbd> | Selector de workspaces |
| Reabrir uno que cerré | Sin atajo por defecto (`open_worktree`) | `herdr worktree open --branch feat/auth` |
| Cerrar la vista sin borrar nada | <kbd>Ctrl+b</kbd> <kbd>Shift+d</kbd> | Cierra el workspace actual |
| Eliminar el checkout al finalizar | Sin atajo por defecto (`remove_worktree`) | `herdr worktree remove --workspace <id>` |
| Borrar la rama ya integrada | Sin atajo | `git branch -d feat/auth` |

### Dales atajo a abrir y eliminar

`open_worktree` y `remove_worktree` existen como acciones, pero vienen sin tecla asignada. Si trabajas con varias ramas a la vez, vale la pena asignarlas. `remove_worktree` abre una confirmación antes de borrar, así que es difícil eliminar un checkout por accidente.

```toml
[keys]
open_worktree = "prefix+shift+o"
remove_worktree = "prefix+shift+backspace"

[worktrees]
directory = "~/.herdr/worktrees"
```

### Lo que conviene tener claro

- **Eliminar el worktree no borra la rama.** `remove` quita la carpeta del checkout gestionado. La rama y sus commits siguen en el repositorio hasta que uses `git branch -d`.
- **Revisa antes de eliminar.** Si quedan cambios sin commit, la eliminación puede fallar o exigir `--force`. Confirma con `git status` dentro del worktree antes de cerrarlo definitivamente.
- **La misma rama no va en dos worktrees.** Git normalmente impide tener una rama en checkout en dos carpetas a la vez. Si el comando falla, esa suele ser la causa.
- **Aísla archivos, no servicios.** Dos worktrees no chocan en el working directory, pero sí en el mismo puerto, la misma base de datos local o el mismo cache. Asigna esos recursos por rama.

## Tabs

Los tabs son vistas dentro de un workspace. Sirven para separar tareas, pero todos pueden seguir apuntando a la misma carpeta de trabajo.

| Acción | Atajo | Detalle |
|---|---|---|
| Nuevo tab | <kbd>Ctrl+b</kbd> <kbd>c</kbd> | Crea una nueva vista en el workspace actual |
| Tab anterior | <kbd>Ctrl+b</kbd> <kbd>p</kbd> | Retrocede un tab |
| Tab siguiente | <kbd>Ctrl+b</kbd> <kbd>n</kbd> | Avanza un tab |
| Ir al tab 1 a 9 | <kbd>Ctrl+b</kbd> <kbd>1</kbd>…<kbd>9</kbd> | Salto directo por posición |
| Renombrar tab | <kbd>Ctrl+b</kbd> <kbd>Shift+t</kbd> | Conviene usar nombres que describan el objetivo |
| Cerrar tab | <kbd>Ctrl+b</kbd> <kbd>Shift+x</kbd> | Cierra el tab completo, incluidos sus panes |

## Panes y foco

Los panes son terminales reales. Estos son los movimientos que más se repiten cuando trabajas con código, tests y logs en paralelo.

| Acción | Atajo | Detalle |
|---|---|---|
| Split a la derecha | <kbd>Ctrl+b</kbd> <kbd>v</kbd> | Crea un pane vertical al lado del actual |
| Split hacia abajo | <kbd>Ctrl+b</kbd> <kbd>-</kbd> | Crea un pane horizontal debajo del actual |
| Mover el foco | <kbd>Ctrl+b</kbd> <kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd> | Izquierda, abajo, arriba y derecha, al estilo Vim |
| Recorrer panes | <kbd>Ctrl+b</kbd> <kbd>Tab</kbd> | Avanza por los panes sin pensar en su posición |
| Pane anterior | <kbd>Ctrl+b</kbd> <kbd>Shift+Tab</kbd> | Recorre los panes en sentido inverso |
| Zoom | <kbd>Ctrl+b</kbd> <kbd>z</kbd> | Maximiza el pane activo o restaura el layout |
| Modo resize | <kbd>Ctrl+b</kbd> <kbd>r</kbd> | Entra al modo para ajustar el tamaño con teclado |
| Editar scrollback | <kbd>Ctrl+b</kbd> <kbd>e</kbd> | Abre el historial del pane para revisarlo o copiarlo |
| Renombrar pane | <kbd>Ctrl+b</kbd> <kbd>Shift+p</kbd> | Ayuda a identificar servidores, tests o agentes |
| Cerrar pane | <kbd>Ctrl+b</kbd> <kbd>x</kbd> | Termina el terminal activo |
| Mostrar u ocultar sidebar | <kbd>Ctrl+b</kbd> <kbd>b</kbd> | Recupera espacio horizontal cuando lo necesitas |

## Personalizar sin crear conflictos

Los bindings viven en `~/.config/herdr/config.toml`. Las acciones sin valor están disponibles, pero no tienen un atajo predeterminado.

Este mapa acelera el cambio entre workspaces y agentes sin reemplazar los bindings predeterminados más importantes. Después de guardar, recarga con <kbd>Ctrl+b</kbd> <kbd>Shift+r</kbd>.

```toml
[keys]
previous_workspace = "prefix+left"
next_workspace = "prefix+right"
previous_agent = "prefix+shift+j"
next_agent = "prefix+shift+k"
focus_agent = "prefix+alt+1..9"
switch_workspace = "prefix+shift+1..9"
```

### Comandos propios en un popup

También puedes reservar una combinación para herramientas frecuentes. Este ejemplo abre Lazygit en un popup sin modificar el layout del tab.

```toml
[[keys.command]]
key = "prefix+alt+g"
type = "popup"
command = "lazygit"
width = "80%"
height = "80%"
```

### Antes de reasignar

- **Revisa antes de reemplazar.** Abre <kbd>Ctrl+b</kbd> <kbd>?</kbd> para confirmar que tu nueva combinación no sobrescriba una acción que ya usas.
- **El terminal también participa.** Algunas combinaciones con <kbd>Alt</kbd>, <kbd>Cmd</kbd> o signos pueden depender del terminal, de tmux o del sistema operativo.
- **Distingue cerrar de desconectar.** <kbd>Ctrl+b</kbd> <kbd>q</kbd> desconecta el cliente. Los atajos de cierre terminan panes, tabs o workspaces.
- **Un pane no aísla archivos.** Crear un split ofrece otro terminal, pero solo un worktree separa el checkout y los cambios locales de Git.

## Una rutina de diez minutos

Aprenderlos por flujo funciona mejor que memorizar una tabla completa. Repite esta secuencia un par de veces con un proyecto de prueba.

1. **Abre la ayuda** — comprueba el prefijo y localiza las acciones disponibles en tu configuración.
2. **Crea un tab y dos panes** — practica <kbd>c</kbd>, <kbd>v</kbd> y <kbd>-</kbd> después del prefijo.
3. **Mueve y amplía el foco** — recorre los panes con <kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd> y alterna zoom con <kbd>z</kbd>.
4. **Desconecta y vuelve** — usa <kbd>q</kbd> para salir de la UI y confirma que los procesos siguen disponibles al reconectar.
