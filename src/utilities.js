const crypto = require('crypto');

const isArray = (item) => item && typeof item !== 'string' && item.hasOwnProperty('length');

const findColumn = (id) => loadFromStorage().filter(({ id_col }) => id_col === id)[0];
const removeColumn = (id) => loadFromStorage().filter(({ id_col }) => id_col !== id);

export function makeHash(text) {
  return crypto.createHash('sha1').update(text).digest('hex');
}

export function saveToStorage(data) {
  const stoge = loadFromStorage();
  stoge.push(data);
  localStorage.setItem('KANBAN-DATA', JSON.stringify(stoge));
}

export function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem('KANBAN-DATA'));
  return isArray(data) ? data : [];
}

export function removeColumnFromStorage(id) {
  localStorage.setItem('KANBAN-DATA', JSON.stringify(removeColumn(id)));
}

export function removeNoteFromColumn(id_col, id_note) {
  const col = findColumn(id_col);
  col.notes = col.notes
    .filter((note) => note.id_note !== id_note)
    .map((note, index) => {
      note.order = index + 1;
      return note;
    });
  const newData = removeColumn(id_col);
  newData.push(col);
  newData.sort((p, n) => p.order - n.order);
  localStorage.setItem('KANBAN-DATA', JSON.stringify(newData));
}

export function updateColumnInStorage(id_col, title, notes = []) {
  if (id_col && title) {
    const col = findColumn(id_col);
    const newData = removeColumn(id_col);
    col.title = title;
    col.notes = notes;
    newData.push(col);
    newData.sort((p, n) => p.order - n.order);
    localStorage.setItem('KANBAN-DATA', JSON.stringify(newData));
  }
}

export function updateNoteInColumn(id_col, id_note, content) {
  if (id_col && id_note && content) {
    const col = findColumn(id_col);
    const newData = removeColumn(id_col);
    col.notes.filter((note) => note.id_note === id_note)[0].content = content;
    newData.push(col);
    newData.sort((p, n) => p.order - n.order);
    localStorage.setItem('KANBAN-DATA', JSON.stringify(newData));
  }
}
// export const lastOrder = loadFromStorage().reduce((acc, cur) => cur.order > acc ? cur.order : acc, 0);
