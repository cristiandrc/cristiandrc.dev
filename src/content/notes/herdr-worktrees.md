---
title: 'Herdr: tapa, worktrees y flujo paralelo'
description: 'Qué sobrevive cuando cierras el portátil, en qué se diferencia un worktree de un workspace, y cómo repartir agentes sin que se pisen.'
tags: ['herdr', 'git', 'terminal', 'agentes']
updated: 2026-08-27
order: 1
---

Tres cosas que conviene separar antes de dejar agentes corriendo: **persistencia de Herdr**, **suspensión real del sistema operativo** y **aislamiento real de Git**. No son lo mismo y fallan por motivos distintos.

- **Herdr sí persiste.** Si cierras el cliente o te desconectas, el servidor mantiene panes y procesos vivos.
- **macOS puede pausar todo.** Si el portátil entra en sueño por tapa o suspensión, CPU e Internet se detienen hasta despertar.
- **Worktree sí aísla archivos.** Cada worktree es un checkout real de Git con su rama, su carpeta y sus procesos.

## 1. Qué pasa cuando bajas la tapa

**Respuesta corta:** Herdr puede seguir trabajando cuando cierras la terminal, sales del cliente o bloqueas la pantalla. Pero si macOS duerme el portátil al bajar la tapa, Herdr no puede ejecutar CPU ni mantener Internet activo durante ese sueño. Los procesos normalmente no mueren: quedan pausados y continúan al despertar.

| Situación | Qué pasa con Herdr | Riesgo real | Decisión práctica |
|---|---|---|---|
| Bloquear pantalla | Sigue corriendo | Bajo, mientras el sistema no duerma | Útil para pausas cortas |
| Cerrar terminal o detach con <kbd>Ctrl+b</kbd> <kbd>q</kbd> | Sigue corriendo | Bajo. El servidor conserva panes y procesos | Es el flujo normal de Herdr |
| Perder Internet sin dormir el equipo | El proceso sigue, pero la red falla | Un agente puede quedarse esperando, reintentar o fallar una llamada | Revisar estado al reconectar |
| Bajar la tapa y el Mac entra en sleep | Queda pausado | CPU, temporizadores y red se suspenden. Las conexiones pueden expirar | No confiar en esto para trabajo largo |
| Reiniciar o detener el servidor | Los procesos no siguen vivos | Herdr restaura forma y estado compatible, pero no el proceso original | Guardar commits o checkpoints antes |

### Prueba segura para tu Mac

Deja un proceso escribiendo timestamps en un pane. Luego bloquea pantalla, cierra terminal, baja la tapa un rato y compara los saltos de tiempo.

```bash
while true; do
  date "+%F %T awake" >> /tmp/herdr-sleep-test.log
  sleep 15
done
```

Si hay un hueco grande entre timestamps, el equipo se durmió. Si sigue cada 15 segundos, estuvo despierto.

### Mantenerlo despierto sin tocar ajustes globales

Para trabajo largo con la tapa abierta o pantalla apagada, usa una aserción temporal de macOS:

```bash
caffeinate -i
```

Detenlo con <kbd>Ctrl+C</kbd>. Evita el sueño por inactividad, pero no lo trates como garantía universal con la tapa cerrada: la tapa puede provocar sueño real del sistema.

### Recomendación operativa

Para dejar agentes trabajando varias horas, lo más confiable es ejecutar Herdr en una máquina que no dependa de la tapa del portátil: un servidor local, una Mac fija, una VM o un host remoto por SSH.

Herdr soporta flujo remoto con `herdr --remote <ssh-target>`, así que el portátil puede ser solo el cliente visual mientras el host remoto mantiene CPU, red y procesos.

## 2. Qué es un worktree y por qué no es solo otra terminal

Un tab o pane nuevo solo te da otra terminal. Un worktree te da **otra carpeta de trabajo real** conectada al mismo repositorio Git, normalmente con otra rama en checkout. Esa diferencia es la clave.

| Capa | Qué aísla | Qué **no** aísla |
|---|---|---|
| Workspace de Herdr | Organización visual, tabs, panes, estado de agentes | No crea una rama Git por sí mismo |
| Tab de Herdr | Vista o layout dentro del workspace | No separa archivos ni commits |
| Pane de Herdr | Un terminal real con su proceso | No evita que dos procesos toquen los mismos archivos |
| Git worktree | Carpeta, índice, archivos sin commit y rama checkout | No separa puertos, bases de datos, caches ni servicios externos |

### Lo importante para agentes en paralelo

Sí puedes tener un agente en una rama y otro en otra al mismo tiempo, siempre que cada uno esté en su propio worktree. Así no se pisan los archivos del working directory.

La rama queda disponible dentro del mismo repositorio como referencia Git, pero los cambios de una rama no aparecen mágicamente en la otra. Para traerlos necesitas commit y luego merge, rebase o cherry-pick.

