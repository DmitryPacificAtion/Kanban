import {
  createColumn,
  createNewColumn,
  createAddMoreColumn,
  createColumnControls,
  createNotes,
  createAuth,
  createHeaderPanel,
} from '../creators';
import { loadFromStorage, updateColumnInStorage, removeNoteFromColumn } from '../utilities';
import { Droppable } from '@shopify/draggable';

const root = document.getElementById('root');

function renderColumns() {
  Object.values(document.querySelectorAll('.column')).forEach((item) => item.remove());
  const data = loadFromStorage();
  data.sort((p, n) => p.order - n.order);
  data.forEach(({ id_col, title, notes }) => root.appendChild(createColumn(id_col, title, notes)));

  const droppable = new Droppable(document.querySelectorAll('.column'), {
    draggable: '.note__item',
    dropzone: '.column__notes',
    mirror: {
      constrainDimensions: true,
    },
  });

  let droppableOrigin;
  let id_colOrigin;
  let id_noteOrigin;

  // --- Draggable events --- //
  droppable.on('drag:start', (e) => {
    e.data.originalSource.style.display = 'none';
    droppableOrigin = e.data.originalSource.parentNode;
    id_colOrigin = e.data.originalSource.parentNode.parentNode.getAttribute('id');
    id_noteOrigin = e.data.originalSource.getAttribute('id');
  });

  droppable.on('droppable:stop', (e) => {
    const { dropzone } = e;
    if (droppableOrigin !== dropzone) {
      const id_col = dropzone.parentNode.getAttribute('id');
      const notes = Object.values(dropzone.childNodes).map((item) => ({
        id_col,
        id_note: item.getAttribute('id'),
        order: parseInt(item.dataset.order, 10),
        content: item.innerText,
      }));
      updateColumnInStorage(id_col, dropzone.previousSibling.innerText, notes);
      removeNoteFromColumn(id_colOrigin, id_noteOrigin);
      renderColumns();
    }
  });

  droppable.on('droppable:dropped', (e) => {
    if (droppableOrigin === e.dropzone) {
      e.cancel();
    }
  });
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

function renderHeader(userName, signOutHandler) {
  root.appendChild(createHeaderPanel(userName, signOutHandler));
}

function renderAuth() {
  root.innerHTML = null;

  root.appendChild(createAuth())
}

function renderApp(userName, signOutHandler) {
  root.innerHTML = null;

  renderHeader(userName, signOutHandler)
  renderColumns();
  renderAddMoreColumn();
}

export { renderColumns, renderNewColumn, renderAddMoreColumn, renderColumnControls, renderNotes, renderAuth, renderApp };
