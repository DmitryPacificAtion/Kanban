import { createNotes } from '../creators';
import { loadFromStorage } from '../utilities';

export default function renderNotes(id_col) {
  if (id_col) {
    const parent = document.getElementById(id_col);
    const ul = parent.querySelector('.column__notes');
    ul.remove();
    const colData = loadFromStorage().filter((col) => col.id_col === id_col)[0];
    parent.querySelector('.column__title').after(createNotes(id_col, colData.notes));
  } else {
    console.error('id_col is not defined');
  }
}
