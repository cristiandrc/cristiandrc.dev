/**
 * Navegacion rapida por teclado, estilo vim: se teclea la secuencia y salta.
 *
 * En el sitio publico lleva a /notes; dentro de /notes vuelve al inicio.
 * Ignora las pulsaciones mientras se escribe en un campo, para no chocar con
 * el filtro del sidebar ni con el formulario del PIN.
 */
const SEQUENCE = 'nvim';
const RESET_MS = 800;
const NOTES_PATH = '/notes';

let buffer = '';
let resetTimer: number | undefined;

function isTypingIn(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key.length !== 1) return;
  if (isTypingIn(event.target)) return;

  buffer = (buffer + event.key.toLowerCase()).slice(-SEQUENCE.length);

  window.clearTimeout(resetTimer);
  resetTimer = window.setTimeout(() => {
    buffer = '';
  }, RESET_MS);

  if (buffer !== SEQUENCE) return;

  buffer = '';
  const inNotes = window.location.pathname.startsWith(NOTES_PATH);
  window.location.href = inNotes ? '/' : NOTES_PATH;
});
