import root from './root';
import { Droppable } from '@shopify/draggable';
import { createColumn } from '../creators';
import { loadFromStorage, updateColumnInStorage, removeNoteFromColumn } from '../utilities';

export default function renderColumns() {
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