Git normalmente evita que la misma rama esté en checkout en dos worktrees a la vez. Eso es bueno: reduce el riesgo de editar la misma rama desde dos carpetas distintas.

## 3. Flujo recomendado para trabajar en paralelo

Un workspace central para coordinar y varios worktrees para el trabajo real. Cada agente recibe una rama concreta, un objetivo concreto y un criterio de terminado.

```bash
# Ver worktrees actuales
git worktree list

# Crear un worktree desde Herdr para una rama nueva
herdr worktree create --branch feat/auth-flow --base master --label "feat auth"

# Abrir un worktree existente por rama
herdr worktree open --branch feat/auth-flow

# Crear un workspace normal sin crear worktree
herdr workspace create --cwd ~/project --label review --no-focus
```

| Rol | Dónde vive | Uso |
|---|---|---|
| Workspace principal | Repo base | Revisar, coordinar, correr integración final |
| Worktree feature A | Carpeta creada por Herdr bajo `~/.herdr/worktrees` por defecto | Agente trabaja en una rama específica |
| Worktree feature B | Otra carpeta y otra rama | Otro agente trabaja en paralelo sin tocar los mismos archivos |
| Merge final | Repo principal o PR | Integrar una rama a la vez, resolver conflictos y correr pruebas |

### Riesgos que sí quedan

Dos ramas pueden compilar por separado y fallar al juntarlas. Los worktrees evitan el choque físico de archivos, pero no garantizan compatibilidad lógica.

También puedes chocar por recursos compartidos: mismo puerto, misma base de datos local, mismos archivos temporales, mismas variables globales o el mismo servidor de desarrollo.

Para trabajo serio en paralelo, define por rama el puerto, la base de datos, el nombre del entorno y el alcance de archivos que puede tocar el agente.

## 4. Comandos CLI que conviene memorizar

### Sesión y persistencia

```bash
herdr
herdr session list
herdr session attach work
herdr server stop
```

Usa `server stop` solo cuando de verdad quieras detener panes y procesos.

### Workspaces

```bash
herdr workspace list
herdr workspace create --cwd ~/project --label api
herdr workspace create --cwd ~/project --label api --no-focus
herdr workspace close <workspace_id>
```

Un workspace organiza trabajo, pero no crea rama por sí solo.

### Worktrees

```bash
herdr worktree list
herdr worktree create --branch feat/name --base master
herdr worktree open --branch feat/name
herdr worktree remove --workspace <workspace_id>
```

`remove` borra el checkout gestionado, no la rama. Aun así, revisa el estado antes.

### Tabs y panes

```bash
herdr tab create --label tests
herdr pane split <pane_id> --direction right
herdr pane read <pane_id> --source recent-unwrapped
herdr pane send <pane_id> "npm test"
```

Los panes son terminales reales. Si dos panes están en la misma carpeta, pueden pisarse.

## 5. Para profundizar después

| Tema | Resumen rápido | Para qué sirve |
|---|---|---|
| Layout de teclado propio | Diseñar un mapa de atajos para workspaces, agentes, tabs y panes | Trabajar con Herdr casi sin mouse |
| Herdr remoto por SSH | Ejecutar agentes en un host que no se duerma y usar el portátil como cliente | Resolver de raíz el problema de la tapa y la conexión |
| Política de ramas por agente | Reglas para nombres de ramas, alcance de archivos, commits y merge final | Evitar trabajo duplicado y conflictos caros |
| Aislamiento de servicios locales | Asignar puertos, bases de datos, caches y variables por worktree | Permitir que varios agentes corran tests y servers a la vez |
| Checklist de integración | Rutina para revisar, probar y unir ramas una por una | Que el paralelo no termine en una integración caótica |
| Automatización con CLI | Crear workspaces, tabs, panes y comandos con scripts repetibles | Levantar flujos completos en segundos |

## Fuentes

Verificado localmente con `herdr 0.8.0`, `herdr --default-config`, `herdr --help`, `git worktree list`, `man caffeinate` y `man pmset`.

- [Herdr Concepts](https://herdr.dev/docs/concepts/) — workspace, tab, pane, cliente y servidor
- [Herdr Quick Start](https://herdr.dev/docs/quick-start/) — detach, reattach y acciones comunes
- [Herdr Configuration](https://herdr.dev/docs/configuration/) — keybindings y worktrees
- [Herdr Config Reference](https://herdr.dev/docs/config-reference/) — defaults de teclas y opciones
- [Herdr CLI Reference](https://herdr.dev/docs/cli-reference/) — comandos de workspace, worktree, tab y pane
- [Herdr Session State](https://herdr.dev/docs/session-state/) — qué sobrevive a detach y reinicio
- [Git Worktree](https://git-scm.com/docs/git-worktree.html) — documentación oficial de Git
- [Apple Developer](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/power_efficiency_guidelines_osx/PrioritizeWorkAtTheAppLevel.html) — power assertions y verificación con pmset
