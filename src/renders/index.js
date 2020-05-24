import {
  createColumn,
  createNewColumn,
  createAddMoreColumn,
  createColumnControls,
  createNotes,
} from '../creators';
import { loadFromStorage } from '../utilities';

const root = document.getElementById('root');

function renderColumns() {
  Object.values(document.querySelectorAll('.column')).forEach((item) => item.remove());
  loadFromStorage().forEach(({ id_col, title, notes }) =>
    root.appendChild(createColumn(id_col, title, notes))
  );
}

function renderNotes(id_col) {
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

function renderNewColumn() {
  const newCol = document.querySelector('.new-column');
  if (newCol === null) {
    const order = loadFromStorage().length;
    const col = createNewColumn(order);
    root.appendChild(col);
    col.children[0].focus();
  } else {
    window.scrollTo(newCol);
  }
}

function renderAddMoreColumn() {
  root.appendChild(createAddMoreColumn());
}

function renderColumnControls(parent, label, primaryHandler, secondaryHandler) {
  parent.appendChild(createColumnControls(label, primaryHandler, secondaryHandler));
}

export { renderColumns, renderNewColumn, renderAddMoreColumn, renderColumnControls, renderNotes };
